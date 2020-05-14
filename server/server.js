const express = require('express')
const faker = require('faker')
const app = express()

const transactionsAmount = 100
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

app.get('/api/transactions', function (req, res) {
  const { limit, offset } = req.query

  if (!limit || !offset) {
    return res.json({})
  }

  res.json({
    count: transactionsList.length,
    results: transactionsList.slice(parseInt(offset, 10), parseInt(offset, 10) + parseInt(limit, 10)),
  })
})

generateTransactionsList()
app.listen(3001, () => {
  console.log('started')
})
