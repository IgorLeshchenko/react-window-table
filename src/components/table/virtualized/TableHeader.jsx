import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ArrayMove from 'array-move'
import { Column, Table } from 'react-virtualized'

import * as TableConstants from '../utils/constants'
import useColumnsDimensions from '../hooks/useColumnsDimensions'
import DefaultHeaderRenderer from '../common/cellRenderers/DefaultHeaderRenderer'
import SortableHeaderRowRenderer from '../common/header/SortableHeaderRowRenderer'
import RegularHeaderRowRenderer from '../common/header/RegularHeaderRowRenderer'

const TableHeader = props => {
  const {
    headerHeight,
    sortDataKey,
    sortDirection,
    onListSort,
    onColumnsReorderStart,
    onColumnsReorder,
    onColumnsResizeStart,
    onColumnsResize,
  } = props
  const { columns, columnsWidth, onResize } = useColumnsDimensions(props.columns)
  const visibleColumns = columns.filter(({ isHidden }) => !isHidden)
  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      const invisibleColumns = columns.filter(({ isHidden }) => isHidden)
      const newVisibleColumns = ArrayMove(visibleColumns, oldIndex, newIndex)

      onColumnsReorder([...invisibleColumns, ...newVisibleColumns])
    },
    [columns, visibleColumns, onColumnsReorder],
  )
  const onResizeEnd = () => {
    onColumnsResize(columns)
  }

  return (
    <div className={classNames('scrollHeader')} style={{ width: columnsWidth }}>
      <Table
        className="table headerTable"
        autoHeight={true}
        width={columnsWidth}
        height={headerHeight}
        headerHeight={headerHeight}
        headerRowRenderer={params =>
          onColumnsReorder ? (
            <SortableHeaderRowRenderer
              {...params}
              axis="x"
              lockAxis="x"
              helperClass="reorderPending"
              onSortStart={onColumnsReorderStart}
              onSortEnd={onSortEnd}
              useDragHandle
              useWindowAsScrollContainer
            />
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
        {visibleColumns.map((column, index) => {
          const {
            isResizeDisabled,
            isStickToLeft,
            isStickToRight,
            isSortDisabled,
            label,
            dataKey,
            width,
            defaultWidth,
            headerRenderer,
          } = column

          return (
            <Column
              isStickToLeft={isStickToLeft}
              isStickToRight={isStickToRight}
              key={index}
              label={label}
              width={width || defaultWidth}
              dataKey={dataKey}
              headerClassName={classNames('tableCell', 'header', {
                isStickToLeft,
                isStickToRight,
                isResizeDisabled,
                isSortDisabled,
              })}
              headerRenderer={() =>
                DefaultHeaderRenderer({
                  isResizeDisabled,
                  isStickToLeft,
                  isStickToRight,
                  isSortDisabled,
                  label,
                  headerRenderer,
                  dataKey,
                  sortDataKey,
                  sortDirection,
                  onListSort,
                  onResizeStart: onColumnsResizeStart,
                  onResize,
                  onResizeEnd,
                })
              }
            />
          )
        })}
      </Table>
    </div>
  )
}

TableHeader.propTypes = {
  sortDataKey: PropTypes.string,
  sortDirection: PropTypes.string,
  headerHeight: PropTypes.number,
  onListSort: PropTypes.func,
  onColumnsResizeStart: PropTypes.func,
  onColumnsResize: PropTypes.func,
  onColumnsReorderStart: PropTypes.func,
  onColumnsReorder: PropTypes.func,
  columns: PropTypes.array.isRequired,
}

TableHeader.defaultProps = {
  headerHeight: TableConstants.HEADER_HEIGHT,
}

export default TableHeader
