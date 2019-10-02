import {
  CandidateContest,
  Parties,
  Vote,
  YesNoContest,
} from '@votingworks/ballot-encoder'
import * as pdfMake from 'pdfmake/build/pdfmake'
import * as s from '../../styles/definitions'
import border from '../border'
import stack from '../stack'
import text from '../text'
import selection from './selection'
import styled from '../styled'

export default function result(
  parties: Parties,
  contest: YesNoContest | CandidateContest,
  vote?: Vote
): pdfMake.Content {
  return styled(
    stack(
      // contest title
      text(contest.title, { style: s.contestResultTitle }),
      // voter selection
      styled(selection(parties, contest, vote), {
        style: s.contestResultVoterSelection,
      })
    ),
    {
      border: border({ bottom: true }),
      style: s.contestResult,
    }
  )
}
