import {
  CompletedBallot,
  getPartyPrimaryAdjectiveFromBallotStyle,
  encodeBallot,
} from '@votingworks/ballot-encoder'
import * as pdfMake from 'pdfmake/build/pdfmake'
import table from './table'
import row from './row'
import stack from './stack'
import svg from './svg'
import text from './text'
import border from './border'
import margin from './margin'
import qr from './qr'
import styled from './styled'

export default function header(ballot: CompletedBallot): pdfMake.Content {
  const { ballotStyle, election, precinct } = ballot
  const { seal, title, date, county, state } = election
  const ballotStyleId = ballotStyle.id
  const partyPrimaryAdjective = getPartyPrimaryAdjectiveFromBallotStyle({
    ballotStyleId,
    election,
  })
  const encodedBallot = encodeBallot(ballot)

  return table({
    widths: [seal ? 70 : 0, '*', 75, 135],
    body: [
      row(
        // TODO: fetch from sealURL?
        seal
          ? svg(seal, {
              width: 70,
              border: border({ bottom: true }),
            })
          : {},
        stack(
          [
            text(
              ballot.isTestBallot
                ? 'Unofficial TEST Ballot'
                : 'Official Ballot',
              { bold: true, fontSize: 18 }
            ),
            text(`${partyPrimaryAdjective} ${title}`, {
              bold: true,
              fontSize: 13,
            }),
            text(date),
            text(`${county.name}, ${state}`),
          ],
          {
            margin: margin({ top: 5, bottom: 10 }),
            border: border({ bottom: true }),
          }
        ),
        styled(qr(encodedBallot, { width: 75 }), {
          border: border({ top: true, left: true, bottom: true }),
          margin: margin({ top: 2 }),
        }),
        stack(
          [
            text('Precinct', { fontSize: 9 }),
            text(precinct.name, { bold: true, fontSize: 11 }),
            text('Ballot Style', { fontSize: 9, margin: margin({ top: 3 }) }),
            text(ballotStyleId, { bold: true, fontSize: 11 }),
            text('Ballot ID', { fontSize: 9, margin: margin({ top: 3 }) }),
            text(ballot.ballotId, { bold: true, fontSize: 9 }),
          ],
          {
            border: border({ top: true, right: true, bottom: true }),
          }
        )
      ),
    ],
  })
}
