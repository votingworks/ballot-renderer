import { electionSample } from '@votingworks/ballot-encoder'
import completedBallot from '../../test/fixtures/completedBallot'
import header from './header'

test('includes an election seal if one is given', () => {
  expect(completedBallot.election.seal).toBeDefined()
  expect(header(completedBallot)).toMatchObject({
    table: {
      body: [
        expect.arrayContaining([
          expect.objectContaining({ svg: completedBallot.election.seal }),
        ]),
      ],
    },
  })
})

test('omits the election seal if none is given', () => {
  expect(
    header({
      ...completedBallot,
      election: {
        ...completedBallot.election,
        seal: undefined,
      },
    })
  ).not.toMatchObject({
    table: {
      body: [
        expect.arrayContaining([
          expect.objectContaining({ svg: completedBallot.election.seal }),
        ]),
      ],
    },
  })
})

test('includes the title of the election', () => {
  expect(header(completedBallot)).toContainPDFText(
    completedBallot.election.title
  )
})

test('includes "Official Ballot" when not in test mode', () => {
  expect(
    header({
      ...completedBallot,
      isTestBallot: false,
    })
  ).toContainPDFText('Official Ballot')
})

test('includes "Unofficial TEST Ballot" when in test mode', () => {
  expect(
    header({
      ...completedBallot,
      isTestBallot: true,
    })
  ).toContainPDFText('Unofficial TEST Ballot')
})

test('includes the election date', () => {
  expect(header(completedBallot)).toContainPDFText(electionSample.date)
})

test('includes the county name', () => {
  expect(header(completedBallot)).toContainPDFText(electionSample.county.name)
})

test('includes the state', () => {
  expect(header(completedBallot)).toContainPDFText(electionSample.state)
})
