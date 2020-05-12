import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ArrayMove from 'array-move'
import { Column, Table } from 'react-virtualized'

import * as TableConstants from '../utils/constants'
import useColumnsDimensions from '../hooks/useColumnsDimensions'
import DefaultHeaderRenderer from '../cellRenderers/default/DefaultHeaderRenderer'
import SortableHeaderRowRenderer from '../common/header/SortableHeaderRowRenderer'
import RegularHeaderRowRenderer from '../common/header/RegularHeaderRowRenderer'

const TableHeader = props => {
  const { headerHeight, onColumnsReorderStart, onColumnsReorder, onColumnsResizeStart, onColumnsResize } = props
  const { columns, columnsWidth, onResize } = useColumnsDimensions(props.columns)
  const onSortEnd = ({ oldIndex, newIndex }) => {
    onColumnsReorder(ArrayMove(columns, oldIndex, newIndex))
  }
  const onResizeEnd = () => {
    onColumnsResize(columns)
  }

  return (
    <Table
      className="table headerTable"
      autoHeight={true}
      width={columnsWidth}
      height={headerHeight}
      headerHeight={headerHeight}
      headerRowRenderer={params =>
        onColumnsReorder ? (
          <SortableHeaderRowRenderer
            {...params}
            axis="x"
            lockAxis="x"
            onSortStart={onColumnsReorderStart}
            onSortEnd={onSortEnd}
            useDragHandle
            useWindowAsScrollContainer
          />
        ) : (
          <RegularHeaderRowRenderer {...params} />
        )
      }
      rowHeight={() => headerHeight}
      rowCount={0}
      rowClassName="tableRow header"
      rowGetter={() => {
        throw new Error('Logic Error')
      }}>
      {columns.map((column, index) => {
        const { isStickToLeft, isStickToRight, label, dataKey, width, defaultWidth, headerRenderer } = column

        return (
          <Column
            isStickToLeft={isStickToLeft}
            isStickToRight={isStickToRight}
            key={index}
            label={label}
            width={width || defaultWidth}
            dataKey={dataKey}
            headerClassName={classNames('tableCell', 'header', {
              isStickToLeft,
              isStickToRight,
            })}
            headerRenderer={() =>
              DefaultHeaderRenderer({
                label,
                headerRenderer,
                dataKey,
                onResize,
                onResizeEnd,
                onResizeStart: onColumnsResizeStart,
              })
            }
          />
        )
      })}
    </Table>
  )
}

TableHeader.propTypes = {
  headerHeight: PropTypes.number,
  onColumnsResizeStart: PropTypes.func,
  onColumnsResize: PropTypes.func,
  onColumnsReorderStart: PropTypes.func,
  onColumnsReorder: PropTypes.func,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string,
      width: PropTypes.number,
      minResizeWidth: PropTypes.number,
      maxResizeWidth: PropTypes.number,
      defaultWidth: PropTypes.number.isRequired,
      headerRenderer: PropTypes.func,
    }),
  ).isRequired,
}

TableHeader.defaultProps = {
  headerHeight: TableConstants.HEADER_HEIGHT,
}

export default TableHeader
