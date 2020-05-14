import { useState, useEffect } from 'react'
import { map, isEqual, isEmpty } from 'lodash'

import * as ApiUtils from '../utils/apiUtils'
import usePrevious from './usePrevious'

const fetchData = ({ requestString }) =>
  fetch(requestString)
    .then(payload => payload.json())
    .then(response => {
      const items = {}
      const { count, results } = response

      map(results, result => {
        items[result.id] = result
      })

      return { items, count }
    })

const useTableData = ({ sortDataKey, sortDirection, filters, endpoint }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isInitFetchDone, setIsInitFetchDone] = useState(false)
  const [data, setData] = useState({})
  const [count, setCount] = useState(0)
  const previousSortKey = usePrevious(sortDataKey)
  const previousSortDirection = usePrevious(sortDirection)
  const previousFilters = usePrevious(filters)
  const initialLimit = 20
  const initialOffset = 0
  const queryString = ApiUtils.formatQueryString({
    limit: initialLimit,
    offset: initialOffset,
    sortDataKey,
    sortDirection,
    filters,
  })
  const requestString = `${endpoint}?${queryString}`

  useEffect(() => {
    if (isLoading || isInitFetchDone) {
      return
    }

    setIsLoading(true)

    fetchData({ requestString })
      .then(({ items, count }) => {
        setData({ ...data, ...items })
        setCount(count)
      })
      .finally(() => {
        setIsInitFetchDone(true)
        setIsLoading(false)
      })
  }, [isLoading, isInitFetchDone, data, requestString])

  useEffect(() => {
    if (
      (sortDataKey !== previousSortKey && previousSortKey) ||
      (sortDirection !== previousSortDirection && previousSortDirection)
    ) {
      fetchData({ requestString }).then(({ items, count }) => {
        setData({ ...data, ...items })
        setCount(count)
      })
    }

    if (!isEqual(filters, previousFilters) && !isEmpty(previousFilters)) {
      fetchData({ requestString }).then(({ items, count }) => {
        setData({ ...data, ...items })
        setCount(count)
      })
    }
  }, [requestString, data, sortDataKey, sortDirection, filters, setData])

  return {
    data,
    count,
    hasNoData: isInitFetchDone && isEmpty(data),
    isInitFetchDone,
  }
}

export default useTableData
