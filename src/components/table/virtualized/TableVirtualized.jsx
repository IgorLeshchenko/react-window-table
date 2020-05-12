import React, { createRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import { AutoSizer, CellMeasurer, CellMeasurerCache, Column, Table, WindowScroller } from 'react-virtualized'

import * as TableConstants from '../utils/constants'

import TableHeader from './TableHeader'
import DefaultCellRenderer from '../cellRenderers/default/DefaultCellRenderer'

const TableVirtualized = props => {
  const { columns } = props
  const windowScrollerRef = createRef()
  const tableRef = createRef()
  const columnsTotalWidth = useMemo(() => columns.reduce((acc, cell) => acc + (cell.width || cell.defaultWidth), 0), [
    columns,
  ])
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: TableConstants.MIN_ROW_HEIGHT_WITH_PADDING,
  })
  const wrapperWidth = columnsTotalWidth + 24 * 2

  return (
    <div className="windowScrollerWrapper" style={{ width: wrapperWidth }}>
      <TableHeader columnsTotalWidth={columnsTotalWidth} {...props} />

      <WindowScroller ref={windowScrollerRef}>
        {({ height, isScrolling, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <Table
                className="table"
                autoHeight={true}
                isScrolling={isScrolling}
                scrollTop={scrollTop}
                width={width < columnsTotalWidth ? columnsTotalWidth : width}
                height={height}
                headerHeight={0}
                disableHeader={true}
                rowHeight={cache.rowHeight}
                rowCount={100}
                rowClassName="tableRow"
                rowGetter={({ index }) => index}
                ref={tableRef}
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
                        <CellMeasurer
                          cache={cache}
                          columnIndex={columnIndex}
                          key={key}
                          parent={parent}
                          rowIndex={rowIndex}>
                          {DefaultCellRenderer({ label, rowIndex, columnIndex, cellRenderer, dataKey })}
                        </CellMeasurer>
                      )}
                    />
                  )
                })}
              </Table>
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    </div>
  )
}

TableVirtualized.propTypes = {
  columns: PropTypes.array.isRequired,
  onColumnsReorder: PropTypes.func,
  onColumnsResize: PropTypes.func,
}

export default TableVirtualized
