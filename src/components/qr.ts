import * as pdfMake from 'pdfmake/build/pdfmake'
import generatePath from '../utils/qr/generatePath'
import makeQRCode, { ErrorCorrectLevelNames } from '../utils/qr/makeQRCode'
import svg, { SVG } from './svg'

export type QR = SVG

export type Options = pdfMake.Style & {
  eccLevel?: ErrorCorrectLevelNames
}

function stringifyAttributes(attributes: object): string {
  return Object.entries(attributes)
    .map(([key, value]) => typeof value !== 'undefined' && `${key}="${value}"`)
    .filter(Boolean)
    .join(' ')
}

/**
 * Build a QR code to embed in a PDF.
 *
 * Note that pdfmake directly supports building QR codes, but we aren't using
 * it. The reason for that is that it sizes the QR codes based on a whole-number
 * value for the module size, where a module represents an on or off square in
 * the QR code. Because of this, QR codes rendered directly by pdfmake cannot
 * scale arbitrarily, but instead jump between sizes depending on what it
 * calculates for the module size based on the `fit` option:
 *
 * https://github.com/bpampuch/pdfmake/blob/b38e439e66a60c21d23d251311c636ed5d4ce7ad/src/qrEnc.js#L749
 *
 * Instead, we generate an SVG and use pdfmake's SVG support to render the QR
 * code, which allows us to scale it as we see fit.
 */
export default function qr(data: Uint8Array, options: Options = {}): QR {
  const { eccLevel, ...svgOptions } = options
  const qrcode = makeQRCode(data, eccLevel || 'H')
  const cells = qrcode.modules
  const margin = 0
  const numCells = cells.length + margin * 2
  const fgPath = generatePath(cells, margin)
  const size = options.width || options.height

  const attributes = {
    shapeRendering: 'crispEdges',
    viewBox: `0 0 ${numCells} ${numCells}`,
    height: size && `${size}`,
    width: size && `${size}`,
  }

  return svg(
    `<svg ${stringifyAttributes(attributes)}>
      <path fill="#fff" d="M0,0 h${numCells}v${numCells}H0z" />
      <path fill="#000" d="${fgPath}" />
    </svg>`,
    svgOptions
  )
}
