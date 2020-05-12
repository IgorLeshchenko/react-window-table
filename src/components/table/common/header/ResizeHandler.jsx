import React from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable'

const ResizeHandler = ({ dataKey, onResizeStart, onResize, onResizeEnd }) => (
  <Draggable
    axis="x"
    defaultClassName="DragHandle"
    defaultClassNameDragging="DragHandleActive"
    onDrag={(event, { deltaX }) => {
      event.preventDefault()
      event.stopPropagation()

      onResize({ dataKey, deltaX })
    }}
    onStart={onResizeStart}
    onStop={onResizeEnd}
    position={{ x: 0 }}
    zIndex={999}>
    <div className="resizeHandle">
      <div className="handle" />
    </div>
  </Draggable>
)

ResizeHandler.propTypes = {
  dataKey: PropTypes.string.isRequired,
  onResizeStart: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,
  onResizeEnd: PropTypes.func.isRequired,
}

export default ResizeHandler
