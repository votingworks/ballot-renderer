# Ballot Renderer

Renders ballots to PDF.

## Example

```tsx
import { getContests, vote, CompletedBallot } from '@votingworks/ballot-encoder'
import render from '@votingworks/ballot-renderer'

// build the ballot
function makeBallot(): CompletedBallot {
  const ballotStyle = election.ballotStyles[0]
  const precinct = election.precincts[0]
  const ballotId = 'abcde'
  const contests = getContests({ ballotStyle, election })
  const votes = vote(contests, {
    'judicial-robert-demergue': 'yes',
    'judicial-elmer-hull': 'yes',
    'question-a': 'yes',
    'question-b': 'no',
    'question-c': 'yes',
    'proposition-1': 'yes',
    'measure-101': 'no',
    '102': 'yes',
  })

  return {
    election,
    ballotId,
    ballotStyle,
    precinct,
    votes,
  }
}

// render to file (NodeJS)
import * as fs from 'fs'
import { promisify } from 'util'

const writeFile = promisify(fs.writeFile)

async function renderToFile(
  path: string,
  ballot: CompletedBallot
): Promise<void> {
  await fs.writeFile('output.pdf', await render(ballot))
}

// render inline in the browser (React)
import * as ReactDOM from 'react-dom'
import * as b64 from 'base64-js'

async function main() {
  ReactDOM.render(
    <iframe
      src={`data:application/pdf;base64,${b64.fromByteArray(
        await render(ballot)
      )}`}
      title="ballot"
      style={{ height: '100vh', width: '100%' }}
    />,
    document.body
  )
}
```

## Usage

Rendering a ballot is as easy as passing a `CompletedBallot` to `render`,
returning a `Buffer`:

```ts
import { render } from '@votingworks/ballot-renderer'

async function renderAndDoSomethingWithPDF(
  ballot: CompletedBallot
): Promise<void> {
  const pdfContents = render(ballot)

  // …
}
```

By default this will use the latest encoding from `@votingworks/ballot-encoder`,
but if you wish you can specify the version to use:

```ts
import { EncoderVersion } from '@votingworks/ballot-encoder'
import { render } from '@votingworks/ballot-renderer'

async function renderAndDoSomethingWithPDF(
  ballot: CompletedBallot
): Promise<void> {
  const pdfContents = render(ballot, { encoderVersion: EncoderVersion.v0 })

  // …
}
```

### Separate ballot document creation from PDF rendering

Sometimes it's useful to be able to separate the ballot document creation step
from the PDF rendering step. For example, you may wish to generate the ballot
document in a client and send it to a server for rendering. Here's how you can
achieve that:

```ts
// client (e.g. a browser)
import ballotToDocument from '@votingworks/ballot-renderer/renderers/ballotToDocument'

async function renderPDF(): Promise<Blob> {
  const response = await fetch('http://localhost:8080/my/render/endpoint', {
    method: 'POST',
    body: JSON.stringify(ballotToDocument(completedBallot)),
  })

  return response.blob()
}

// server (e.g. nodejs + express)
import documentToPdf from '@votingworks/ballot-renderer/renderers/documentToPdf'
import express from 'express'

const app = express()

app.post('/my/render/endpoint', async (req, res) => {
  const { body } = req
  const json = new TextDecoder().decode(body)
  const document = JSON.parse(json)
  const pdf = await documentToPdf(document)

  res.end(pdf)
})

app.listen(8080)
```

See the [renderers](./renderers) folder for all the partial renderings you can
do.
