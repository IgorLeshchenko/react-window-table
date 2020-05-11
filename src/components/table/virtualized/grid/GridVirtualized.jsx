import React, { createRef, Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeGrid } from 'react-window'
import { get, isEmpty, debounce } from 'lodash'

import * as TableConstants from '../../utils/constants'
import * as TableUtils from '../../utils/TableUtils'
import { useResetCache } from '../../hooks/useResetCache'
import { TableContext } from '../../context/tableContext'

const GridVirtualized = props => {
  const { showHeader, headerHeight, estimatedRowHeight, estimatedCellWidth, handleLoadListPage, columns } = props
  const [isLoading, setIsLoading] = useState(false)
  const [dataByPage, setDataByPage] = useState({})
  const [requestParams, setRequestParams] = useState({
    page: 1,
    size: 20,
    count: 0,
  })
  const headerGrid = createRef()
  const mainGrid = useResetCache(dataByPage)
  const gridSizeMap = React.useRef({})
  const getRowSize = React.useCallback(
    rowIndex => get(gridSizeMap, `current.row-${rowIndex}`, TableConstants.MIN_ROW_HEIGHT_WITH_PADDING),
    [],
  )
  const getCellSize = React.useCallback(
    cellIndex => get(gridSizeMap, `current.cell-${cellIndex}`, TableConstants.MIN_CELL_WIDTH),
    [],
  )
  const setRowSize = React.useCallback(
    (rowIndex, size) => {
      gridSizeMap.current = {
        ...gridSizeMap.current,
        [`row-${rowIndex}`]: size,
      }
      mainGrid.current.resetAfterRowIndex(0)
    },
    [mainGrid],
  )
  const setCellSize = React.useCallback(
    (cellIndex, size) => {
      gridSizeMap.current = {
        ...gridSizeMap.current,
        [`cell-${cellIndex}`]: size,
      }
      mainGrid.current.resetAfterRowIndex(0)
    },
    [mainGrid],
  )

  useEffect(() => {
    if (!isEmpty(dataByPage) || isLoading) {
      return
    }

    setIsLoading(true)

    handleLoadListPage({ page: requestParams.page, size: requestParams.size }).then(payload => {
      setRequestParams(payload)
      setDataByPage(TableUtils.generateListFromPayload(payload))

      setIsLoading(false)
    })
  }, [isLoading, dataByPage, requestParams, handleLoadListPage])

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <div className="tableWrapper">
      <AutoSizer>
        {({ height, width }) => {
          const gridWidth = width
          const gridHeight = showHeader ? height - headerHeight : height

          return (
            <TableContext.Provider value={{ setRowSize, setCellSize, gridWidth, gridHeight }}>
              <Fragment>
                {showHeader && (
                  <VariableSizeGrid
                    ref={headerGrid}
                    className="tableHeader"
                    columnCount={columns.length}
                    rowCount={1}
                    columnWidth={getCellSize}
                    rowHeight={() => headerHeight}
                    estimatedColumnWidth={estimatedCellWidth}
                    estimatedRowHeight={headerHeight}
                    height={headerHeight}
                    width={width}>
                    {({ rowIndex, columnIndex, style }) => (
                      <div style={style}>
                        row {rowIndex}, column {columnIndex}
                      </div>
                    )}
                  </VariableSizeGrid>
                )}

                <VariableSizeGrid
                  ref={mainGrid}
                  className="table"
                  columnCount={columns.length}
                  rowCount={requestParams.count}
                  columnWidth={getCellSize}
                  rowHeight={getRowSize}
                  estimatedColumnWidth={estimatedCellWidth}
                  estimatedRowHeight={estimatedRowHeight}
                  onScroll={({ scrollLeft }) => headerGrid.current.scrollTo({ scrollLeft })}
                  height={gridHeight}
                  width={gridWidth}>
                  {({ rowIndex, columnIndex, style }) => (
                    <div style={style}>
                      row {rowIndex}, column {columnIndex}
                    </div>
                  )}
                </VariableSizeGrid>
              </Fragment>
            </TableContext.Provider>
          )
        }}
      </AutoSizer>
    </div>
  )
}

GridVirtualized.propTypes = {
  showHeader: PropTypes.bool,
  headerHeight: PropTypes.number,
  estimatedRowHeight: PropTypes.number,
  estimatedCellWidth: PropTypes.number,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      width: PropTypes.number,
      cellRenderer: PropTypes.func.isRequired,
    }),
  ).isRequired,
  children: PropTypes.any,
}

GridVirtualized.defaultProps = {
  showHeader: true,
  headerHeight: TableConstants.HEADER_HEIGHT,
  estimatedRowHeight: TableConstants.MIN_ROW_HEIGHT_WITH_PADDING,
  estimatedCellWidth: TableConstants.MIN_CELL_WIDTH,
}

export default GridVirtualized
