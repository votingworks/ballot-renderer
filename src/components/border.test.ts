import border from './border'

test('returns zero borders by default', () => {
  expect(border()).toEqual([false, false, false, false])
})

test('returns 4-element tuples as-is', () => {
  expect(border([true, false, true, false])).toEqual([true, false, true, false])
})

test('allows specifying a single border', () => {
  expect(border({ left: true })).toEqual([true, false, false, false])
})

test('allows specifying multiple borders', () => {
  expect(border({ left: true, right: true })).toEqual([
    true,
    false,
    true,
    false,
  ])
})
