import React from 'react'
import PropTypes from 'prop-types'

import DragHandler from '../../common/header/DragHandler'
import ResizeHandler from '../../common/header/ResizeHandler'

const DefaultHeaderRenderer = props => {
  const { label, dataKey, onResize } = props

  return (
    <div className="cellContainer">
      <div className="title">{label}</div>

      <DragHandler />
      <ResizeHandler dataKey={dataKey} onResize={onResize} />
    </div>
  )
}

DefaultHeaderRenderer.propTypes = {
  label: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  onResize: PropTypes.func,
}

export default DefaultHeaderRenderer
