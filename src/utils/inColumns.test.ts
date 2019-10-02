import inColumns from './inColumns'

test('returns an empty array for zero columns', () => {
  expect(inColumns(0, [])).toEqual([])
})

test('returns all elements in a single array for one column', () => {
  expect(inColumns(1, ['a', 'b', 'c'])).toEqual([['a', 'b', 'c']])
})

test('splits elements evenly into multiple columns', () => {
  expect(inColumns(2, ['a', 'b', 'c', 'd'])).toEqual([['a', 'b'], ['c', 'd']])
  expect(inColumns(3, ['a', 'b', 'c'])).toEqual([['a'], ['b'], ['c']])
})

test('splits elements unevenly favoring earlier columns if needed', () => {
  expect(inColumns(2, ['a', 'b', 'c'])).toEqual([['a', 'b'], ['c']])
})
