import noSelection from './noSelection'
import * as s from '../../styles/definitions'

test('builds a text indicating no contest selection', () => {
  expect(noSelection()).toMatchObject(
    expect.objectContaining({ text: '[no selection]' })
  )
})

test('builds a text with "no-selection" styling', () => {
  expect(noSelection()).toMatchObject(
    expect.objectContaining({ style: s.contestResultNoSelection })
  )
})
