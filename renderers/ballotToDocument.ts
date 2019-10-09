import { CompletedBallot } from '@votingworks/ballot-encoder'
import * as pdfMake from 'pdfmake/build/pdfmake'
import makeBallot from '../src/components/ballot'
import DefaultStyleSheet from '../src/styles/themes/default'

/**
 * Convert a completed ballot to a pdfmake document, ready to be rendered.
 */
export default function ballotToDocument(
  ballot: CompletedBallot,
  styles = DefaultStyleSheet
): pdfMake.TDocumentDefinitions {
  return {
    pageSize: 'LETTER' as pdfMake.PageSize,
    content: [makeBallot(ballot)],
    defaultStyle: {
      font: 'HelveticaNeue',
    },
    styles,
  }
}
