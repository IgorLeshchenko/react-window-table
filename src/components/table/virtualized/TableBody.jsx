import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { CellMeasurer, Column, Table, WindowScroller } from 'react-virtualized'

import * as TableConstants from '../utils/constants'
import * as ApiUtils from '../utils/apiUtils'
import useColumnsDimensions from '../hooks/useColumnsDimensions'
import DefaultCellRenderer from '../common/cellRenderers/DefaultCellRenderer'

const TableBody = props => {
  const { data, contentHeight, count, cache, scrollElement, onRowsRendered } = props
  const { columns, columnsWidth } = useColumnsDimensions(props.columns)

  return (
    <WindowScroller scrollElement={scrollElement.current}>
      {({ isScrolling, scrollTop }) => (
        <div style={{ width: columnsWidth }}>
          <Table
            className="table"
            autoHeight={true}
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
                        rowData: ApiUtils.getRowDataByIndex({ data, size: TableConstants.INITIAL_SIZE, rowIndex }),
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
  onRowsRendered: PropTypes.func.isRequired,
}

export default memo(TableBody)
