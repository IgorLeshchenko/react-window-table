const express = require('express')
const faker = require('faker')
const app = express()
const _ = require('lodash')

const transactionsAmount = 300
const transactionsList = []

const possibleCategories = [
  'Late Fee',
  'Legal Services',
  'Maintenance',
  'Maintenance Programs',
  'Management Company Fees',
  'Meals & Entertainment Corp',
  'Miscellaneous Expenses',
  'Overflight',
  'Pilot Salaries',
  'Pilot Salaries & Benefits',
  'Pilot School',
  'Private Jet - Fuel',
  'Professional & Legal Fees',
  'Repairs & Maintenance',
  'Service Fee',
]

const possibleSubCategories = [
  'Insurance',
  'Interest',
  'Late Fee',
  'Legal Services',
  'Maintenance',
  'Maintenance Programs',
  'Management Company Fees',
  'Meals & Entertainment Corp',
  'Miscellaneous Expenses',
  'Overflight',
  'Pilot Salaries',
  'Pilot Salaries & Benefits',
  'Pilot School',
  'Private Jet - Fuel',
  'Professional & Legal Fees',
  'Repairs & Maintenance',
  'Service Fee',
]

const possibleTailNumbers = ['N123AP', 'N412PS', 'N417HC', 'N44NJ', 'N849WC']

const possibleCurrencies = ['USD', 'UAH', 'CAD', 'GBP']

const generateTransactionsList = () => {
  for (let i = 0; i < transactionsAmount; i++) {
    transactionsList.push({
      id: i,
      date: faker.date.past(),
      category: {
        name: faker.random.arrayElement(possibleCategories),
      },
      subCategory: {
        name: faker.random.arrayElement(possibleSubCategories),
      },
      plane: {
        name: faker.random.arrayElement(possibleTailNumbers),
      },
      tripNumber: faker.random.number(2000),
      cost: {
        currency: faker.random.arrayElement(possibleCurrencies),
        value: faker.finance.amount(),
      },
      costOriginal: {
        currency: faker.random.arrayElement(possibleCurrencies),
        value: faker.finance.amount(),
      },
      total: {
        currency: faker.random.arrayElement(possibleCurrencies),
        value: faker.finance.amount(),
      },
      totalOriginal: {
        currency: faker.random.arrayElement(possibleCurrencies),
        value: faker.finance.amount(),
      },
      exchangeRate: faker.finance.amount(1, 5, 2),
    })
  }
}

const getFilteredList = ({ tailNumbers }) => {
  if (!tailNumbers) {
    return transactionsList
  }

  const numbersList = tailNumbers.split(',')

  return transactionsList.filter(item => numbersList.indexOf(item.plane.name) !== -1)
}

const getOrderedList = (list, ordering = '') => {
  if (!ordering) {
    return list
  }

  const orderingParts = ordering.split('-')
  const isAsc = orderingParts.length === 2
  const orderBy = isAsc ? orderingParts[1] : orderingParts[0]
  let sortedList = []

  switch (orderBy) {
    case 'id':
      sortedList = _.sortBy(list, transaction => transaction.id)
      break
    case 'date':
      sortedList = _.sortBy(list, transaction => transaction.date)
      break
    case 'category':
      sortedList = _.sortBy(list, transaction => transaction.category.name)
      break
    case 'subCategory':
      sortedList = _.sortBy(list, transaction => transaction.subCategory.name)
      break
    case 'plane':
      sortedList = _.sortBy(list, transaction => transaction.plane.name)
      break
    case 'tripNumber':
      sortedList = _.sortBy(list, transaction => transaction.tripNumber)
      break
    case 'cost':
      sortedList = _.sortBy(list, transaction => transaction.cost.value)
      break
    case 'costOriginal':
      sortedList = _.sortBy(list, transaction => transaction.costOriginal.value)
      break
    case 'total':
      sortedList = _.sortBy(list, transaction => transaction.total.value)
      break
    case 'totalOriginal':
      sortedList = _.sortBy(list, transaction => transaction.totalOriginal.value)
      break
    case 'exchangeRate':
      sortedList = _.sortBy(list, transaction => transaction.exchangeRate)
      break
    default:
      return list
  }

  return isAsc ? sortedList : sortedList.reverse()
}

app.get('/api/transactions', function (req, res) {
  const { limit = 0, offset = 25, ordering, tailNumbers } = req.query
  const filteredList = getFilteredList({ tailNumbers })
  const orderedList = getOrderedList(filteredList, ordering)

  res.json({
    count: orderedList.length,
    results: orderedList.slice(parseInt(offset, 10), parseInt(offset, 10) + parseInt(limit, 10)),
  })
})

generateTransactionsList()
app.listen(3001, () => {
  console.log('started')
})
