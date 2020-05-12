import React from 'react'
import PropTypes from 'prop-types'

const RegularHeaderRowRenderer = ({ className, columns, style }) => (
  <div className={className} role="row" style={style}>
    {React.Children.map(columns, (column, index) => (
      <div index={index}>{column}</div>
    ))}
  </div>
)

RegularHeaderRowRenderer.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.array.isRequired,
  style: PropTypes.object,
}

export default RegularHeaderRowRenderer
