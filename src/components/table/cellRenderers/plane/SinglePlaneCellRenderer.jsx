import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { isEqual } from 'lodash'

import './PlaneCellRenderers.scss'

const SinglePlaneCellRenderer = ({ plane }) => (
  <div className="planeCellRenderer">
    <div className="planeBlock">{plane.name}</div>
  </div>
)

SinglePlaneCellRenderer.propTypes = {
  plane: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
}

export default memo(SinglePlaneCellRenderer, (prevProps, nextProps) => !isEqual(prevProps.plane, nextProps.plane))
