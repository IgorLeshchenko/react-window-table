import React from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable'

const CellHeaderRenderer = props => {
  const { label, dataKey, onResize } = props

  return (
    <div className="cellContainer">
      <div className="reorderHandle" />
      <div className="title">{label}</div>

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

CellHeaderRenderer.propTypes = {
  label: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  onResize: PropTypes.func,
}

export default CellHeaderRenderer
