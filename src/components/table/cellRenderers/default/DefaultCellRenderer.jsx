import React from 'react'
import PropTypes from 'prop-types'

const DefaultCellRenderer = props => {
  const { label, rowIndex, columnIndex, cellRenderer, dataKey } = props

  return (
    <div className="cellContainer" style={{ height: '100%' }}>
      <span className="defaultText">{dataKey}</span>
    </div>
  )
}

DefaultCellRenderer.propTypes = {
  label: PropTypes.string,
  rowIndex: PropTypes.number.isRequired,
  columnIndex: PropTypes.number.isRequired,
  cellRenderer: PropTypes.func,
  dataKey: PropTypes.string.isRequired,
}

export default DefaultCellRenderer
