import * as pdfMake from 'pdfmake/build/pdfmake'

export type Data = NonNullable<pdfMake.Content['text']>
export type Text = pdfMake.Content & { text: Data }

/**
 * Build a PDF text value.
 *
 * @example
 *
 * // simple text
 * text('Hello world')
 *
 * // bold text
 * text('Hello world', { bold: true })
 *
 * // italic text
 * text('Hello world', { italics: true })
 *
 * // composite text
 * text([
 *   text('Hello', { bold: true }),
 *   text(' world', { italics: true })
 * ])
 */
export default function text(data: Data, options?: pdfMake.Content): Text {
  return {
    text: data,
    ...options,
  }
}
