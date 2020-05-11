import React from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { isEmpty } from 'lodash'

export const CellVirtualized = props => {
  const { rowData, column, cellIndex, rowIndex } = props
  const { cellRenderer } = column
  const isDataLoadedForRow = !isEmpty(rowData)
  const columnStyles = {
    flexGrow: column.width ? 0 : 1,
    flexBasis: column.width ? column.width : 200,
  }

  return (
    <div className="tableCell" style={columnStyles}>
      {isDataLoadedForRow ? <div>{cellRenderer({ rowIndex, cellIndex, rowData })}</div> : <Skeleton />}
    </div>
  )
}

CellVirtualized.propTypes = {
  rowData: PropTypes.object.isRequired,
  column: PropTypes.shape({
    label: PropTypes.string,
    width: PropTypes.number,
    cellRenderer: PropTypes.func.isRequired,
  }).isRequired,
  cellIndex: PropTypes.number.isRequired,
  rowIndex: PropTypes.number.isRequired,
}
