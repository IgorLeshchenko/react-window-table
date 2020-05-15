import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CellMeasurerCache } from 'react-virtualized'

import useTableData from '../hooks/useTableData'
import * as TableConstants from '../utils/constants'

import TableHeader from './TableHeader'
import TableBody from './TableBody'
import LoadingBody from '../common/body/LoadingBody'
import NoDataMessage from '../common/body/NoDataMessage'

const TableVirtualized = props => {
  const {
    scrollElement,
    contentHeight,
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
  const { data, count, noDataAvailable, onRowsRendered, isInitFetchDone } = useTableData({
    endpoint,
    filters,
    sortDirection,
    sortDataKey,
  })
  const handleResizeColumns = newColumns => {
    onColumnsResize(newColumns)
    setIsCellModificationPending(false)
    cache.clearAll()
  }
  const handleReorderColumns = newColumns => {
    onColumnsReorder(newColumns)
    setIsCellModificationPending(false)
    cache.clearAll()
  }
  const handleSortList = params => {
    onListSort(params)
    cache.clearAll()
  }

  return (
    <Fragment>
      <div className="windowScrollerWrapper">
        <TableHeader
          {...props}
          onListSort={handleSortList}
          onColumnsResizeStart={() => setIsCellModificationPending(true)}
          onColumnsReorderStart={() => setIsCellModificationPending(true)}
          onColumnsResize={handleResizeColumns}
          onColumnsReorder={handleReorderColumns}
        />

        <div className={classNames('scrollBody', { modifyActive: isCellModificationPending })}>
          {!isInitFetchDone && <LoadingBody />}

          {noDataAvailable && <NoDataMessage />}

          {!noDataAvailable && (
            <TableBody
              scrollElement={scrollElement}
              contentHeight={contentHeight}
              cache={cache}
              columns={columns}
              count={count}
              data={data}
              onRowsRendered={onRowsRendered}
            />
          )}
        </div>
      </div>
      <div className="bottomSpacer" />
    </Fragment>
  )
}

TableVirtualized.propTypes = {
  scrollElement: PropTypes.any.isRequired,
  contentHeight: PropTypes.number.isRequired,
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
