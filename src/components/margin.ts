import { Margins as PdfMakeMargins } from 'pdfmake/build/pdfmake'

export interface Margins {
  left: number
  top: number
  right: number
  bottom: number
}

/**
 * Builds a PDF margins value.
 *
 * @example
 *
 * // all margins the same
 * margin(5)
 *
 * // all-zero margins
 * margin()
 *
 * // specific margins
 * margin({ left: 1, top: 1 })
 */
function margin(margins: PdfMakeMargins): PdfMakeMargins
function margin(margins?: Partial<Margins>): PdfMakeMargins
function margin(
  margins: Partial<Margins> | PdfMakeMargins = {}
): PdfMakeMargins {
  if (typeof margins === 'number') {
    return margins
  }

  if (Array.isArray(margins)) {
    return margins
  }

  const { left = 0, top = 0, right = 0, bottom = 0 } = margins
  return [left, top, right, bottom]
}

export default margin
