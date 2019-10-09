import * as pdfMake from 'pdfmake/build/pdfmake'
import mockOf from '../test/utils/mockOf'
import documentToPdfRenderer from './documentToPdfRenderer'
import documentToPdf from './documentToPdf'

jest.mock('./documentToPdfRenderer')

const documentToPdfRendererMock = mockOf(documentToPdfRenderer)

test('creates a PDF document buffer from a document', async () => {
  documentToPdfRendererMock.mockReturnValueOnce({
    getBuffer: callback => callback(Buffer.of(1, 2, 3), []),
  } as pdfMake.TCreatedPdf)

  expect(await documentToPdf({ content: [] })).toEqual(Buffer.of(1, 2, 3))
})
