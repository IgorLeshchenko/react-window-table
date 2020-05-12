import React from 'react'
import PropTypes from 'prop-types'

const CellRenderer = props => {
  const { dataKey } = props

  return (
    <div className="cellContainer" style={{ height: '100%' }}>
      <span className="defaultText">{dataKey}</span>
    </div>
  )
}

CellRenderer.propTypes = {
  dataKey: PropTypes.string.isRequired,
}

export default CellRenderer
