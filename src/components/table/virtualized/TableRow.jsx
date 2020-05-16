import React, { Fragment, memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import LoadingSkeleton from 'react-loading-skeleton'
import { isEmpty, isEqual } from 'lodash'

import * as TableUtils from '../utils/utils'
import * as TableConstants from '../utils/constants'
import usePrevious from '../hooks/usePrevious'

const TableRow = props => {
  const { measure, cellSettings, cellRenderers, rowData } = props
  const previousCellSettings = usePrevious(cellSettings)
  const previousRowData = usePrevious(rowData)
  const isDataLoaded = !isEmpty(rowData)
  const visibleColumns = cellSettings.filter(({ isHidden }) => !isHidden)
  const visibleColumnsWidth = TableUtils.getColumnsTotalWidth(visibleColumns)

  useEffect(() => {
    measure()
  }, [measure])

  useEffect(() => {
    const isRowDataChanged = !isEqual(rowData, previousRowData) && !isEmpty(previousRowData)
    const isCellSettingsChanged = !isEqual(cellSettings, previousCellSettings) && !isEmpty(previousCellSettings)

    if (isRowDataChanged) {
      measure()
    }

    if (isCellSettingsChanged) {
      measure()
    }
  }, [measure, cellSettings, previousCellSettings, rowData, previousRowData])

  if (!isDataLoaded) {
    return (
      <Fragment>
        <LoadingSkeleton width={visibleColumnsWidth} />
      </Fragment>
    )
  }

  return (
    <Fragment>
      {visibleColumns.map(cell => {
        const { dataKey, width, defaultWidth } = cell
        const cellRenderer = cellRenderers[dataKey]
        const cellStyles = {
          width: width || defaultWidth,
        }

        return (
          <div key={dataKey} className="tableCell" style={cellStyles}>
            <div className="renderer">
              {cellRenderer ? (
                cellRenderer({ dataKey, rowData })
              ) : (
                <span className="text">{TableConstants.EMPTY_VALUE_PLACEHOLDER}</span>
              )}
            </div>
          </div>
        )
      })}
    </Fragment>
  )
}

TableRow.propTypes = {
  cellSettings: PropTypes.array.isRequired,
  cellRenderers: PropTypes.object.isRequired,
  rowData: PropTypes.object.isRequired,
  measure: PropTypes.func.isRequired,
}

export default memo(TableRow)
