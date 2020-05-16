import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import ArrayMove from 'array-move'

import useColumnsDimensions from '../hooks/useColumnsDimensions'
import SortableHeaderList from '../common/header/SortableHeaderList'

const TableHeader = props => {
  const {
    headerHeight,
    cellSettings,
    sortDataKey,
    sortDirection,
    onListSort,
    onColumnsReorderStart,
    onColumnsReorder,
    onColumnsResizeStart,
    onColumnsResize,
  } = props
  const { columns, columnsWidth, onResize } = useColumnsDimensions(cellSettings)
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
    <div className="tableHeader" style={{ height: headerHeight, width: columnsWidth }}>
      <SortableHeaderList
        useDragHandle
        columns={columns}
        sortDataKey={sortDataKey}
        sortDirection={sortDirection}
        axis="x"
        lockAxis="x"
        helperClass="reorderPending"
        onListSort={onListSort}
        onSortStart={onColumnsReorderStart}
        onSortEnd={onSortEnd}
        onResizeStart={onColumnsResizeStart}
        onResize={onResize}
        onResizeEnd={onResizeEnd}
      />
    </div>
  )
}

TableHeader.propTypes = {
  headerHeight: PropTypes.number.isRequired,
  cellSettings: PropTypes.array.isRequired,
  sortDataKey: PropTypes.string,
  sortDirection: PropTypes.string,
  onListSort: PropTypes.func,
  onColumnsResizeStart: PropTypes.func,
  onColumnsResize: PropTypes.func,
  onColumnsReorderStart: PropTypes.func,
  onColumnsReorder: PropTypes.func,
}

export default TableHeader
