import { electionSample } from '@votingworks/ballot-encoder'
import result from './result'

test('contains the contest title', () => {
  const contest = electionSample.contests[0]

  expect(result(electionSample.parties, contest)).toContainPDFText(
    contest.title
  )
})
