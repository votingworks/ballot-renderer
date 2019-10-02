import table from './table'

test('builds a table from table data', () => {
  expect(table({ body: [] })).toEqual({ table: { body: [] } })
})
