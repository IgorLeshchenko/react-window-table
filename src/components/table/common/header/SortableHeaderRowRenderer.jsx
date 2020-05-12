import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'

import SortableHeader from './SortableHeader'

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

export default SortableHeaderRowRenderer
