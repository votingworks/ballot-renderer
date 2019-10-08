import * as pdfMake from 'pdfmake/build/pdfmake'
import pdfRendererToPdf from './pdfRendererToPdf'

test('builds a PDF buffer from a PDF renderer', async () => {
  const renderer = {
    getBuffer: callback => callback(Buffer.of(1, 2, 3), []),
  } as pdfMake.TCreatedPdf

  expect(await pdfRendererToPdf(renderer)).toEqual(Buffer.of(1, 2, 3))
})
