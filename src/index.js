import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import LoadingSkeleton from 'react-loading-skeleton'

import { getUsersList } from './api/mockUserApi'
import { TableVirtualized } from './components/table'

import 'react-virtualized/styles.css'
import './index.scss'

const App = () => {
  const [columns, setColumns] = useState([
    {
      isStickToLeft: true,
      label: 'Id',
      dataKey: 'id',
      width: null,
      defaultWidth: 50,
      minResizeWidth: 50,
      maxResizeWidth: 150,
      cellRenderer: ({ rowData }) => rowData.id,
    },
    {
      label: 'First Name',
      dataKey: 'firstName',
      width: null,
      defaultWidth: 150,
      minResizeWidth: 100,
      maxResizeWidth: 300,
      cellRenderer: ({ rowData }) => rowData.firstName,
    },
    {
      label: 'Last Name',
      dataKey: 'lastName',
      width: null,
      defaultWidth: 150,
      minResizeWidth: 100,
      maxResizeWidth: 300,
      cellRenderer: ({ rowData }) => rowData.lastName,
    },
    {
      label: 'Job Type',
      dataKey: 'jobType',
      width: null,
      defaultWidth: 100,
      minResizeWidth: 100,
      maxResizeWidth: 250,
      cellRenderer: ({ rowData }) => rowData.jobType,
    },
    {
      label: 'Job Title',
      dataKey: 'jobTitle',
      width: null,
      defaultWidth: 150,
      minResizeWidth: 100,
      maxResizeWidth: 300,
      cellRenderer: ({ rowData }) => rowData.jobTitle,
    },
    {
      isStickToRight: true,
      label: 'Job Description',
      dataKey: 'jobDescriptor',
      width: null,
      defaultWidth: 300,
      minResizeWidth: 150,
      maxResizeWidth: 500,
      cellRenderer: ({ rowData }) => rowData.jobDescriptor,
    },
  ])
  const handleSortColumns = newColumnsList => {
    setColumns(newColumnsList)
  }
  const handleColumnsResize = newColumnsList => {
    setColumns(newColumnsList)
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
          <TableVirtualized
            columns={columns}
            handleLoadListPage={getUsersList}
            onColumnsReorder={handleSortColumns}
            onColumnsResize={handleColumnsResize}
          />
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
