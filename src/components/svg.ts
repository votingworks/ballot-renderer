import * as pdfMake from 'pdfmake/build/pdfmake'

export type Options = pdfMake.Style
export type SVG = Options & { svg: string }

/**
 * Builds a SVG object to embed.
 *
 * @example
 *
 * // build from an SVG string
 * svg(`
 *   <svg height="100" width="100">
 *     <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
 *   </svg>
 * `)
 *
 * // build SVG with options
 * svg(svgString, { width: 100 })
 */
export default function svg(data: string, options?: Options): SVG {
  return { svg: data, ...options }
}
