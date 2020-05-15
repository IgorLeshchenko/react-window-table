import {
  chunk,
  compact,
  every,
  forEach,
  get,
  isArray,
  isEmpty,
  isNil,
  isNull,
  isUndefined,
  max,
  min,
  times,
  omitBy,
} from 'lodash'

export const formatFilterStrings = ({ filters }) => {
  const filterResults = []

  if (isEmpty(filters)) {
    return filterResults
  }

  forEach(filters, (value, key) => {
    if (value !== '' && !isUndefined(value)) {
      const keyEncoded = encodeURIComponent(key)

      if (isArray(value)) {
        if (!isEmpty(value) && every(value, isNull)) {
          value = ','.concat(value.join(','))
        } else {
          value = value.join(',')
        }
      }
      const filterValue = encodeURIComponent(value)

      filterResults.push(`${keyEncoded}=${filterValue}`)
    }
  })

  return filterResults
}

export const formatSortStrings = ({ sortDataKey, sortDirection }) => {
  const sortResults = []

  if (!sortDataKey || !sortDirection) {
    return sortResults
  }

  return [`ordering=${sortDirection === 'asc' ? '' : '-'}${sortDataKey}`]
}

export const formatQueryString = ({ offset, limit, sortDataKey, sortDirection, filters }) =>
  compact([
    !isNil(offset) ? `offset=${offset}` : null,
    !isNil(limit) ? `limit=${limit}` : null,
    ...formatSortStrings({ sortDataKey, sortDirection }),
    ...formatFilterStrings({ filters }),
  ]).join('&')

export const getURLString = params => {
  const { endpoint, page, size, sortDataKey, sortDirection, filters } = params
  const queryString = formatQueryString({
    offset: page * size,
    limit: size,
    sortDataKey,
    sortDirection,
    filters,
  })

  return `${endpoint}?${queryString}`
}

export const fetchData = params => {
  const url = getURLString(params)

  return fetch(url, { signal: params.signal })
    .then(payload => payload.json())
    .then(response => ({
      items: response.results,
      count: response.count,
    }))
    .catch(() => ({
      items: [],
      count: 0,
    }))
}

export const getInitialData = params => {
  const { count, size } = params
  const pagesNumber = Math.floor(count / size)
  const pages = {}

  times(pagesNumber, index => {
    pages[index] = {}

    times(size, itemIndex => {
      pages[index][itemIndex] = null
    })
  })

  return pages
}

export const transformItemsToPages = params => {
  const { items, page, size } = params
  const itemsByPage = {}

  chunk(items, size).forEach((chunk, index) => {
    const pageNumber = page + index

    if (!itemsByPage[pageNumber]) {
      itemsByPage[pageNumber] = {}
    }

    chunk.forEach((item, itemIndex) => {
      itemsByPage[pageNumber][pageNumber * size + itemIndex] = item
    })
  })

  return itemsByPage
}

export const getRowDataByIndex = params => {
  const { data, size, rowIndex } = params
  const pageNumber = Math.floor(rowIndex / size)

  return get(data, `${pageNumber}.${rowIndex}`, {}) || {}
}

export const getPagesToLoadByIndex = params => {
  const { overscanStartIndex, overscanStopIndex, size } = params
  const startPage = Math.ceil(overscanStartIndex / size)
  const stopPage = Math.ceil(overscanStopIndex / size)

  if (startPage === 0) {
    return { startPage: 1, stopPage: 1 }
  }

  return { startPage, stopPage }
}

export const isDataLoadedForPage = params => {
  const { data, page } = params
  const dataByPage = omitBy(data[page], item => isNil(item))

  return !isEmpty(dataByPage)
}

export const getOffsetAndLimitByPagesToLoad = params => {
  const { pagesToLoad, data, size } = params
  const result = { page: 0, size: 0 }
  const notLoadedPages = []

  pagesToLoad.forEach(page => {
    const isPageLoaded = !isNil(get(data, `[${page}][0]`, null))

    if (!isPageLoaded) {
      notLoadedPages.push(page)
    }
  })

  result.page = min(notLoadedPages)
  result.size = (max(notLoadedPages) - min(notLoadedPages)) * size || size

  return result
}
