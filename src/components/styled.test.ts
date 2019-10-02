import styled from './styled'
import text from './text'

test('wraps content in a styled one-element stack', () => {
  expect(
    styled(text('hi', { style: 'inner-style' }), { style: 'outer-style' })
  ).toEqual({
    stack: [
      {
        text: 'hi',
        style: 'inner-style',
      },
    ],
    style: 'outer-style',
  })
})
