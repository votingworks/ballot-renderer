import * as fs from 'fs'
import { promisify } from 'util'
import { join, basename, extname } from 'path'

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

interface Fonts {
  [key: string]: Font
}

interface Font {
  [key: string]: string | [string, string]
}

interface VFS {
  [key: string]: string
}

async function build(): Promise<void> {
  const fontsDir = join(__dirname, '..', 'fonts')
  const files = await readdir(fontsDir)
  const fonts: Fonts = {}
  const vfs: VFS = {}

  for (const file of files) {
    // eslint-disable-next-line no-await-in-loop
    const data = await readFile(join(fontsDir, file))
    vfs[file] = data.toString('base64')

    const ext = extname(file)
    const base = basename(file, ext)

    if (ext === '.ttc') {
      fonts[base] = {
        normal: [file, base],
        bold: [file, `${base}-Bold`],
        italics: [file, `${base}-Italic`],
        bolditalics: [file, `${base}-BoldItalic`],
      }
    } else {
      throw new Error(`unsupported font file type: ${ext}`)
    }
  }

  await writeFile(
    join(__dirname, '..', 'src', 'data', 'fonts.json'),
    JSON.stringify(fonts, undefined, 2),
    'utf-8'
  )
  await writeFile(
    join(__dirname, '..', 'src', 'data', 'vfs.json'),
    JSON.stringify(vfs, undefined, 2),
    'utf-8'
  )
}

build().catch(error => {
  // eslint-disable-next-line no-console
  console.error(error.stack)
  process.exitCode = 1
})
