import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'

import SortableHeaderCell from './SortableHeaderCell'

const SortableHeaderList = SortableContainer(props => {
  const {
    columns,
    sortDataKey,
    sortDirection,
    onListSort,
    onSortStart,
    onSortEnd,
    onResizeStart,
    onResize,
    onResizeEnd,
  } = props
  const visibleColumns = columns.filter(({ isHidden }) => !isHidden)

  return (
    <div className="tableRow">
      {visibleColumns.map((value, index) => {
        const { dataKey, isStickToLeft, isStickToRight } = value
        const isDisabled = isStickToLeft || isStickToRight
        let collectionName = 'sortable'

        if (isStickToLeft) {
          collectionName = 'stickToLeft'
        }

        if (isStickToRight) {
          collectionName = 'stickToRight'
        }

        return (
          <SortableHeaderCell
            // Hoc Props:
            key={`item-${dataKey}`}
            index={index}
            disabled={isDisabled}
            collection={collectionName}
            onSortStart={onSortStart}
            onSortEnd={onSortEnd}
            // Cell Props
            cell={{
              ...value,
              isReorderDisabled: isDisabled,
            }}
            sortDataKey={sortDataKey}
            sortDirection={sortDirection}
            onListSort={onListSort}
            onResizeStart={onResizeStart}
            onResize={onResize}
            onResizeEnd={onResizeEnd}
          />
        )
      })}
    </div>
  )
})

export default SortableHeaderList
