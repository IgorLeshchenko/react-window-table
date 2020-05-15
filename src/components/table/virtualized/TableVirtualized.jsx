import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
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
    columns,
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
  const [isCellModificationPending, setIsCellModificationPending] = useState(false)

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
    onListSort(params).then(() => {
      cache.clearAll()
    })
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
          {isLoading && <LoadingBody />}

          {!isLoading && isEmpty(data) && <NoDataMessage />}

          {!isLoading && !isEmpty(data) && (
            <TableBody
              handleLoadMoreData={onLoadMore}
              scrollElement={scrollElement}
              contentHeight={contentHeight}
              cache={cache}
              columns={columns}
              count={count}
              data={data}
            />
          )}
        </div>
      </div>
      <div className="bottomSpacer" />
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
  columns: PropTypes.array.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  onListSort: PropTypes.func,
  onColumnsReorder: PropTypes.func,
  onColumnsResize: PropTypes.func,
}

export default TableVirtualized
