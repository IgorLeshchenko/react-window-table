import React from 'react'
import PropTypes from 'prop-types'
import { FaSortUp, FaSortDown } from 'react-icons/fa'

const SortHandler = ({ sortDirection }) =>
  sortDirection === 'asc' ? <FaSortDown className="sortIcon asc" /> : <FaSortUp className="sortIcon desc" />

SortHandler.propTypes = {
  sortDirection: PropTypes.string.isRequired,
}

export default SortHandler
