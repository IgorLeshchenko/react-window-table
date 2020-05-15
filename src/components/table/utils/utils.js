import * as TableConstants from './constants'

export const stopEvent = event => {
  event.preventDefault()
  event.stopPropagation()
}

export const getSortDirection = params => {
  const { dataKey, sortDataKey, sortDirection } = params

  if (dataKey === sortDataKey) {
    return sortDirection === 'asc' ? 'desc' : 'asc'
  }

  return 'asc'
}

export const sortColumnsByStickyStatusAndVisibility = columns => {
  const stickToLeftColumns = columns.filter(column => column.isStickToLeft && !column.isHidden)
  const stickToRightColumns = columns.filter(column => column.isStickToRight && !column.isHidden)
  const notStickedColumns = columns.filter(column => !column.isStickToLeft && !column.isStickToRight)

  return [...stickToLeftColumns, ...notStickedColumns, ...stickToRightColumns]
}

export const getColumnsTotalWidth = columns =>
  columns.reduce((acc, value) => {
    const columnWidth = value.width || value.defaultWidth

    if (value.isHidden) {
      return acc
    }

    return acc + columnWidth + TableConstants.CELL_RIGHT_MARGIN
  }, 0)

