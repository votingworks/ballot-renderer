import stack from './stack'

test('builds a stack object', () => {
  expect(stack()).toEqual({ stack: [] })
})

test('builds a stack object with elements', () => {
  expect(stack({ text: 'hi' })).toEqual({ stack: [{ text: 'hi' }] })
})

test('builds a stack object with multiple elements', () => {
  expect(stack({ text: 'hi' }, { text: 'world' })).toEqual({
    stack: [{ text: 'hi' }, { text: 'world' }],
  })
})

test('builds a stack with an array and style', () => {
  expect(stack([], { bold: true })).toEqual({
    stack: [],
    bold: true,
  })
})
