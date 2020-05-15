import { useEffect, useRef, useState } from 'react'

import * as ApiUtils from '../utils/apiUtils'

const useTableData = ({ sortDataKey = null, sortDirection = null, filters = {}, endpoint }) => {
  const [isInitFetchDone, setIsInitFetchDone] = useState(false)
  const [data, setData] = useState({})
  const [count, setCount] = useState(0)
  const isLoading = useRef(false)
  const noDataAvailable = isInitFetchDone && !count
  const overscanStartIndex = useRef(0)
  const overscanStopIndex = useRef(25)

  const handleLoadMoreData = ({ startIndex, stopIndex }) => {
    overscanStartIndex.current = startIndex
    overscanStopIndex.current = stopIndex + 1

    ApiUtils.fetchData({
      startIndex: overscanStartIndex.current,
      stopIndex: overscanStopIndex.current,
      endpoint,
      sortDataKey,
      sortDirection,
      filters,
    }).then(({ items, count }) => {
      const itemsByPage = ApiUtils.transformItemsToPages({
        items,
        startIndex: overscanStartIndex.current,
      })

      setData({ ...data, ...itemsByPage })
      setCount(count)
    })
  }

  const handleSort = ({ sortDataKey, sortDirection }) => {
    const startIndex = overscanStartIndex.current < 25 ? 0 : overscanStartIndex.current - 25
    const stopIndex = overscanStopIndex.current + 25

    setData({})

    return ApiUtils.fetchData({
      startIndex,
      stopIndex,
      endpoint,
      sortDataKey,
      sortDirection,
      filters,
    }).then(({ items, count }) => {
      const itemsByPage = ApiUtils.transformItemsToPages({
        items,
        startIndex: overscanStartIndex.current,
      })

      setData(itemsByPage)
      setCount(count)

      return { startIndex, stopIndex }
    })
  }

  useEffect(() => {
    if (isLoading.current || isInitFetchDone) {
      return
    }

    isLoading.current = true

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
        isLoading.current = false
      })
  }, [isInitFetchDone, endpoint, sortDataKey, sortDirection, filters])

  return {
    data,
    count,
    handleSort,
    handleLoadMoreData,
    noDataAvailable,
    isInitFetchDone,
  }
}

export default useTableData
