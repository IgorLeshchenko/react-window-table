import React, { useContext, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { getRowHeight } from '../utils/TableUtils'
import { TableContext } from '../context/tableContext'
import { CellVirtualized } from './CellVirtualized'

export const RowVirtualized = props => {
  const { index, style, rowData, columns } = props
  const { setRowSize, wrapperWidth } = useContext(TableContext)
  const ref = useRef(null)

  // Calculate row height when component is mounted to adjust the scroll
  useEffect(() => {
    setRowSize(index, getRowHeight(ref.current))
  }, [wrapperWidth, index, setRowSize, ref])

  return (
    <div className="tableRow" style={style}>
      <div className="tableRowContainer" ref={ref}>
        {columns.map((column, cellIndex) => (
          <CellVirtualized
            key={`${index - cellIndex}`}
            column={column}
            rowData={rowData}
            cellIndex={cellIndex}
            rowIndex={index}
          />
        ))}
      </div>
    </div>
  )
}

RowVirtualized.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  rowData: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      width: PropTypes.number,
      cellRenderer: PropTypes.func.isRequired,
    }),
  ).isRequired,
}
