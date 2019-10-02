import * as s from '../definitions'
import styles from './default'

test('has a style for every defined value', () => {
  expect(new Set(Object.keys(styles))).toEqual(new Set(Object.values(s)))
})
