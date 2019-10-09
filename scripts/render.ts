import * as fs from 'fs'
import { join } from 'path'
import { promisify } from 'util'
import {
  ballotToDocument,
  documentToPdfRenderer,
  pdfRendererToPdf,
} from '../src'
import completedBallot from '../test/fixtures/completedBallot'

const writeFile = promisify(fs.writeFile)

async function main(): Promise<void> {
  const document = ballotToDocument(completedBallot)

  await writeFile(
    join(__dirname, '..', 'output.pdf.json'),
    JSON.stringify(document, undefined, 2)
  )

  const pdfRenderer = documentToPdfRenderer(document)
  const rendered = await pdfRendererToPdf(pdfRenderer)

  await writeFile(join(__dirname, '..', 'output.pdf'), rendered)
}

main().catch(error => {
  // eslint-disable-next-line no-console
  console.error(error.stack)
  process.exitCode = 1
})
