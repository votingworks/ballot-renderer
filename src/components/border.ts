import * as pdfMake from 'pdfmake/build/pdfmake'

export interface Borders {
  left: boolean
  top: boolean
  right: boolean
  bottom: boolean
}

export type PdfMakeBorders = NonNullable<pdfMake.TableCell['border']>

export const noBorder = border()

/**
 * Builds a PDF border value.
 *
 * @example
 *
 * // no borders
 * border()
 *
 * // specific borders
 * margin({ left: true, top: true })
 */
function border(borders: PdfMakeBorders): Readonly<PdfMakeBorders>
function border(borders?: Partial<Borders>): Readonly<PdfMakeBorders>
function border(
  borders: Partial<Borders> | PdfMakeBorders = {}
): Readonly<PdfMakeBorders> {
  if (Array.isArray(borders)) {
    return borders
  }

  const { left = false, top = false, right = false, bottom = false } = borders
  return [left, top, right, bottom]
}

export default border
