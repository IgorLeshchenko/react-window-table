import { useState, useEffect, useCallback, useRef } from 'react'

import * as ApiUtils from '../utils/apiUtils'
import * as TableConstants from '../utils/constants'

const useTableData = ({ sortDataKey = null, sortDirection = null, filters = {}, endpoint }) => {
  const [isInitFetchDone, setIsInitFetchDone] = useState(false)
  const [data, setData] = useState({})
  const [count, setCount] = useState(0)
  const isLoading = useRef(false)
  const noDataAvailable = isInitFetchDone && !count

  const onRowsRendered = useCallback(
    params => {
      const { overscanStartIndex, overscanStopIndex } = params
      const { startPage, stopPage } = ApiUtils.getPagesToLoadByIndex({
        overscanStartIndex,
        overscanStopIndex,
        size: TableConstants.INITIAL_SIZE,
      })
      const isDataLoadedForStartPage = ApiUtils.isDataLoadedForPage({ page: startPage, data })
      const isDataLoadedForStopPage = ApiUtils.isDataLoadedForPage({ page: stopPage, data })
      const requestParams = {
        size: TableConstants.INITIAL_SIZE,
        endpoint,
        sortDataKey,
        sortDirection,
        filters,
      }

      if (isDataLoadedForStartPage && isDataLoadedForStopPage) {
        return null
      }

      if (!isDataLoadedForStartPage) {
        requestParams.page = startPage

        if (!isDataLoadedForStopPage) {
          requestParams.size = (stopPage - startPage) * TableConstants.INITIAL_SIZE || TableConstants.INITIAL_SIZE
        }
      }

      if (!isDataLoadedForStopPage) {
        requestParams.page = stopPage
      }

      console.log({ startPage, stopPage, data, isDataLoadedForStartPage, isDataLoadedForStopPage })

      ApiUtils.fetchData(requestParams).then(({ items, count }) => {
        const itemsByPage = ApiUtils.transformItemsToPages({
          items,
          page: requestParams.page,
          size: TableConstants.INITIAL_SIZE,
        })
        const newData = {
          ...data,
          ...itemsByPage,
        }

        console.log({ itemsByPage })

        setData(newData)
        setCount(count)
      })
    },
    [endpoint, sortDataKey, sortDirection, filters, data],
  )

  useEffect(() => {
    if (isLoading.current || isInitFetchDone) {
      return
    }

    isLoading.current = true

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
        isLoading.current = false
      })
  }, [isInitFetchDone, endpoint, sortDataKey, sortDirection, filters])

  return {
    data,
    count,
    onRowsRendered,
    noDataAvailable,
    isInitFetchDone,
  }
}

export default useTableData
