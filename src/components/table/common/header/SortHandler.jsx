import React from 'react'
import PropTypes from 'prop-types'
import { FaSortUp, FaSortDown } from 'react-icons/fa'

const SortHandler = ({ sortDirection }) =>
  sortDirection === 'asc' ? <FaSortUp className="sortIcon desc" /> : <FaSortDown className="sortIcon asc" />

SortHandler.propTypes = {
  sortDirection: PropTypes.string.isRequired,
}

export default SortHandler
