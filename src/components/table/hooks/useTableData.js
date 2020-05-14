import { useState, useEffect } from 'react'

import * as ApiUtils from '../utils/apiUtils'
import * as TableConstants from '../utils/constants'

const useTableData = ({ sortDataKey = null, sortDirection = null, filters = {}, endpoint }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isInitFetchDone, setIsInitFetchDone] = useState(false)
  const [data, setData] = useState({})
  const [count, setCount] = useState(0)
  const noDataAvailable = isInitFetchDone && !count

  useEffect(() => {
    if (isLoading || isInitFetchDone) {
      return
    }

    setIsLoading(true)

    ApiUtils.fetchData({
      page: TableConstants.INITIAL_PAGE,
      size: TableConstants.INITIAL_SIZE,
      endpoint,
      sortDataKey,
      sortDirection,
      filters,
    })
      .then(({ items, count }) => {
        const initialData = ApiUtils.getInitialData({ count, size: TableConstants.INITIAL_SIZE })
        const itemsByPage = ApiUtils.transformItemsToPages({
          items,
          page: TableConstants.INITIAL_PAGE,
          size: TableConstants.INITIAL_SIZE,
        })
        const newData = {
          ...initialData,
          ...itemsByPage,
        }

        setData(newData)
        setCount(count)
      })
      .finally(() => {
        setIsInitFetchDone(true)
        setIsLoading(false)
      })
  }, [])

  return {
    data,
    count,
    noDataAvailable,
    isInitFetchDone,
  }
}

export default useTableData
