import React, { useCallback } from 'react'
import { SortableElement } from 'react-sortable-hoc'

import * as TableUtils from '../../utils/utils'

import ResizeHandler from './ResizeHandler'
import SortHandler from './SortHandler'
import DragHandler from './DragHandler'

const SortableHeaderCell = SortableElement(props => {
  const { cell, sortDataKey, sortDirection, onListSort, onResizeStart, onResize, onResizeEnd } = props
  const { dataKey, isResizeDisabled, isReorderDisabled, isSortDisabled, label, width, defaultWidth } = cell
  const handleSort = useCallback(() => {
    const nextSortDirection = TableUtils.getSortDirection({ dataKey, sortDataKey, sortDirection })

    if (onListSort && !isSortDisabled) {
      onListSort({ dataKey, sortDirection: nextSortDirection })
    }
  }, [isSortDisabled, dataKey, sortDataKey, sortDirection, onListSort])
  const cellStyles = {
    width: width || defaultWidth,
  }

  return (
    <div style={cellStyles} className="tableCell" onMouseDown={handleSort}>
      <div className="renderer">{label}</div>

      <div className="cellControls">
        {sortDataKey === dataKey && (
          <div className="sortContainer">
            <SortHandler sortDirection={sortDirection} />
          </div>
        )}

        {!isReorderDisabled && (
          <div className="reorderContainer" onMouseDown={event => TableUtils.stopEvent(event)}>
            <DragHandler />
          </div>
        )}

        <ResizeHandler
          isResizeDisabled={isResizeDisabled}
          dataKey={dataKey}
          onResizeStart={onResizeStart}
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />
      </div>
    </div>
  )
})

export default SortableHeaderCell
