import React from 'react'
import PropTypes from 'prop-types'

import DragHandler from '../../common/header/DragHandler'
import ResizeHandler from '../../common/header/ResizeHandler'

const DefaultHeaderRenderer = props => {
  const { label, dataKey, onResizeStart, onResize, onResizeEnd } = props

  return (
    <div className="cellContainer">
      <div className="title">{label}</div>

      <DragHandler />

      <ResizeHandler dataKey={dataKey} onResizeStart={onResizeStart} onResize={onResize} onResizeEnd={onResizeEnd} />
    </div>
  )
}

DefaultHeaderRenderer.propTypes = {
  label: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  onResizeStart: PropTypes.func,
  onResize: PropTypes.func,
  onResizeEnd: PropTypes.func,
}

export default DefaultHeaderRenderer
