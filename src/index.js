import React from 'react'
import ReactDOM from 'react-dom'

import { getUsersList } from './api/mockUserApi'
import { TableVirtualized } from './components/table'

import './index.scss'

const App = () => {
  const columns = [
    {
      label: 'Id',
      width: 100,
      cellRenderer: ({ rowData }) => rowData.id,
    },
    {
      label: 'First Name',
      width: 180,
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
      cellRenderer: ({ rowData }) => rowData.jobType,
    },
    {
      label: 'Job Title',
      width: 150,
      cellRenderer: ({ rowData }) => rowData.jobTitle,
    },
    {
      label: 'Job Description',
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
