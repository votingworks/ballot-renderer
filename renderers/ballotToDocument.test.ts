import makeBallot from '../src/components/ballot'
import completedBallot from '../test/fixtures/completedBallot'
import mockOf from '../test/utils/mockOf'
import ballotToDocument from './ballotToDocument'

jest.mock('../src/components/ballot')

const makeBallotMock = mockOf(makeBallot)

test('creates a pdfmake document from a completed ballot', () => {
  makeBallotMock.mockReturnValueOnce({ text: 'Official Ballot?' })
  expect(ballotToDocument(completedBallot)).toMatchObject({
    content: [{ text: 'Official Ballot?' }],
  })
})
