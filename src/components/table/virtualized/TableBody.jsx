import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { CellMeasurer, Column, Table, WindowScroller } from 'react-virtualized'

import useColumnsDimensions from '../hooks/useColumnsDimensions'
import DefaultCellRenderer from '../common/cellRenderers/DefaultCellRenderer'

const TableBody = props => {
  const { data, count, cache } = props
  const { columns, columnsWidth } = useColumnsDimensions(props.columns)

  return (
    <div style={{ width: columnsWidth }}>
      <WindowScroller>
        {({ height, isScrolling, scrollTop }) => (
          <Table
            className="table"
            autoHeight={true}
            isScrolling={isScrolling}
            scrollTop={scrollTop}
            width={columnsWidth}
            height={height}
            headerHeight={0}
            disableHeader={true}
            rowHeight={cache.rowHeight}
            rowCount={count}
            rowClassName="tableRow"
            rowGetter={({ index }) => index}
            overscanRowCount={30}
            deferredMeasurementCache={cache}>
            {columns.map((column, index) => {
              const { label, dataKey, width, defaultWidth, cellRenderer } = column

              return (
                <Column
                  key={index}
                  label={label}
                  width={width || defaultWidth}
                  dataKey={dataKey}
                  className="tableCell"
                  cellRenderer={({ columnIndex, key, parent, rowIndex }) => (
                    <CellMeasurer cache={cache} columnIndex={columnIndex} key={key} parent={parent} rowIndex={rowIndex}>
                      {DefaultCellRenderer({
                        dataKey,
                        rowIndex,
                        rowData: data[rowIndex] || {},
                        cellRenderer,
                        columnIndex,
                        columnWidth: width || defaultWidth,
                      })}
                    </CellMeasurer>
                  )}
                />
              )
            })}
          </Table>
        )}
      </WindowScroller>
    </div>
  )
}

TableBody.propTypes = {
  data: PropTypes.object.isRequired,
  cache: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
}

export default memo(TableBody)
