import { useEffect, useState } from 'react'

import * as ApiUtils from '../utils/apiUtils'
import { debounce } from 'lodash'

const useTableData = ({ sortDataKey = null, sortDirection = null, filters = {}, endpoint }) => {
  const [isInitFetchDone, setIsInitFetchDone] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({})
  const [count, setCount] = useState(0)
  const noDataAvailable = isInitFetchDone && !count

  const handleLoadMoreData = ({ startIndex, stopIndex }) => {
    ApiUtils.fetchData({
      startIndex,
      stopIndex: stopIndex + 1,
      endpoint,
      sortDataKey,
      sortDirection,
      filters,
    }).then(({ items, count }) => {
      const itemsByPage = ApiUtils.transformItemsToPages({
        items,
        startIndex,
      })

      setData({ ...data, ...itemsByPage })
      setCount(count)
    })
  }
  const handleLoadMoreDataDebounced = debounce(handleLoadMoreData, 150)

  const handleSort = ({ sortDataKey, sortDirection }) => {
    setData({})
    setIsLoading(true)

    return ApiUtils.fetchData({
      startIndex: 0,
      stopIndex: 25,
      endpoint,
      sortDataKey,
      sortDirection,
      filters,
    })
      .then(({ items, count }) => {
        const itemsByPage = ApiUtils.transformItemsToPages({
          items,
          startIndex: 0,
        })

        setData(itemsByPage)
        setCount(count)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleApplyFilter = ({ filters }) => {
    setData({})
    setIsLoading(true)

    return ApiUtils.fetchData({
      startIndex: 0,
      stopIndex: 25,
      endpoint,
      sortDataKey,
      sortDirection,
      filters,
    })
      .then(({ items, count }) => {
        const itemsByPage = ApiUtils.transformItemsToPages({
          items,
          startIndex: 0,
        })

        setData(itemsByPage)
        setCount(count)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (isLoading || isInitFetchDone) {
      return
    }

    setIsLoading(true)

    ApiUtils.fetchData({
      startIndex: 0,
      stopIndex: 25,
      endpoint,
      sortDataKey,
      sortDirection,
      filters,
    })
      .then(({ items, count }) => {
        const itemsByPage = ApiUtils.transformItemsToPages({
          items,
          startIndex: 0,
        })

        setData(itemsByPage)
        setCount(count)
      })
      .finally(() => {
        setIsInitFetchDone(true)
        setIsLoading(false)
      })
  }, [isInitFetchDone, isLoading, endpoint, sortDataKey, sortDirection, filters])

  return {
    isLoading,
    data,
    count,
    handleSort,
    handleApplyFilter,
    handleLoadMoreData: handleLoadMoreDataDebounced,
    noDataAvailable,
  }
}

export default useTableData
