import React from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable'
import classNames from 'classnames'

import * as TableUtils from '../../utils/utils'

const ResizeHandler = ({ isResizeDisabled, dataKey, onResizeStart, onResize, onResizeEnd }) => (
  <Draggable
    disabled={isResizeDisabled}
    handle=".resizeContainer"
    axis="x"
    defaultClassName="DragHandle"
    defaultClassNameDragging="DragHandleActive"
    onDrag={(event, { deltaX }) => {
      TableUtils.stopEvent(event)
      onResize({ dataKey, deltaX })
    }}
    onStart={event => {
      TableUtils.stopEvent(event)
      onResizeStart()
    }}
    onStop={event => {
      TableUtils.stopEvent(event)
      onResizeEnd()
    }}
    position={{ x: 0 }}
    zIndex={999}>
    <div
      className={classNames('resizeContainer', { disabled: isResizeDisabled })}
      onMouseDown={event => TableUtils.stopEvent(event)}
      onClick={event => TableUtils.stopEvent(event)}>
      <div className="resizeIcon" />
    </div>
  </Draggable>
)

ResizeHandler.propTypes = {
  isResizeDisabled: PropTypes.bool,
  dataKey: PropTypes.string.isRequired,
  onResizeStart: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,
  onResizeEnd: PropTypes.func.isRequired,
}

export default ResizeHandler
