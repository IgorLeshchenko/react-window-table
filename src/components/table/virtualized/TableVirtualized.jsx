import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { StickyContainer } from 'react-sticky'
import { CellMeasurer, CellMeasurerCache, Column, Table, WindowScroller } from 'react-virtualized'

import useColumnsDimensions from '../hooks/useColumnsDimensions'
import * as TableConstants from '../utils/constants'
import TableHeader from './TableHeader'
import DefaultCellRenderer from '../common/cellRenderers/DefaultCellRenderer'

const TableVirtualized = props => {
  const [isCellModificationPending, setIsCellModificationPending] = useState(false)
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: TableConstants.ROW_HEIGHT,
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
  const handleSortList = params => {
    // TODO :: re-fetch the data here
    props.onListSort(params)
  }

  return (
    <Fragment>
      <div className="windowScrollerWrapper">
        <StickyContainer>
          <TableHeader
            {...props}
            onListSort={handleSortList}
            onColumnsResizeStart={() => setIsCellModificationPending(true)}
            onColumnsReorderStart={() => setIsCellModificationPending(true)}
            onColumnsResize={handleResizeColumns}
            onColumnsReorder={handleReorderColumns}
          />

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
        </StickyContainer>
      </div>
      <div className="bottomSpacer" />
    </Fragment>
  )
}

TableVirtualized.propTypes = {
  columns: PropTypes.array.isRequired,
  onListSort: PropTypes.func,
  onColumnsReorder: PropTypes.func,
  onColumnsResize: PropTypes.func,
}

export default TableVirtualized
