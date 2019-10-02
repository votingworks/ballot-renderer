import QRCode from 'qr.js/lib/QRCode'
import ErrorCorrectLevel from 'qr.js/lib/ErrorCorrectLevel'
import Mode from 'qr.js/lib/mode'
import BitBuffer from 'qr.js/lib/BitBuffer'

export type ErrorCorrectLevelNames = 'L' | 'M' | 'Q' | 'H'

/**
 * Adds data to the given `QRCode` using private APIs.
 *
 * The public API is `QRCode#addData` only takes a `string`:
 * - https://github.com/defunctzombie/qr.js/blob/af3e38902dfef90126d7b81e2619da8fa61b6f54/lib/QRCode.js#L19-L23
 * - https://github.com/defunctzombie/qr.js/blob/af3e38902dfef90126d7b81e2619da8fa61b6f54/lib/8BitByte.js#L17
 *
 * As a result, we have to dig into the library to pull out the actual `QRCode`
 * class and access its private `dataList` and `dataCache` properties. This
 * function mimics the behavior of `QRCode#addData`, but uses a custom data
 * object rather than `qr.js`'s own internal `BitByte`:
 *
 * ```js
 * proto.addData = function(data) {
 *   var newData = new BitByte(data);
 *   this.dataList.push(newData);
 *   this.dataCache = null;
 * };
 * ```
 */
function addData(qrcode: QRCode, data: Uint8Array): void {
  qrcode.dataList.push({
    mode: Mode.MODE_8BIT_BYTE,

    getLength(): number {
      return data.length
    },

    write(buffer: BitBuffer): void {
      for (const byte of data) {
        buffer.put(byte, 8)
      }
    },
  })

  // eslint-disable-next-line no-param-reassign, no-null/no-null
  qrcode.dataCache = null
}

/**
 * Builds a QR code from the given binary data.
 *
 * Based on code originally from https://github.com/zpao/qrcode.react,
 * originally published with an ISC license.
 */
export default function makeQRCode(
  value: Uint8Array,
  level: ErrorCorrectLevelNames
): QRCode {
  // We'll use type===-1 to force QRCode to automatically pick the best type
  const qrcode = new QRCode(-1, ErrorCorrectLevel[level])

  addData(qrcode, value)
  qrcode.make()

  return qrcode
}
