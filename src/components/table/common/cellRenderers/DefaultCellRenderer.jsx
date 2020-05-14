import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import * as TableConstants from '../../utils/constants'

const DefaultCellRenderer = props => {
  const { dataKey, rowData, rowIndex, columnIndex, cellRenderer } = props
  const isDataLoaded = !isEmpty(rowData)

  return (
    <div className="cellContainer" style={{ height: '100%' }}>
      <div className="cellBody">
        <div className="renderer">
          {isDataLoaded && (
            <Fragment>
              {cellRenderer ? (
                cellRenderer({ dataKey, rowData, rowIndex, columnIndex })
              ) : (
                <span className="text">{TableConstants.EMPTY_VALUE_PLACEHOLDER}</span>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

DefaultCellRenderer.propTypes = {
  dataKey: PropTypes.string.isRequired,
  rowData: PropTypes.object,
  rowIndex: PropTypes.number.isRequired,
  columnIndex: PropTypes.number.isRequired,
  cellRenderer: PropTypes.func,
}

export default DefaultCellRenderer
