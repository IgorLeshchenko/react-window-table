import React from 'react'
import PropTypes from 'prop-types'
import AutoSizer from 'react-virtualized-auto-sizer'

export const TableWrapper = props => (
  <AutoSizer>
    {({ height, width }) => (
      <div className="tableWrapper" style={{ width, height }}>
        {props.children}
      </div>
    )}
  </AutoSizer>
)

TableWrapper.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      width: PropTypes.number,
      cellRenderer: PropTypes.func.isRequired,
    }),
  ).isRequired,
  children: PropTypes.any,
}
