import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { AutoSizer } from 'react-virtualized'

import * as TableConstants from '../../utils/constants'

const ScrollWrapper = ({ children }) => {
  const scrollElement = useRef()

  return (
    <AutoSizer>
      {({ height, width }) => {
        const outsideElements = window.innerHeight - height
        const boundaryElements = outsideElements + TableConstants.HEADER_HEIGHT + TableConstants.WRAPPER_MARGIN * 2
        const heightWithoutBoundingElements = height + boundaryElements

        return (
          <div style={{ height, width, overflow: 'auto', scrollBehavior: 'smooth' }} ref={scrollElement}>
            {scrollElement.current && children({ height: heightWithoutBoundingElements, scrollElement })}
          </div>
        )
      }}
    </AutoSizer>
  )
}

ScrollWrapper.propTypes = {
  scrollElement: PropTypes.any,
  children: PropTypes.func.isRequired,
}

export default ScrollWrapper
