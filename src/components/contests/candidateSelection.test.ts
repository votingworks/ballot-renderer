import candidateSelection from './candidateSelection'

test('builds an empty stack given no candidates', () => {
  expect(candidateSelection([], [])).toEqual({ stack: [] })
})

test('indicates write-in candidates', () => {
  expect(
    candidateSelection(
      [],
      [{ isWriteIn: true, id: 'write-in__BOB', name: 'BOB' }]
    )
  ).toMatchObject({
    stack: [
      {
        text: [{ text: 'BOB' }, { text: ' ' }, { text: '(write-in)' }],
      },
    ],
  })
})

test('indicates party for chosen candidates', () => {
  expect(
    candidateSelection(
      [{ id: 'federalist', name: 'Federalist', abbrev: 'F' }],
      [{ id: 'lindsay-bluth', name: 'Lindsay Bluth', partyId: 'federalist' }]
    )
  ).toMatchObject({
    stack: [
      {
        text: [
          { text: 'Lindsay Bluth' },
          { text: ' ' },
          { text: '/ Federalist' },
        ],
      },
    ],
  })
})

test('omits party for chosen candidates if there is no party id', () => {
  expect(
    candidateSelection([], [{ id: 'lindsay-bluth', name: 'Lindsay Bluth' }])
  ).toMatchObject({
    stack: [
      {
        text: [{ text: 'Lindsay Bluth' }],
      },
    ],
  })
})

test('throws when given a candidate whose party id does not correspond to a party', () => {
  expect(() =>
    candidateSelection(
      [],
      [{ id: 'lindsay-bluth', name: 'Lindsay Bluth', partyId: 'bluth' }]
    )
  ).toThrowError('unable to find party with id: bluth')
})
