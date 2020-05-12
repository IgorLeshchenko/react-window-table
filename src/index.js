import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import { getUsersList } from './api/mockUserApi'
import TableVirtualized from './components/table/virtualized/table/TableVirtualized'

import 'react-virtualized/styles.css' // only needs to be imported once
import './index.scss'
import './components/table/Table.scss'

const App = () => {
  const [columns, setColumns] = useState([
    {
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
      <TableVirtualized
        columns={columns}
        handleLoadListPage={getUsersList}
        onColumnsReorder={handleSortColumns}
        onColumnsResize={handleColumnsResize}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
