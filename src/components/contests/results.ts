import * as pdfMake from 'pdfmake/build/pdfmake'
import { CompletedBallot, getContests } from '@votingworks/ballot-encoder'
import inColumns from '../../utils/inColumns'
import result from './result'
import margin from '../margin'

export default function results(ballot: CompletedBallot): pdfMake.Content {
  const { votes, ballotStyle, election } = ballot
  const { parties } = election
  const contests = getContests({ ballotStyle, election })

  const ret = {
    columns: inColumns(
      2,
      contests.map(contest => result(parties, contest, votes[contest.id]))
    ).map(cells => ({
      margin: margin({ right: 15 }),
      table: {
        body: cells.map(cell => [cell]),
      },
    })),
  }

  return ret
}
