import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CellMeasurer, List, InfiniteLoader, WindowScroller } from 'react-virtualized'

import useColumnsDimensions from '../hooks/useColumnsDimensions'
import TableRow from './TableRow'

const TableBody = props => {
  const {
    isHeaderModifying,
    data,
    cellSettings,
    cellRenderers,
    contentHeight,
    count,
    cache,
    scrollElement,
    handleLoadMoreData,
  } = props
  const { columns, columnsWidth } = useColumnsDimensions(cellSettings)
  const isRowLoaded = ({ index }) => !!data[index]

  return (
    <WindowScroller scrollElement={scrollElement.current}>
      {({ scrollTop }) => (
        <InfiniteLoader
          minimumBatchSize={20}
          isRowLoaded={isRowLoaded}
          loadMoreRows={handleLoadMoreData}
          rowCount={count}>
          {({ onRowsRendered, registerChild }) => (
            <List
              style={{ width: columnsWidth }}
              className={classNames('tableBody', { modifyActive: isHeaderModifying })}
              autoHeight={true}
              ref={registerChild}
              scrollTop={scrollTop}
              width={columnsWidth}
              height={contentHeight}
              rowHeight={cache.rowHeight}
              rowCount={count}
              rowClassName="tableRow"
              rowRenderer={({ index, key, parent, style }) => (
                <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
                  {({ measure, registerChild }) => (
                    <div key={index} className="tableRow" ref={registerChild} style={style}>
                      <TableRow
                        cellSettings={columns}
                        cellRenderers={cellRenderers}
                        rowData={data[index] || {}}
                        measure={measure}
                      />
                    </div>
                  )}
                </CellMeasurer>
              )}
              overscanRowCount={0}
              onRowsRendered={onRowsRendered}
              deferredMeasurementCache={cache}
            />
          )}
        </InfiniteLoader>
      )}
    </WindowScroller>
  )
}

TableBody.propTypes = {
  isHeaderModifying: PropTypes.bool.isRequired,
  scrollElement: PropTypes.any.isRequired,
  contentHeight: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  cache: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  cellSettings: PropTypes.array.isRequired,
  cellRenderers: PropTypes.object.isRequired,
  handleLoadMoreData: PropTypes.func.isRequired,
}

export default memo(TableBody)
