import * as pdfMake from 'pdfmake/build/pdfmake'

export default async function pdfRendererToPdf(
  renderer: pdfMake.TCreatedPdf
): Promise<Buffer> {
  return new Promise((resolve): void => {
    renderer.getBuffer(data => resolve(data))
  })
}
