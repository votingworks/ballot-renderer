import * as fs from 'fs'
import { join } from 'path'
import { promisify } from 'util'
import render, { renderAsPdf, renderAsPdfContent } from '../src'
import DefaultStyleSheet from '../src/styles/themes/default'
import completedBallot from '../test/fixtures/completedBallot'

const writeFile = promisify(fs.writeFile)

async function main(): Promise<void> {
  const pdfContent = renderAsPdfContent(completedBallot)

  await writeFile(
    join(__dirname, '..', 'output.pdf.json'),
    JSON.stringify(pdfContent, undefined, 2)
  )

  const pdf = renderAsPdf(completedBallot, DefaultStyleSheet, pdfContent)
  const rendered = await render(completedBallot, DefaultStyleSheet, pdf)

  await writeFile(join(__dirname, '..', 'output.pdf'), rendered)
}

main().catch(error => {
  console.error(error.stack)
  process.exitCode = 1
})
