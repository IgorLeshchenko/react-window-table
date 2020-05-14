import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { StickyContainer } from 'react-sticky'
import { CellMeasurerCache } from 'react-virtualized'

import useTableData from '../hooks/useTableData'
import * as TableConstants from '../utils/constants'

import TableHeader from './TableHeader'
import TableBody from './TableBody'
import LoadingBody from '../common/body/LoadingBody'
import NoDataMessage from '../common/body/NoDataMessage'

const TableVirtualized = props => {
  const {
    endpoint,
    filters,
    sortDirection,
    sortDataKey,
    columns,
    onColumnsResize,
    onColumnsReorder,
    onListSort,
  } = props
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: TableConstants.ROW_HEIGHT,
  })
  const [isCellModificationPending, setIsCellModificationPending] = useState(false)
  const { data, count, hasNoData, isInitFetchDone } = useTableData({ endpoint, filters, sortDirection, sortDataKey })
  const handleResizeColumns = newColumns => {
    onColumnsResize(newColumns)
    cache.clearAll()
    setIsCellModificationPending(false)
  }
  const handleReorderColumns = newColumns => {
    onColumnsReorder(newColumns)
    cache.clearAll()
    setIsCellModificationPending(false)
  }
  const handleSortList = params => {
    onListSort(params)
    cache.clearAll()
  }

  return (
    <Fragment>
      <div className="windowScrollerWrapper">
        <StickyContainer>
          <TableHeader
            {...props}
            isStickyEnabled={true}
            onListSort={handleSortList}
            onColumnsResizeStart={() => setIsCellModificationPending(true)}
            onColumnsReorderStart={() => setIsCellModificationPending(true)}
            onColumnsResize={handleResizeColumns}
            onColumnsReorder={handleReorderColumns}
          />

          <div className={classNames('scrollBody', { modifyActive: isCellModificationPending })}>
            {!isInitFetchDone && <LoadingBody />}
            {hasNoData && <NoDataMessage />}
            {!hasNoData && <TableBody cache={cache} columns={columns} count={count} data={data} />}
          </div>
        </StickyContainer>
      </div>
      <div className="bottomSpacer" />
    </Fragment>
  )
}

TableVirtualized.propTypes = {
  endpoint: PropTypes.string.isRequired,
  sortDirection: PropTypes.string,
  sortDataKey: PropTypes.string,
  filters: PropTypes.object,
  columns: PropTypes.array.isRequired,
  onListSort: PropTypes.func,
  onColumnsReorder: PropTypes.func,
  onColumnsResize: PropTypes.func,
}

export default TableVirtualized
