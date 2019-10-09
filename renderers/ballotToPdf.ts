import { CompletedBallot } from '@votingworks/ballot-encoder'
import DefaultStyleSheet from '../src/styles/themes/default'
import ballotToPdfRenderer from './ballotToPdfRenderer'
import pdfRendererToPdf from './pdfRendererToPdf'

/**
 * Convert a completed ballot to a fully-rendered PDF buffer.
 */
export default async function ballotToPdf(
  ballot: CompletedBallot,
  styles = DefaultStyleSheet
): Promise<Buffer> {
  return pdfRendererToPdf(ballotToPdfRenderer(ballot, styles))
}
