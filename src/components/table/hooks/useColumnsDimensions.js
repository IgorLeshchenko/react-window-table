import { useState, useEffect } from 'react'
import { findIndex } from 'lodash'

import * as TableUtils from '../utils/utils'
import * as TableConstants from '../utils/constants'

const useColumnsDimensions = initialColumns => {
  const [columns, setColumns] = useState([])
  const [columnsWidth, setColumnsWidth] = useState(0)

  useEffect(() => {
    setColumns(TableUtils.sortColumnsByStickyStatusAndVisibility(initialColumns))
    setColumnsWidth(TableUtils.getColumnsTotalWidth(initialColumns))
  }, [initialColumns])

  const onResize = ({ dataKey, deltaX }) => {
    const resizeIndex = findIndex(columns, cell => cell.dataKey === dataKey)
    const newColumns = columns.map((cell, index) => {
      const data = { ...cell }
      const previousWidth = cell.width || cell.defaultWidth

      if (index === resizeIndex) {
        const calculatedWidth = previousWidth + deltaX

        if (
          calculatedWidth > TableConstants.MIN_CELL_RESIZE_WIDTH &&
          calculatedWidth < TableConstants.MAX_CELL_RESIZE_WIDTH
        ) {
          data.width = calculatedWidth
        }
      }

      return data
    })
    const newWidth = TableUtils.getColumnsTotalWidth(newColumns)

    setColumns(newColumns)
    setColumnsWidth(newWidth)
  }

  return { columns, columnsWidth, onResize }
}

export default useColumnsDimensions
