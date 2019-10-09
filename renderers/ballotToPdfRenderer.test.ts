import DefaultStyleSheet from '../src/styles/themes/default'
import completedBallot from '../test/fixtures/completedBallot'
import mockOf from '../test/utils/mockOf'
import ballotToDocument from './ballotToDocument'
import ballotToPdfRenderer from './ballotToPdfRenderer'

jest.mock('./ballotToDocument')

const ballotToDocumentMock = mockOf(ballotToDocument)

test('creates a PDF renderer from a completed ballot by converting to a document first', () => {
  ballotToDocumentMock.mockReturnValueOnce({ content: [] })

  ballotToPdfRenderer(completedBallot, DefaultStyleSheet)

  expect(ballotToDocumentMock).toHaveBeenCalledWith(
    completedBallot,
    DefaultStyleSheet
  )
})
