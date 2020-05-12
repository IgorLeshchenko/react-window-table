import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CellMeasurer, CellMeasurerCache, Column, Table, WindowScroller } from 'react-virtualized'

import useColumnsDimensions from '../hooks/useColumnsDimensions'
import * as TableConstants from '../utils/constants'
import TableHeader from './TableHeader'
import DefaultCellRenderer from '../cellRenderers/default/DefaultCellRenderer'

const TableVirtualized = props => {
  const [isCellModificationPending, setIsCellModificationPending] = useState(false)
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: TableConstants.MIN_ROW_HEIGHT_WITH_PADDING,
  })
  const { columns, columnsWidth } = useColumnsDimensions(props.columns)
  const handleResizeColumns = newColumns => {
    props.onColumnsResize(newColumns)
    cache.clearAll()
    setIsCellModificationPending(false)
  }
  const handleReorderColumns = newColumns => {
    props.onColumnsReorder(newColumns)
    cache.clearAll()
    setIsCellModificationPending(false)
  }

  return (
    <Fragment>
      <div className="windowScrollerWrapper">
        <div className="scrollHeader">
          <TableHeader
            {...props}
            onColumnsResizeStart={() => setIsCellModificationPending(true)}
            onColumnsReorderStart={() => setIsCellModificationPending(true)}
            onColumnsResize={handleResizeColumns}
            onColumnsReorder={handleReorderColumns}
          />
        </div>
        <div
          className={classNames('scrollBody', { modifyActive: isCellModificationPending })}
          style={{ width: columnsWidth }}>
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
                rowCount={100}
                rowClassName="tableRow"
                rowGetter={({ index }) => index}
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
          </WindowScroller>
        </div>
      </div>
      <div className="bottomSpacer" />
    </Fragment>
  )
}

TableVirtualized.propTypes = {
  columns: PropTypes.array.isRequired,
  onColumnsReorder: PropTypes.func,
  onColumnsResize: PropTypes.func,
}

export default TableVirtualized
