import React from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable'
import { SortableHandle } from 'react-sortable-hoc'
import { GrDrag } from 'react-icons/gr'

// Reordering columns handler
const DragHandler = SortableHandle(() => (
  <div className="reorderHandle">
    <GrDrag className="dragIcon" />
  </div>
))

const DefaultHeaderRenderer = props => {
  const { label, dataKey, onResize } = props

  return (
    <div className="cellContainer">
      <div className="title">{label}</div>

      <DragHandler />

      <Draggable
        axis="x"
        defaultClassName="DragHandle"
        defaultClassNameDragging="DragHandleActive"
        onDrag={(event, { deltaX }) => {
          event.preventDefault()
          event.stopPropagation()

          onResize({ dataKey, deltaX })
        }}
        position={{ x: 0 }}
        zIndex={999}>
        <div className="resizeHandle">
          <div className="handle" />
        </div>
      </Draggable>
    </div>
  )
}

DefaultHeaderRenderer.propTypes = {
  label: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  onResize: PropTypes.func,
}

export default DefaultHeaderRenderer
