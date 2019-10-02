import * as pdfMake from 'pdfmake/build/pdfmake'

export type TableData = pdfMake.Table
export type Table = pdfMake.Content & { table: TableData }

export default function table(data: TableData): Table {
  return {
    table: data,
  }
}
