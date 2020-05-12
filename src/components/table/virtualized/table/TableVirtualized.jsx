import React, { createRef, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { AutoSizer, CellMeasurerCache, WindowScroller } from 'react-virtualized'

import * as TableConstants from '../../utils/constants'
import TableHeader from './TableHeader'

const TableVirtualized = props => {
  const { columns } = props
  const windowScrollerRef = createRef()
  const scrollTargetRef = createRef()
  const columnsTotalWidth = useMemo(() => columns.reduce((acc, cell) => acc + (cell.width || cell.defaultWidth), 0), [
    columns,
  ])
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: TableConstants.MIN_ROW_HEIGHT_WITH_PADDING,
  })

  return (
    <div className="windowScrollerWrapper">
      <TableHeader columnsTotalWidth={columnsTotalWidth} {...props} />

      <WindowScroller ref={windowScrollerRef}>
        {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <div>
                <div>{width}</div>
              </div>
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    </div>
  )
}

TableVirtualized.propTypes = {
  columns: PropTypes.array.isRequired,
  onColumnsReorder: PropTypes.func,
  onColumnsResize: PropTypes.func,
}

export default TableVirtualized

//
// <WindowScroller ref={windowScrollerRef}>
//   {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
//   <div className="windowScrollerWrapper">
//     <AutoSizer disableHeight>
//       {({ width }) => (
//         <Table autoHeight width={width} headerHeight={20} rowHeight={30} rowCount={1000} rowGetter={() => ({})}>
//           <Column headerRenderer={() => <span>test</span>} dataKey="name" label="Name" />
//         </Table>
//         </div>
//         )}
//         </AutoSizer>
//         </div>
//         )}
//         </WindowScroller>
