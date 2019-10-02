import {
  Candidate,
  CandidateContest,
  Parties,
  Vote,
  YesNoContest,
  YesNoVote,
} from '@votingworks/ballot-encoder'
import * as pdfMake from 'pdfmake/build/pdfmake'
import candidateSelection from './candidateSelection'
import noSelection from './noSelection'
import yesnoSelection from './yesnoSelection'

export default function selection(
  parties: Parties,
  contest: YesNoContest | CandidateContest,
  vote?: Vote
): pdfMake.Content {
  if (!vote) {
    return noSelection()
  }

  if (contest.type === 'candidate') {
    return candidateSelection(parties, vote as Candidate[])
  }

  return yesnoSelection(vote as YesNoVote, contest)
}
