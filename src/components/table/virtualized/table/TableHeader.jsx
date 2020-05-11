import React from 'react'
import PropTypes from 'prop-types'
import { AutoSizer, Table, Column } from 'react-virtualized'

import * as TableConstants from '../../utils/constants'

const TableHeader = props => {
  const { headerHeight, columns } = props

  return (
    <AutoSizer disableHeight={true}>
      {({ width }) => (
        <Table
          autoHeight={true}
          width={width}
          height={headerHeight}
          headerHeight={headerHeight}
          rowHeight={() => headerHeight}
          rowCount={0}
          rowClassName="tableRow header"
          rowGetter={() => {
            throw new Error('Logic Error')
          }}>
          {columns.map((column, index) => (
            <Column
              key={index}
              dataKey="id"
              headerStyle={{
                flexGrow: column.width ? 0 : 1,
                flexBasis: column.width ? column.width : 200,
              }}
              headerClassName="tableCell header"
              headerRenderer={() => column.label}
            />
          ))}
        </Table>
      )}
    </AutoSizer>
  )
}

TableHeader.propTypes = {
  headerHeight: PropTypes.number,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      width: PropTypes.number,
      cellRenderer: PropTypes.func.isRequired,
    }),
  ).isRequired,
}

TableHeader.defaultProps = {
  headerHeight: TableConstants.HEADER_HEIGHT,
}

export default TableHeader
