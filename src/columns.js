const ColumnsConfig = [
  {
    isStickToLeft: true,
    isResizeDisabled: true,
    label: 'Id',
    dataKey: 'id',
    width: null,
    defaultWidth: 50,
    cellRenderer: ({ rowData }) => rowData.id,
  },
  {
    label: 'First Name',
    dataKey: 'firstName',
    width: null,
    defaultWidth: 150,
    cellRenderer: ({ rowData }) => rowData.firstName,
  },
  {
    label: 'Last Name',
    dataKey: 'lastName',
    width: null,
    defaultWidth: 150,
    cellRenderer: ({ rowData }) => rowData.lastName,
  },
  {
    label: 'Job Type',
    dataKey: 'jobType',
    width: null,
    defaultWidth: 100,
    cellRenderer: ({ rowData }) => rowData.jobType,
  },
  {
    label: 'Job Title',
    dataKey: 'jobTitle',
    width: null,
    defaultWidth: 150,
    cellRenderer: ({ rowData }) => rowData.jobTitle,
  },
  {
    isStickToRight: true,
    label: 'Job Description',
    dataKey: 'jobDescriptor',
    width: null,
    defaultWidth: 300,
    cellRenderer: ({ rowData }) => rowData.jobDescriptor,
  },
]

export default ColumnsConfig
