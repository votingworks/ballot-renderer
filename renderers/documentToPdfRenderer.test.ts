import documentToPdfRenderer from './documentToPdfRenderer'

test('creates a PDF renderer from PDF make', () => {
  expect(documentToPdfRenderer({ content: [] })).toBeTruthy()
})
