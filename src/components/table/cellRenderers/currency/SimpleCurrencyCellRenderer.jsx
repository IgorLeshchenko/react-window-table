import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { isEqual } from 'lodash'

const SimpleCurrencyCellRenderer = ({ data = {} }) => (
  <span className="text">
    {data.value} {data.currency}
  </span>
)

SimpleCurrencyCellRenderer.propTypes = {
  data: PropTypes.shape({
    currency: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
}

export default memo(SimpleCurrencyCellRenderer, (prevProps, nextProps) => !isEqual(prevProps.data, nextProps.data))
