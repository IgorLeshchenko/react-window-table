import { get, times, isNil, isEmpty } from 'lodash'

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
  const notStickedColumns = columns.filter(
    column => !column.isStickToLeft && !column.isStickToRight && !column.isHidden,
  )

  return [...stickToLeftColumns, ...notStickedColumns, ...stickToRightColumns]
}

export const getColumnsTotalWidth = columns =>
  columns.reduce((acc, value) => acc + (value.width || value.defaultWidth) + TableConstants.CELL_RIGHT_MARGIN, 0)

export const generateListFromPayload = params => {
  const { page, size, count, results } = params
  const data = {}
  const pagesCount = Math.floor(count / size)

  times(pagesCount, index => {
    const pageNumber = index + 1

    data[pageNumber] = []

    if (pageNumber === page) {
      data[pageNumber] = results
    } else {
      data[pageNumber] = new Array(size).fill(null)
    }
  })

  return data
}

export const getRowDataByIndex = params => {
  const { dataByPage, size, index } = params
  const pageNumber = Math.floor(index / size) + 1
  const indexInsidePage = index - (pageNumber - 1) * size

  return get(dataByPage, `${pageNumber}.${indexInsidePage}`, {}) || {}
}

export const getRequestPagesToLoad = params => {
  const { visibleStartIndex, visibleStopIndex, size, dataByPage } = params
  const pagesToLoad = []
  const minPageToLoad = Math.floor(visibleStartIndex / size)
  const maxPageToLoad = Math.floor(visibleStopIndex / size)

  for (let i = minPageToLoad; i <= maxPageToLoad; i++) {
    if (i >= minPageToLoad && i <= maxPageToLoad) {
      const pageNumber = i + 1
      const nonNilItemsByPage = dataByPage[pageNumber].filter(item => !isNil(item))

      if (isEmpty(nonNilItemsByPage)) {
        pagesToLoad.push(pageNumber)
      }
    }
  }

  return pagesToLoad
}
