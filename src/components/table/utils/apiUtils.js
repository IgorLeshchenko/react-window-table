import { compact, every, forEach, isArray, isEmpty, isNil, isNull, isUndefined } from 'lodash'

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
