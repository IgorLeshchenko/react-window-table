import React, { memo } from 'react'
import PropTypes from 'prop-types'

const SimpleTextCellRenderer = ({ text }) => <span className="text">{text}</span>

SimpleTextCellRenderer.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default memo(SimpleTextCellRenderer, (prevProps, nextProps) => prevProps.text !== nextProps.text)
