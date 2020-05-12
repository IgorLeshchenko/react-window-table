import React from 'react'
import { GrDrag } from 'react-icons/gr'
import { SortableHandle } from 'react-sortable-hoc'

const DragHandler = SortableHandle(() => (
  <div className="reorderHandle">
    <GrDrag className="dragIcon" />
  </div>
))

export default DragHandler
