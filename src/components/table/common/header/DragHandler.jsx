import React from 'react'
import { GrDrag } from 'react-icons/gr'
import { SortableHandle } from 'react-sortable-hoc'

const DragHandler = SortableHandle(() => <GrDrag className="reorderIcon" />)

export default DragHandler
