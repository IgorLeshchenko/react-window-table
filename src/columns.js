import React from 'react'

import SimpleTextCellRenderer from './components/table/cellRenderers/common/SimpleTextCellRenderer'
import SimpleDateCellRenderer from './components/table/cellRenderers/common/SimpleDateCellRenderer'
import SinglePlaneCellRenderer from './components/table/cellRenderers/plane/SinglePlaneCellRenderer'
import SimpleCurrencyCellRenderer from './components/table/cellRenderers/currency/SimpleCurrencyCellRenderer'

const ColumnsConfig = [
  {
    isStickToLeft: true,
    isResizeDisabled: true,
    label: 'Id',
    dataKey: 'id',
    width: null,
    defaultWidth: 40,
    cellRenderer: ({ rowData }) => <SimpleTextCellRenderer text={rowData.id} />,
  },
  {
    label: 'Date',
    dataKey: 'date',
    width: null,
    defaultWidth: 100,
    cellRenderer: ({ rowData }) => <SimpleDateCellRenderer date={rowData.date} />,
  },
  {
    label: 'Trip №',
    dataKey: 'tripNumber',
    width: null,
    defaultWidth: 75,
    cellRenderer: ({ rowData }) => <SimpleTextCellRenderer text={rowData.tripNumber} />,
  },
  {
    label: 'Category',
    dataKey: 'category',
    width: null,
    defaultWidth: 200,
    cellRenderer: ({ rowData }) => <SimpleTextCellRenderer text={rowData.category.name} />,
  },
  {
    label: 'Sub Category',
    dataKey: 'subCategory',
    width: null,
    defaultWidth: 200,
    cellRenderer: ({ rowData }) => <SimpleTextCellRenderer text={rowData.subCategory.name} />,
  },
  {
    label: 'Aircraft',
    dataKey: 'plane',
    width: null,
    defaultWidth: 100,
    cellRenderer: ({ rowData }) => <SinglePlaneCellRenderer plane={rowData.plane} />,
  },
  {
    label: 'Cost',
    dataKey: 'cost',
    width: null,
    defaultWidth: 100,
    cellRenderer: ({ rowData }) => <SimpleCurrencyCellRenderer data={rowData.cost} />,
  },
  {
    label: 'Cost Original',
    dataKey: 'costOriginal',
    width: null,
    defaultWidth: 120,
    cellRenderer: ({ rowData }) => <SimpleCurrencyCellRenderer data={rowData.costOriginal} />,
  },
  {
    label: 'Total',
    dataKey: 'total',
    width: null,
    defaultWidth: 100,
    cellRenderer: ({ rowData }) => <SimpleCurrencyCellRenderer data={rowData.total} />,
  },
  {
    label: 'Total Original',
    dataKey: 'totalOriginal',
    width: null,
    defaultWidth: 150,
    cellRenderer: ({ rowData }) => <SimpleCurrencyCellRenderer data={rowData.totalOriginal} />,
  },
  {
    label: 'Ex. Rate',
    dataKey: 'exchangeRate',
    width: null,
    defaultWidth: 100,
    cellRenderer: ({ rowData }) => <SimpleTextCellRenderer text={rowData.exchangeRate} />,
  },
]

export default ColumnsConfig
