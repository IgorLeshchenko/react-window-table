import React, { createRef, Fragment } from 'react'
import { AutoSizer, Table, Column, List, WindowScroller, CellMeasurerCache } from 'react-virtualized'

import * as TableConstants from '../../utils/constants'
import TableHeader from './TableHeader'

const TableVirtualized = props => {
  const windowScrollerRef = createRef()
  const scrollTargetRef = createRef()
  const cache = new CellMeasurerCache({
    fixedWidth: false,
    minHeight: TableConstants.MIN_ROW_HEIGHT_WITH_PADDING,
    minWidth: TableConstants.MIN_CELL_WIDTH,
  })

  return (
    <div className="windowScrollerWrapper">
      <TableHeader {...props} />

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
