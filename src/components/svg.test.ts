import svg from './svg'

test('builds an SVG object with given data', () => {
  expect(
    svg(`<svg height="100" width="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg> 
`)
  ).toEqual({
    svg: `<svg height="100" width="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg> 
`,
  })
})

test('builds an SVG object with options', () => {
  expect(svg('<svg></svg>', { width: 100 })).toEqual({
    svg: '<svg></svg>',
    width: 100,
  })
})
