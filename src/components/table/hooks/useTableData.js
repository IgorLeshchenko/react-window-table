import { useEffect, useRef, useState } from 'react'

import * as ApiUtils from '../utils/apiUtils'

const useTableData = ({ sortDataKey = null, sortDirection = null, filters = {}, endpoint }) => {
  const [isInitFetchDone, setIsInitFetchDone] = useState(false)
  const [data, setData] = useState({})
  const [count, setCount] = useState(0)
  const isLoading = useRef(false)
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
    handleLoadMoreData,
    noDataAvailable,
    isInitFetchDone,
  }
}

export default useTableData
