import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ArrayMove from 'array-move'
import { AutoSizer, Column, Table } from 'react-virtualized'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { findIndex } from 'lodash'

import * as TableConstants from '../../utils/constants'
import DefaultHeaderRenderer from '../../cellRenderers/common/DefaultHeaderRenderer'

const SortableHeader = SortableElement(({ children, ...props }) => React.cloneElement(children, props))

const SortableHeaderRowRenderer = SortableContainer(({ className, columns, style }) => (
  <div className={className} role="row" style={style}>
    {React.Children.map(columns, (column, index) => {
      const { className } = column.props
      const isStickToLeft = className.indexOf('isStickToLeft') !== -1
      const isStickToRight = className.indexOf('isStickToRight') !== -1
      const isDisabled = isStickToLeft || isStickToRight
      let collectionName = 'sortable'

      if (isStickToLeft) {
        collectionName = 'stickToLeft'
      }

      if (isStickToRight) {
        collectionName = 'stickToRight'
      }

      return (
        <SortableHeader disabled={isDisabled} collection={collectionName} index={index}>
          {column}
        </SortableHeader>
      )
    })}
  </div>
))

// eslint-disable-next-line react/prop-types
const RegularHeaderRowRenderer = ({ className, columns, style }) => (
  <div className={className} role="row" style={style}>
    {React.Children.map(columns, (column, index) => (
      <SortableHeader index={index}>{column}</SortableHeader>
    ))}
  </div>
)

const TableHeader = props => {
  const { headerHeight, columns, columnsTotalWidth, onColumnsReorder, onColumnsResize } = props
  const onSortEnd = ({ oldIndex, newIndex }) => {
    onColumnsReorder(ArrayMove(columns, oldIndex, newIndex))
  }
  const onResize = ({ dataKey, deltaX }) => {
    const resizeIndex = findIndex(columns, cell => cell.dataKey === dataKey)
    const newColumns = columns.map((cell, index) => {
      const data = { ...cell }
      const { maxResizeWidth = 10000, minResizeWidth = 25 } = cell
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
  const renderHeaderRow = params =>
    onColumnsReorder ? (
      <SortableHeaderRowRenderer {...params} axis="x" lockAxis="x" onSortEnd={onSortEnd} useDragHandle />
    ) : (
      <RegularHeaderRowRenderer {...params} />
    )

  return (
    <AutoSizer disableHeight={true}>
      {({ width }) => (
        <Table
          className="table"
          autoHeight={true}
          width={width < columnsTotalWidth ? columnsTotalWidth : width}
          height={headerHeight}
          headerHeight={headerHeight}
          headerRowRenderer={renderHeaderRow}
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
