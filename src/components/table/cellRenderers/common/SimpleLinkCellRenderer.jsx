import React, { memo } from 'react'
import PropTypes from 'prop-types'

const SimpleLinkCellRenderer = ({ text }) => (
  <a href="https://google.com" target="_blank" rel="noopener noreferrer">
    {text}
  </a>
)

SimpleLinkCellRenderer.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default memo(SimpleLinkCellRenderer, (prevProps, nextProps) => prevProps.text !== nextProps.text)
