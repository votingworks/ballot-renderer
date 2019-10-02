import margin from './margin'

test('returns a number as-is', () => {
  expect(margin(1)).toEqual(1)
})

test('returns a 2-element tuple as-is', () => {
  expect(margin([1, 2])).toEqual([1, 2])
})

test('returns a 4-element tuple as-is', () => {
  expect(margin([1, 2, 3, 4])).toEqual([1, 2, 3, 4])
})

test('returns zero margins by default', () => {
  expect(margin()).toEqual([0, 0, 0, 0])
})

test('allows customizing a single margin', () => {
  expect(margin({ left: 1 })).toEqual([1, 0, 0, 0])
})

test('allows customizing multiple margins', () => {
  expect(margin({ left: 1, top: 4 })).toEqual([1, 4, 0, 0])
})
