import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CellMeasurerCache } from 'react-virtualized'
import { debounce } from 'lodash'

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
  const { data, count, noDataAvailable, isInitFetchDone } = useTableData({
    endpoint,
    filters,
    sortDirection,
    sortDataKey,
  })
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
  const handleRowsRendered = params => {
    const { startIndex, stopIndex } = params
    const startLoad = startIndex < 25 ? startIndex : startIndex - 25
    const stopLoad = stopIndex < count - 25 ? stopIndex + 25 : count

    console.log('visible', startIndex, stopIndex)
    console.log('should load', { startLoad, stopLoad })
  }
  const handleRowsRenderedDebounced = debounce(handleRowsRendered, 150)

  return (
    <Fragment>
      <div className="windowScrollerWrapper">
        <TableHeader
          {...props}
          isStickyEnabled={false}
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
              onRowsRendered={handleRowsRenderedDebounced}
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
