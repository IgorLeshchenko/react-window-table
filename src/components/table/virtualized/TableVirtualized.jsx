import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { CellMeasurerCache } from 'react-virtualized'
import { isEmpty } from 'lodash'

import * as TableConstants from '../utils/constants'

import TableHeader from './TableHeader'
import TableBody from './TableBody'
import LoadingBody from '../common/body/LoadingBody'
import NoDataMessage from '../common/body/NoDataMessage'

const TableVirtualized = props => {
  const {
    isLoading,
    data,
    count,
    sortDataKey,
    sortDirection,
    cellSettings,
    cellRenderers,
    contentHeight,
    scrollElement,
    onLoadMore,
    onListSort,
    onColumnsResize,
    onColumnsReorder,
  } = props
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: TableConstants.ROW_HEIGHT,
  })
  const [isHeaderModifying, setIsHeaderModifying] = useState(false)

  const handleResizeColumns = newColumns => {
    onColumnsResize(newColumns)
    setIsHeaderModifying(false)
  }
  const handleReorderColumns = newColumns => {
    onColumnsReorder(newColumns)
    setIsHeaderModifying(false)
  }
  const handleSortList = params => {
    onListSort(params)
  }

  return (
    <Fragment>
      <div className="windowScrollerWrapper">
        <TableHeader
          headerHeight={TableConstants.HEADER_HEIGHT}
          sortDataKey={sortDataKey}
          sortDirection={sortDirection}
          cellSettings={cellSettings}
          onListSort={handleSortList}
          onColumnsResizeStart={() => setIsHeaderModifying(true)}
          onColumnsReorderStart={() => setIsHeaderModifying(true)}
          onColumnsResize={handleResizeColumns}
          onColumnsReorder={handleReorderColumns}
        />

        {isLoading && <LoadingBody />}

        {!isLoading && isEmpty(data) && <NoDataMessage />}

        {!isLoading && !isEmpty(data) && (
          <TableBody
            isHeaderModifying={isHeaderModifying}
            data={data}
            count={count}
            cache={cache}
            cellSettings={cellSettings}
            cellRenderers={cellRenderers}
            scrollElement={scrollElement}
            contentHeight={contentHeight}
            handleLoadMoreData={onLoadMore}
          />
        )}
      </div>
    </Fragment>
  )
}

TableVirtualized.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  sortDataKey: PropTypes.string,
  sortDirection: PropTypes.string,
  contentHeight: PropTypes.number.isRequired,
  scrollElement: PropTypes.any.isRequired,
  cellSettings: PropTypes.array.isRequired,
  cellRenderers: PropTypes.object.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  onListSort: PropTypes.func,
  onColumnsReorder: PropTypes.func,
  onColumnsResize: PropTypes.func,
}

export default TableVirtualized
