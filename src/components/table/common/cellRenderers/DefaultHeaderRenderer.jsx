import React from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'

import * as TableUtils from '../../utils/utils'

import SortHandler from '../header/SortHandler'
import DragHandler from '../header/DragHandler'
import ResizeHandler from '../header/ResizeHandler'

const DefaultHeaderRenderer = props => {
  const {
    isStickToLeft,
    isStickToRight,
    isResizeDisabled,
    label,
    dataKey,
    headerRenderer,
    sortDataKey,
    sortDirection,
    onListSort,
    onResizeStart,
    onResize,
    onResizeEnd,
  } = props
  const nextSortDirection = TableUtils.getSortDirection({ dataKey, sortDataKey, sortDirection })
  const onCellClick = onListSort ? () => onListSort({ dataKey, sortDirection: nextSortDirection }) : noop

  return (
    <div className="cellContainer" onMouseDown={onCellClick}>
      <div className="cellBody">
        <div className="renderer">
          {headerRenderer ? headerRenderer : <div className="text">{label ? label : null}</div>}
        </div>

        <div className="sortContainer">{sortDataKey === dataKey && <SortHandler sortDirection={sortDirection} />}</div>

        {!isStickToLeft && !isStickToRight && (
          <div className="reorderContainer" onMouseDown={event => TableUtils.stopEvent(event)}>
            <DragHandler />
          </div>
        )}

        <div className="resizeContainer" onMouseDown={event => TableUtils.stopEvent(event)}>
          <ResizeHandler
            isResizeDisabled={isResizeDisabled}
            dataKey={dataKey}
            onResizeStart={onResizeStart}
            onResize={onResize}
            onResizeEnd={onResizeEnd}
          />
        </div>
      </div>
    </div>
  )
}

DefaultHeaderRenderer.propTypes = {
  isStickToLeft: PropTypes.bool,
  isStickToRight: PropTypes.bool,
  isResizeDisabled: PropTypes.bool,
  label: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  sortDataKey: PropTypes.string,
  sortDirection: PropTypes.string,
  headerRenderer: PropTypes.func,
  onListSort: PropTypes.func,
  onResizeStart: PropTypes.func,
  onResize: PropTypes.func,
  onResizeEnd: PropTypes.func,
}

export default DefaultHeaderRenderer
