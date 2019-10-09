import ballotToPdf from './ballotToPdf'
import completedBallot from '../test/fixtures/completedBallot'
import ballotToDocument from './ballotToDocument'
import mockOf from '../test/utils/mockOf'

jest.mock('./ballotToDocument')

const ballotToDocumentMock = mockOf(ballotToDocument)

test('creates a PDF buffer based on a completed ballot using ballotToDocument', async () => {
  ballotToDocumentMock.mockReturnValueOnce({
    content: [{ text: 'Official Ballot?' }],
    defaultStyle: {
      font: 'HelveticaNeue',
    },
  })

  // Returns a different-every-time `Buffer`, which we can't meaningfully check.
  await ballotToPdf(completedBallot)
})
