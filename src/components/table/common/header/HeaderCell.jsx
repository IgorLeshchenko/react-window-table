import React from 'react'
import PropTypes from 'prop-types'

export const HeaderCell = props => {
  const { column, cellIndex } = props
  const { headerRenderer, label, width } = column
  const columnStyles = {
    flexGrow: width ? 0 : 1,
    flexBasis: width ? width : 200,
  }

  return (
    <div className="tableCell headerCell" style={columnStyles}>
      {headerRenderer ? headerRenderer({ cellIndex }) : label}
    </div>
  )
}

HeaderCell.propTypes = {
  column: PropTypes.shape({
    label: PropTypes.string,
    width: PropTypes.number,
    headerRenderer: PropTypes.func,
  }).isRequired,
  cellIndex: PropTypes.number.isRequired,
}
