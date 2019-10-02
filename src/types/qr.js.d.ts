declare module 'qr.js/lib/QRCode' {
  import ErrorCorrectLevel from 'qr.js/lib/ErrorCorrectLevel'
  import Mode from 'qr.js/lib/mode'
  import BitBuffer from 'qr.js/lib/BitBuffer'

  interface Data {
    mode: Mode
    getLength(): number
    write(buffer: BitBuffer): void
  }

  export default class QRCode {
    public constructor(version: number, eccLevel: ErrorCorrectLevel)

    public dataList: Data[]
    public dataCache: unknown

    public make(): void
    public modules: boolean[][]
  }
}

declare module 'qr.js/lib/ErrorCorrectLevel' {
  enum ErrorCorrectLevel {
    L = 1,
    M = 0,
    Q = 3,
    H = 2,
  }

  export default ErrorCorrectLevel
}

declare module 'qr.js/lib/mode' {
  enum Mode {
    MODE_NUMBER = 1 << 0,
    MODE_ALPHA_NUM = 1 << 1,
    MODE_8BIT_BYTE = 1 << 2,
    MODE_KANJI = 1 << 3,
  }

  export default Mode
}

declare module 'qr.js/lib/BitBuffer' {
  export default class BitBuffer {
    public put(num: number, length: number): void
  }
}
