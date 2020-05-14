import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import LoadingSkeleton from 'react-loading-skeleton'

import ColumnsConfig from './columns'
import { getUsersList } from './api/mockUserApi'
import { TableVirtualized } from './components/table'

import 'react-virtualized/styles.css'
import './index.scss'

const App = () => {
  const [columns, setColumns] = useState(ColumnsConfig)
  const [sortParams, setSortParams] = useState({ dataKey: null, sortDirection: null })
  const handleSortColumns = newColumnsList => {
    setColumns(() => newColumnsList)
  }
  const handleColumnsResize = newColumnsList => {
    setColumns(() => newColumnsList)
  }
  const handleSortList = ({ dataKey, sortDirection }) => {
    setSortParams(prevState => ({ ...prevState, dataKey, sortDirection }))
  }

  return (
    <div className="app">
      <div className="header">
        <LoadingSkeleton width={300} />
      </div>
      <div className="content">
        <div className="sidebar">
          <div className="sidebar-item">
            <LoadingSkeleton width={220} />
          </div>
          <div className="sidebar-item">
            <LoadingSkeleton width={120} />
          </div>
          <div className="sidebar-item">
            <LoadingSkeleton width={250} />
          </div>
          <div className="sidebar-item">
            <LoadingSkeleton width={250} />
          </div>
          <div className="sidebar-item">
            <LoadingSkeleton width={230} />
          </div>
        </div>
        <div className="content-body">
          <div className="demo-container">
            <div className="title">Table Settings</div>
            <div className="row">
              <div className="col">1</div>
              <div className="col">2</div>
              <div className="col">3</div>
              <div className="col">4</div>
            </div>
          </div>

          <div className="demo-body">
            <TableVirtualized
              endpoint="/api/transactions"
              filters={{}}
              sortDataKey={sortParams.dataKey}
              sortDirection={sortParams.sortDirection}
              columns={columns}
              handleLoadListPage={getUsersList}
              onListSort={handleSortList}
              onColumnsReorder={handleSortColumns}
              onColumnsResize={handleColumnsResize}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
