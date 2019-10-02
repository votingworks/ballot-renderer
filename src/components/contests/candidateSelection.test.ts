import * as s from '../../styles/definitions'
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
  ).toEqual({
    stack: [
      {
        text: [
          { text: 'BOB', style: s.contestResultCandidateName },
          { text: ' ' },
          { text: '(write-in)' },
        ],
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
  ).toEqual({
    stack: [
      {
        text: [
          { text: 'Lindsay Bluth', style: s.contestResultCandidateName },
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
  ).toEqual({
    stack: [
      {
        text: [{ text: 'Lindsay Bluth', style: s.contestResultCandidateName }],
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
