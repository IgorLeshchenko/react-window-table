import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { CellMeasurer, Column, InfiniteLoader, Table, WindowScroller } from 'react-virtualized'

import useColumnsDimensions from '../hooks/useColumnsDimensions'
import DefaultCellRenderer from '../common/cellRenderers/DefaultCellRenderer'

const TableBody = props => {
  const { data, contentHeight, count, cache, scrollElement, handleLoadMoreData } = props
  const { columns, columnsWidth } = useColumnsDimensions(props.columns)
  const visibleColumns = columns.filter(({ isHidden }) => !isHidden)
  const isRowLoaded = ({ index }) => !!data[index]

  return (
    <WindowScroller scrollElement={scrollElement.current}>
      {({ isScrolling, scrollTop }) => (
        <div style={{ width: columnsWidth }}>
          <InfiniteLoader
            minimumBatchSize={20}
            isRowLoaded={isRowLoaded}
            loadMoreRows={handleLoadMoreData}
            rowCount={count}>
            {({ onRowsRendered, registerChild }) => (
              <Table
                className="table"
                autoHeight={true}
                ref={registerChild}
                isScrolling={isScrolling}
                scrollTop={scrollTop}
                width={columnsWidth}
                height={contentHeight}
                headerHeight={0}
                disableHeader={true}
                rowHeight={cache.rowHeight}
                rowCount={count}
                rowClassName="tableRow"
                rowGetter={({ index }) => index}
                overscanRowCount={0}
                onRowsRendered={onRowsRendered}
                deferredMeasurementCache={cache}>
                {visibleColumns.map((column, index) => {
                  const { label, dataKey, width, defaultWidth, cellRenderer } = column

                  return (
                    <Column
                      key={index}
                      label={label}
                      width={width || defaultWidth}
                      dataKey={dataKey}
                      className="tableCell"
                      cellRenderer={({ columnIndex, key, parent, rowIndex }) => (
                        <CellMeasurer
                          cache={cache}
                          columnIndex={columnIndex}
                          key={key}
                          parent={parent}
                          rowIndex={rowIndex}>
                          {DefaultCellRenderer({
                            dataKey,
                            rowData: data[rowIndex] || {},
                            cellRenderer,
                          })}
                        </CellMeasurer>
                      )}
                    />
                  )
                })}
              </Table>
            )}
          </InfiniteLoader>
        </div>
      )}
    </WindowScroller>
  )
}

TableBody.propTypes = {
  scrollElement: PropTypes.any.isRequired,
  contentHeight: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  cache: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
  handleLoadMoreData: PropTypes.func.isRequired,
}

export default memo(TableBody)
