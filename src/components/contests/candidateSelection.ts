import { Candidate, Parties, Party } from '@votingworks/ballot-encoder'
import * as pdfMake from 'pdfmake/build/pdfmake'
import * as s from '../../styles/definitions'
import stack from '../stack'
import text from '../text'

/**
 * Finds a party by id from the list.
 *
 * @throws if no party with the id exists
 */
function findPartyById(parties: Parties, id: string): Party {
  const party = parties.find(p => p.id === id)

  if (!party) {
    throw new Error(`unable to find party with id: ${id}`)
  }

  return party
}

/**
 * Builds text describing the candidate choice, i.e. name and context.
 */
function candidateChoice(candidate: Candidate, party?: Party): pdfMake.Content {
  const parts: pdfMake.Content[] = [text(candidate.name, { style: s.bold })]

  if (party) {
    parts.push(text(' '), text(`/ ${party.name}`))
  }

  if (candidate.isWriteIn) {
    parts.push(text(' '), text('(write-in)'))
  }

  return text(parts, { style: s.large })
}

/**
 * Builds a stack of candidate selections, one per choice or write-in.
 */
export default function candidateSelection(
  parties: Parties,
  vote: Candidate[]
): pdfMake.Content {
  return stack(
    ...vote.map(candidate =>
      candidateChoice(
        candidate,
        candidate.partyId
          ? findPartyById(parties, candidate.partyId)
          : undefined
      )
    )
  )
}
