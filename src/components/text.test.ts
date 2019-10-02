import text from './text'

test('builds a text object with the given data', () => {
  expect(text('hi')).toEqual({ text: 'hi' })
})

test('builds a text object with options', () => {
  expect(text('hi', { bold: true })).toEqual({ text: 'hi', bold: true })
})

test('can build a compound text object', () => {
  expect(text([text('Hello', { bold: true }), text(' world')])).toEqual({
    text: [{ text: 'Hello', bold: true }, { text: ' world' }],
  })
})
