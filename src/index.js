import React from 'react'
import ReactDOM from 'react-dom'

import { getUsersList } from './api/mockUserApi'
import TableVirtualized from './components/table/virtualized/table/TableVirtualized'

import 'react-virtualized/styles.css' // only needs to be imported once
import './index.scss'
import './components/table/Table.scss'

const App = () => {
  const columns = [
    {
      label: 'Id',
      width: 50,
      flexGrow: 0,
      cellRenderer: ({ rowData }) => rowData.id,
    },
    {
      label: 'First Name',
      width: 180,
      flexGrow: 0,
      cellRenderer: ({ rowData }) => rowData.firstName,
    },
    {
      label: 'Last Name',
      width: 180,
      flexGrow: 0,
      cellRenderer: ({ rowData }) => rowData.lastName,
    },
    {
      label: 'Job Type',
      width: 120,
      flexGrow: 0,
      cellRenderer: ({ rowData }) => rowData.jobType,
    },
    {
      label: 'Job Title',
      width: 150,
      flexGrow: 0,
      cellRenderer: ({ rowData }) => rowData.jobTitle,
    },
    {
      label: 'Job Description',
      flexGrow: 1,
      cellRenderer: ({ rowData }) => rowData.jobDescriptor,
    },
  ]

  return (
    <div className="app">
      <TableVirtualized columns={columns} handleLoadListPage={getUsersList} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
