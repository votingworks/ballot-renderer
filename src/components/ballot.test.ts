import header from './header'
import results from './contests/results'
import mockOf from '../../test/utils/mockOf'
import ballot from './ballot'
import completedBallot from '../../test/fixtures/completedBallot'

jest.mock('./header')
jest.mock('./contests/results')

const headerMock = mockOf(header)
const resultsMock = mockOf(results)

test('builds a stack of header and contest results components', () => {
  headerMock.mockReturnValue({ header: true })
  resultsMock.mockReturnValue({ results: true })

  expect(ballot(completedBallot)).toEqual({
    stack: [{ header: true }, { results: true }],
  })
})
