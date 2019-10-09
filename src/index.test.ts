import { ballotToDocument, ballotToPdfRenderer, ballotToPdf } from '.'
import completedBallot from '../test/fixtures/completedBallot'

test('can render to a buffer', async () => {
  expect(await ballotToPdf(completedBallot)).toBeInstanceOf(Uint8Array)
})

test('can render to PDF document', () => {
  expect(ballotToDocument(completedBallot)).toMatchObject({
    content: expect.any(Array),
  })
})

test('can render to PDF renderer', () => {
  expect(ballotToPdfRenderer(completedBallot)).not.toBeInstanceOf(Uint8Array)
})
