import {
  electionSample,
  CandidateContest,
  YesNoContest,
} from '@votingworks/ballot-encoder'
import noSelection from './noSelection'
import selection from './selection'
import candidateSelection from './candidateSelection'
import yesnoSelection from './yesnoSelection'

test('delegates to noSelection if there is no vote', () => {
  expect(selection([], electionSample.contests[0])).toEqual(noSelection())
})

test('delegates to candidateSelection for candidate contests', () => {
  const contest = electionSample.contests.find(
    c => c.type === 'candidate'
  ) as CandidateContest
  const choices = [contest.candidates[0]]

  expect(selection(electionSample.parties, contest, choices)).toEqual(
    candidateSelection(electionSample.parties, choices)
  )
})

test('delegates to yesnoSelection for yesno contests', () => {
  const contest = electionSample.contests.find(
    c => c.type === 'yesno'
  ) as YesNoContest
  const choice = 'yes'

  expect(selection(electionSample.parties, contest, choice)).toEqual(
    yesnoSelection(choice, contest)
  )
})
