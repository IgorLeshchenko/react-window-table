import faker from 'faker'
import { times } from 'lodash'

const TOTAL_ELEMENTS = 1000
const RESPONSE_LATENCY = 300

export const getUsersList = params => {
  const { page, size } = params
  const currentItemsCount = page * size

  return new Promise(resolve => {
    const response = {
      page,
      size,
      results: [],
      count: TOTAL_ELEMENTS,
    }

    setTimeout(() => {
      console.log(`/api/users?page=${page}&size=${size}`)

      if (currentItemsCount <= TOTAL_ELEMENTS) {
        times(size, index => {
          const indexForPrevPages = page === 1 ? 0 : (page - 1) * size

          response.results.push({
            id: indexForPrevPages + index + 1,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            jobType: faker.name.jobType(),
            jobTitle: faker.name.jobTitle(),
            jobDescriptor: faker.lorem.paragraph(),
          })
        })
      }

      console.log(`/api/users?page=${page}&size=${size}`, { response })

      return resolve(response)
    }, RESPONSE_LATENCY)
  })
}
