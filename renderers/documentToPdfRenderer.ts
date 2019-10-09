import * as pdfMake from 'pdfmake/build/pdfmake'
import fonts from '../src/data/fonts.json'
import vfs from '../src/data/vfs.json'

export default function documentToPdfRenderer(
  document: pdfMake.TDocumentDefinitions
): pdfMake.TCreatedPdf {
  return pdfMake.createPdf(document, undefined, fonts, vfs)
}
