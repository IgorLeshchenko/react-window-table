import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ArrayMove from 'array-move'
import { AutoSizer, Column, Table } from 'react-virtualized'
import { findIndex } from 'lodash'

import * as TableConstants from '../utils/constants'
import DefaultHeaderRenderer from '../cellRenderers/default/DefaultHeaderRenderer'
import SortableHeaderRowRenderer from '../common/header/SortableHeaderRowRenderer'
import RegularHeaderRowRenderer from '../common/header/RegularHeaderRowRenderer'

const TableHeader = props => {
  const { headerHeight, columns, columnsTotalWidth, onColumnsReorder, onColumnsResize } = props
  const onSortEnd = ({ oldIndex, newIndex }) => {
    onColumnsReorder(ArrayMove(columns, oldIndex, newIndex))
  }
  const onResize = ({ dataKey, deltaX }) => {
    const resizeIndex = findIndex(columns, cell => cell.dataKey === dataKey)
    const newColumns = columns.map((cell, index) => {
      const {
        maxResizeWidth = TableConstants.MAX_CELL_RESIZE_WIDTH,
        minResizeWidth = TableConstants.MIN_CELL_RESIZE_WIDTH,
      } = cell
      const data = { ...cell }
      const previousWidth = cell.width || cell.defaultWidth

      if (index === resizeIndex) {
        const calculatedWidth = previousWidth + deltaX

        if (calculatedWidth > minResizeWidth && calculatedWidth < maxResizeWidth) {
          data.width = calculatedWidth
        }
      }

      return data
    })

    onColumnsResize(newColumns)
  }

  return (
    <AutoSizer disableHeight={true}>
      {({ width }) => (
        <Table
          className="table"
          autoHeight={true}
          width={width < columnsTotalWidth ? columnsTotalWidth : width}
          height={headerHeight}
          headerHeight={headerHeight}
          headerRowRenderer={params =>
            onColumnsReorder ? (
              <SortableHeaderRowRenderer {...params} axis="x" lockAxis="x" onSortEnd={onSortEnd} useDragHandle />
            ) : (
              <RegularHeaderRowRenderer {...params} />
            )
          }
          rowHeight={() => headerHeight}
          rowCount={0}
          rowClassName="tableRow header"
          rowGetter={() => {
            throw new Error('Logic Error')
          }}>
          {columns.map((column, index) => {
            const { isStickToLeft, isStickToRight, label, dataKey, width, defaultWidth, headerRenderer } = column

            return (
              <Column
                isStickToLeft={isStickToLeft}
                isStickToRight={isStickToRight}
                key={index}
                label={label}
                width={width || defaultWidth}
                dataKey="id" // note :: this is just a placeholder (not used)
                headerClassName={classNames('tableCell', 'header', {
                  isStickToLeft,
                  isStickToRight,
                })}
                headerRenderer={() => DefaultHeaderRenderer({ label, headerRenderer, dataKey, onResize })}
              />
            )
          })}
        </Table>
      )}
    </AutoSizer>
  )
}

TableHeader.propTypes = {
  columnsTotalWidth: PropTypes.number.isRequired,
  headerHeight: PropTypes.number,
  onColumnsReorder: PropTypes.func,
  onColumnsResize: PropTypes.func,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string,
      width: PropTypes.number,
      minResizeWidth: PropTypes.number,
      maxResizeWidth: PropTypes.number,
      defaultWidth: PropTypes.number.isRequired,
      headerRenderer: PropTypes.func,
    }),
  ).isRequired,
}

TableHeader.defaultProps = {
  headerHeight: TableConstants.HEADER_HEIGHT,
}

export default TableHeader
