import noSelection from './noSelection'

test('builds a text indicating no contest selection', () => {
  expect(noSelection()).toMatchObject({ text: '[no selection]' })
})
