import { CompletedBallot } from '@votingworks/ballot-encoder'
import * as pdfMake from 'pdfmake/build/pdfmake'
import makeBallot from './components/ballot'
import fonts from './data/fonts.json'
import vfs from './data/vfs.json'
import DefaultStyleSheet from './styles/themes/default'

export async function renderAsBuffer(
  ballot: CompletedBallot,
  styles = DefaultStyleSheet,
  pdf = renderAsPdf(ballot, styles)
): Promise<Buffer> {
  return new Promise((resolve): void => {
    pdf.getBuffer(data => resolve(data))
  })
}

export function renderAsPdf(
  ballot: CompletedBallot,
  styles = DefaultStyleSheet,
  content = renderAsPdfContent(ballot, styles)
): pdfMake.TCreatedPdf {
  return pdfMake.createPdf(content, undefined, fonts, vfs)
}

export function renderAsPdfContent(
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

export default renderAsBuffer
