import * as pdfMake from 'pdfmake/build/pdfmake'
import documentToPdfRenderer from './documentToPdfRenderer'
import pdfRendererToPdf from './pdfRendererToPdf'

/**
 * Convert a pdfmake document to a fully-rendered PDF document buffer.
 */
export default async function documentToPdf(
  document: pdfMake.TDocumentDefinitions
): Promise<Buffer> {
  return pdfRendererToPdf(documentToPdfRenderer(document))
}
