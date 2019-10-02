import { CompletedBallot } from '@votingworks/ballot-encoder'
import * as pdfMake from 'pdfmake/build/pdfmake'
import contestResults from './contests/results'
import header from './header'
import stack from './stack'

/**
 * Builds PDF content for a completed ballot, including the header and votes.
 */
export default function ballot(
  completedBallot: CompletedBallot
): pdfMake.Content {
  return stack(header(completedBallot), contestResults(completedBallot))
}
