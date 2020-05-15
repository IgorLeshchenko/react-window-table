import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import * as TableConstants from '../../utils/constants'

const CellRenderer = memo(props => {
  const { dataKey, rowData, cellRenderer } = props

  return (
    <div className="cellBody">
      <div className="renderer">
        {cellRenderer ? (
          cellRenderer({ dataKey, rowData })
        ) : (
          <span className="text">{TableConstants.EMPTY_VALUE_PLACEHOLDER}</span>
        )}
      </div>
    </div>
  )
})

const DefaultCellRenderer = props => {
  const { dataKey, rowData, cellRenderer } = props
  const isDataLoaded = !isEmpty(rowData)

  return (
    <div className="cellContainer" style={{ height: '100%' }}>
      {isDataLoaded && <CellRenderer dataKey={dataKey} rowData={rowData} cellRenderer={cellRenderer} />}
    </div>
  )
}

DefaultCellRenderer.propTypes = {
  dataKey: PropTypes.string.isRequired,
  rowData: PropTypes.object,
  cellRenderer: PropTypes.func,
}

CellRenderer.propTypes = DefaultCellRenderer.propTypes

export default DefaultCellRenderer
