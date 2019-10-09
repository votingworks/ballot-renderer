import * as pdfMake from 'pdfmake/build/pdfmake'
import { CompletedBallot } from '@votingworks/ballot-encoder'
import DefaultStyleSheet from '../src/styles/themes/default'
import ballotToDocument from './ballotToDocument'
import documentToPdfRenderer from './documentToPdfRenderer'

/**
 * Convert a completed ballot to a pdfmake renderer. This is one step before
 * creating a fully-rendered PDF document, and is useful if you want to get the
 * PDF in a format other than a `Buffer`.
 */
export default function ballotToPdfRenderer(
  ballot: CompletedBallot,
  styles = DefaultStyleSheet
): pdfMake.TCreatedPdf {
  return documentToPdfRenderer(ballotToDocument(ballot, styles))
}
