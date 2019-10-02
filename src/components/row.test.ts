import row from './row'

test('returns spread elements as an array', () => {
  expect(row({ text: 'hi' }, { text: 'there' })).toEqual([
    { text: 'hi' },
    { text: 'there' },
  ])
})
