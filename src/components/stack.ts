import * as pdfMake from 'pdfmake/build/pdfmake'

export type Stack = pdfMake.Content & { stack: pdfMake.Content[] }

/**
 * Builds a PDF stack object. Elements in this stack will be laid out top to
 * bottom and by default will be left-aligned.
 *
 * @example
 *
 * // Renders "Name:" over a bold "Bob"
 * stack(
 *   text('Name:'),
 *   text('Bob', { bold: true })
 * )
 */
function stack(elements: pdfMake.Content[], style: pdfMake.Style): Stack
function stack(...elements: pdfMake.Content[]): Stack
function stack(...args: unknown[]): Stack {
  if (args.length <= 2 && Array.isArray(args[0])) {
    const [elements, style] = args as [pdfMake.Content[], pdfMake.Style]

    return {
      stack: elements,
      ...style,
    }
  }

  return {
    stack: args as pdfMake.Content[],
  }
}

export default stack
