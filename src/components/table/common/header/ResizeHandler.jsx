import React from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable'

const ResizeHandler = ({ onResize, dataKey }) => (
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
)

ResizeHandler.propTypes = {
  dataKey: PropTypes.string.isRequired,
  onResize: PropTypes.func.isRequired,
}

export default ResizeHandler
