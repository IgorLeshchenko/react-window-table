import React from 'react'
import PropTypes from 'prop-types'

// TODO :: add icons
const SortHandler = ({ sortDirection }) =>
  sortDirection === 'desc' ? <div className="sortIcon desc">&#8593;</div> : <div className="sortIcon asc">&#8595;</div>

SortHandler.propTypes = {
  sortDirection: PropTypes.string.isRequired,
}

export default SortHandler
