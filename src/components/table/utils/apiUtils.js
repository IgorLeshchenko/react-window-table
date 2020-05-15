import { omitBy, compact, every, forEach, isArray, isEmpty, isNil, isNull, isUndefined } from 'lodash'

export const formatFilterStrings = ({ filters }) => {
  const filterResults = []
  const notNilFilters = omitBy(filters, filter => isNil(filter) || isEmpty(filter))

  if (isEmpty(filters)) {
    return filterResults
  }

  forEach(notNilFilters, (value, key) => {
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
  const { endpoint, offset, limit, sortDataKey, sortDirection, filters } = params
  const queryString = formatQueryString({
    offset,
    limit,
    sortDataKey,
    sortDirection,
    filters,
  })

  return `${endpoint}?${queryString}`
}

export const fetchData = params => {
  const { endpoint, startIndex, stopIndex, sortDataKey, sortDirection, filters } = params
  const url = getURLString({
    endpoint,
    offset: startIndex,
    limit: stopIndex - startIndex,
    sortDataKey,
    sortDirection,
    filters,
  })

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

export const transformItemsToPages = params => {
  const { items, startIndex } = params
  const itemsByIndex = {}

  items.forEach((item, index) => {
    itemsByIndex[startIndex + index] = item
  })

  return itemsByIndex
}
