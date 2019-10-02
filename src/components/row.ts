import * as pdfMake from 'pdfmake/build/pdfmake'

export type Row = pdfMake.Content[]

/**
 * Build a table row from content elements.
 */
export default function row(...data: Row): Row {
  return data
}
