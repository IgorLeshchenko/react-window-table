import React, { memo } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const SimpleDateCellRenderer = ({ date, format = 'MMM D, YYYY' }) => (
  <span className="text">{moment(date).format(format)}</span>
)

SimpleDateCellRenderer.propTypes = {
  date: PropTypes.string.isRequired,
  format: PropTypes.string,
}

export default memo(
  SimpleDateCellRenderer,
  (prevProps, nextProps) => prevProps.date !== nextProps.date || prevProps.format !== nextProps.format,
)
