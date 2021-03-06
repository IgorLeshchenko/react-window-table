/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { find, isEmpty } from 'lodash'

import ColumnsConfig from './columns'
import useTableData from './components/table/hooks/useTableData'
import { ScrollWrapper, TableVirtualized } from './components/table'

// Cell Renderers:
import SimpleLinkCellRenderer from './components/table/cellRenderers/common/SimpleLinkCellRenderer'
import SimpleDateCellRenderer from './components/table/cellRenderers/common/SimpleDateCellRenderer'
import SimpleTextCellRenderer from './components/table/cellRenderers/common/SimpleTextCellRenderer'
import SinglePlaneCellRenderer from './components/table/cellRenderers/plane/SinglePlaneCellRenderer'
import SimpleCurrencyCellRenderer from './components/table/cellRenderers/currency/SimpleCurrencyCellRenderer'

import 'react-virtualized/styles.css'
import './index.scss'

const animatedComponents = makeAnimated()

const App = () => {
  const [columns, setColumns] = useState(ColumnsConfig)
  const [sortParams, setSortParams] = useState({ dataKey: null, sortDirection: null })
  const [filters, setFilters] = useState({
    tailNumbers: [],
  })
  const possibleTailNumbers = ['N123AP', 'N412PS', 'N417HC', 'N44NJ', 'N849WC']

  // Table config
  const [columnsConfig, setColumnsConfig] = useState({
    hidden: [],
    stickToLeft: [],
    stickToRight: [],
    disableSort: [],
    disableResize: [],
  })

  const { isLoading, data, count, handleLoadMoreData, handleSort, handleApplyFilter } = useTableData({
    endpoint: '/api/transactions',
    filters: {
      tailNumbers: filters.tailNumbers.map(filter => filter.value),
    },
    sortDirection: sortParams.sortDirection,
    sortDataKey: sortParams.dataKey,
  })

  const handleSortColumns = newColumnsList => {
    setColumns(() => newColumnsList)
  }
  const handleColumnsResize = newColumnsList => {
    setColumns(() => newColumnsList)
  }
  const handleSortList = ({ dataKey, sortDirection }) => {
    setSortParams(prevState => ({ ...prevState, dataKey, sortDirection }))

    return handleSort({ sortDataKey: dataKey, sortDirection })
  }

  useEffect(() => {
    const updatedColumns = columns.map(column => ({
      ...column,
      isStickToLeft: !isEmpty(find(columnsConfig.stickToLeft, { value: column.dataKey })),
      isStickToRight: !isEmpty(find(columnsConfig.stickToRight, { value: column.dataKey })),
      isResizeDisabled: !isEmpty(find(columnsConfig.disableResize, { value: column.dataKey })),
      isSortDisabled: !isEmpty(find(columnsConfig.disableSort, { value: column.dataKey })),
      isHidden: !isEmpty(find(columnsConfig.hidden, { value: column.dataKey })),
    }))

    setColumns(() => updatedColumns)
  }, [columnsConfig])

  return (
    <div className="app">
      <div className="header">
        <div className="headerTitle">Tables POC</div>
      </div>
      <div className="content">
        <div className="sidebar">
          <div className="sidebar-item">
            <div className="selectTitle">Hidden Columns</div>
            <Select
              className="select"
              components={animatedComponents}
              isMulti
              options={columns.map(column => ({ value: column.dataKey, label: column.label }))}
              value={columnsConfig.hidden}
              onChange={value => {
                setColumnsConfig(prevState => ({ ...prevState, hidden: value }))
              }}
            />
          </div>
          <div className="sidebar-item">
            <div className="selectTitle">Stick To Left Columns</div>
            <Select
              className="select"
              components={animatedComponents}
              isMulti
              options={columns
                .filter(({ isStickToRight }) => !isStickToRight)
                .map(column => ({ value: column.dataKey, label: column.label }))}
              value={columnsConfig.stickToLeft}
              onChange={value => {
                setColumnsConfig(prevState => ({ ...prevState, stickToLeft: value }))
              }}
            />
          </div>
          <div className="sidebar-item">
            <div className="selectTitle">Stick To Right Columns</div>
            <Select
              className="select"
              components={animatedComponents}
              isMulti
              options={columns
                .filter(({ isStickToLeft }) => !isStickToLeft)
                .map(column => ({ value: column.dataKey, label: column.label }))}
              value={columnsConfig.stickToRight}
              onChange={value => {
                setColumnsConfig(prevState => ({ ...prevState, stickToRight: value }))
              }}
            />
          </div>
          <div className="sidebar-item">
            <div className="selectTitle">Disable Resize Columns</div>
            <Select
              className="select"
              components={animatedComponents}
              isMulti
              options={columns.map(column => ({ value: column.dataKey, label: column.label }))}
              value={columnsConfig.disableResize}
              onChange={value => {
                setColumnsConfig(prevState => ({ ...prevState, disableResize: value }))
              }}
            />
          </div>
          <div className="sidebar-item">
            <div className="selectTitle">Disable Sorting Columns</div>
            <Select
              className="select"
              components={animatedComponents}
              isMulti
              options={columns.map(column => ({ value: column.dataKey, label: column.label }))}
              value={columnsConfig.disableSort}
              onChange={value => {
                setColumnsConfig(prevState => ({ ...prevState, disableSort: value }))
              }}
            />
          </div>
          <div className="sidebar-item topOffset">
            <div className="selectTitle">Filter By Tail Number</div>
            <Select
              className="select"
              components={animatedComponents}
              isMulti
              options={possibleTailNumbers.map(value => ({ value, label: value }))}
              value={filters.tailNumbers}
              onChange={value => {
                setFilters(prevState => ({ ...prevState, tailNumbers: value || [] }))

                return handleApplyFilter({ filters: { tailNumbers: value.map(item => item.value) } })
              }}
            />
          </div>
        </div>
        <div className="content-body">
          <ScrollWrapper>
            {({ height, scrollElement }) => (
              <Fragment>
                <div className="demo-body">
                  <TableVirtualized
                    isLoading={isLoading}
                    data={data}
                    count={count}
                    cellSettings={columns}
                    cellRenderers={{
                      id: ({ rowData }) => <SimpleLinkCellRenderer text={rowData.id} />,
                      date: ({ rowData }) => <SimpleDateCellRenderer date={rowData.date} />,
                      tripNumber: ({ rowData }) => <SimpleTextCellRenderer text={rowData.tripNumber} />,
                      category: ({ rowData }) => <SimpleTextCellRenderer text={rowData.category.name} />,
                      subCategory: ({ rowData }) => <SimpleTextCellRenderer text={rowData.subCategory.name} />,
                      plane: ({ rowData }) => <SinglePlaneCellRenderer plane={rowData.plane} />,
                      cost: ({ rowData }) => <SimpleCurrencyCellRenderer data={rowData.cost} />,
                      costOriginal: ({ rowData }) => <SimpleCurrencyCellRenderer data={rowData.costOriginal} />,
                      total: ({ rowData }) => <SimpleCurrencyCellRenderer data={rowData.total} />,
                      totalOriginal: ({ rowData }) => <SimpleCurrencyCellRenderer data={rowData.totalOriginal} />,
                      exchangeRate: ({ rowData }) => <SimpleTextCellRenderer text={rowData.exchangeRate} />,
                    }}
                    sortDataKey={sortParams.dataKey}
                    sortDirection={sortParams.sortDirection}
                    scrollElement={scrollElement}
                    contentHeight={height}
                    onLoadMore={handleLoadMoreData}
                    onListSort={handleSortList}
                    onColumnsReorder={handleSortColumns}
                    onColumnsResize={handleColumnsResize}
                  />
                </div>
              </Fragment>
            )}
          </ScrollWrapper>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
