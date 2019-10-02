import { renderAsPdfContent, renderAsPdf, renderAsBuffer } from '.'
import completedBallot from '../test/fixtures/completedBallot'

test('can render to a buffer', async () => {
  expect(await renderAsBuffer(completedBallot)).toBeInstanceOf(Uint8Array)
})

test('can render to PDF content', () => {
  expect(renderAsPdfContent(completedBallot)).toMatchObject({
    content: expect.any(Array),
  })
})

test('can render to makePdf object', () => {
  expect(renderAsPdf(completedBallot)).not.toBeInstanceOf(Uint8Array)
})
