import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList as List } from 'react-window'
import { isEmpty, debounce } from 'lodash'

import * as TableUtils from '../utils/TableUtils'
import * as TableConstants from '../utils/constants'
import { TableContext } from '../context/tableContext'
import { useResetCache } from '../hooks/useResetCache'
import { TableHeader } from '../common/header/TableHeader'
import { RowVirtualized } from './RowVirtualized'

export const TableVirtualized = props => {
  const { showHeader, handleLoadListPage, columns } = props
  const [isLoading, setIsLoading] = useState(false)
  const [dataByPage, setDataByPage] = useState({})
  const [requestParams, setRequestParams] = useState({
    page: 1,
    size: 20,
    count: 0,
  })
  const ref = useResetCache(dataByPage)
  const sizeMap = React.useRef({})
  const getRowSize = React.useCallback(
    index => sizeMap.current[index] || TableConstants.MIN_ROW_HEIGHT_WITH_PADDING,
    [],
  )
  const setRowSize = React.useCallback(
    (index, size) => {
      sizeMap.current = { ...sizeMap.current, [index]: size }
      ref.current.resetAfterIndex(0)
    },
    [ref],
  )
  // TODO :: list optimization
  const onItemsRendered = params => {
    const { visibleStartIndex, visibleStopIndex } = params
    const pagesToLoad = TableUtils.getRequestPagesToLoad({
      visibleStartIndex,
      visibleStopIndex,
      size: requestParams.size,
      dataByPage,
    })

    pagesToLoad.forEach(page => {
      handleLoadListPage({ page, size: requestParams.size }).then(payload => {
        setDataByPage({
          ...dataByPage,
          [page]: payload.results,
        })
        setRequestParams(payload)
      })
    })
  }
  const onItemsRenderedDebounced = debounce(onItemsRendered, 150)

  useEffect(() => {
    if (!isEmpty(dataByPage) || isLoading) {
      return
    }

    setIsLoading(true)

    handleLoadListPage({ page: requestParams.page, size: requestParams.size }).then(payload => {
      setRequestParams(payload)
      setDataByPage(TableUtils.generateListFromPayload(payload))

      setIsLoading(false)
    })
  }, [isLoading, dataByPage, requestParams, handleLoadListPage])

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <AutoSizer>
      {({ height, width }) => {
        const tableHeight = showHeader ? height - TableConstants.HEADER_HEIGHT : height

        return (
          <TableContext.Provider value={{ setRowSize, wrapperWidth: width, wrapperHeight: tableHeight }}>
            <TableHeader columns={columns} width={width} />

            <List
              ref={ref}
              width={width}
              height={tableHeight}
              onItemsRendered={onItemsRenderedDebounced}
              overscanRowCount={requestParams.size}
              itemCount={requestParams.count}
              itemSize={getRowSize}
              onScroll={params => console.log(params)}
              layout="vertical">
              {({ index, style }) => (
                <RowVirtualized
                  key={index}
                  index={index}
                  style={style}
                  columns={columns}
                  rowData={TableUtils.getRowDataByIndex({ dataByPage, size: requestParams.size, index })}
                />
              )}
            </List>
          </TableContext.Provider>
        )
      }}
    </AutoSizer>
  )
}

TableVirtualized.propTypes = {
  showHeader: PropTypes.bool,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      width: PropTypes.number,
      cellRenderer: PropTypes.func.isRequired,
    }),
  ).isRequired,
  handleLoadListPage: PropTypes.func.isRequired,
}

TableVirtualized.defaultProps = {
  showHeader: true,
}
