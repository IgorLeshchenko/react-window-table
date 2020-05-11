import React from 'react'
import PropTypes from 'prop-types'

import { HeaderCell } from './HeaderCell'

export const TableHeader = props => {
  const { columns, width } = props

  return (
    <div className="tableHeader" style={{ width }}>
      <div className="tableHeaderContainer">
        {columns.map((column, cellIndex) => (
          <HeaderCell key={`header-${cellIndex}`} column={column} cellIndex={cellIndex} />
        ))}
      </div>
    </div>
  )
}

TableHeader.propTypes = {
  width: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      width: PropTypes.number,
      cellRenderer: PropTypes.func.isRequired,
    }),
  ).isRequired,
}
