import { YesNoContest, YesNoVote } from '@votingworks/ballot-encoder'
import * as pdfMake from 'pdfmake/build/pdfmake'
import text from '../text'
import * as s from '../../styles/definitions'

export default function yesnoSelection(
  vote: YesNoVote,
  contest: YesNoContest
): pdfMake.Content {
  let selection: string

  if (contest.shortTitle) {
    if (vote === 'yes') {
      selection = `Yes on ${contest.shortTitle}`
    } else {
      selection = `No on ${contest.shortTitle}`
    }
  } else if (vote === 'yes') {
    selection = 'Yes'
  } else {
    selection = 'No'
  }

  return text(selection, { style: s.contestResultVoterSelectionYesno })
}
