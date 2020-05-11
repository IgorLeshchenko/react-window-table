import React from 'react'
import PropTypes from 'prop-types'

import { TableWrapper } from './TableWrapper'
import { TableVirtualized } from './TableVirtualized'

const Table = props => (
  <TableWrapper {...props}>
    <GridVirtualized {...props} />
  </TableWrapper>
)

Table.propTypes = {
  showHeader: PropTypes.bool,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      width: PropTypes.number,
      cellRenderer: PropTypes.func.isRequired,
    }),
  ).isRequired,
  handleLoadListPage: PropTypes.func.isRequired,
}

Table.defaultProps = {
  showHeader: true,
}

export default Table
