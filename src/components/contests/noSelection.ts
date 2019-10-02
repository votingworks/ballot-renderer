import * as pdfMake from 'pdfmake/build/pdfmake'
import * as s from '../../styles/definitions'
import text from '../text'

/**
 * Builds a text object representing a contest with no vote.
 */
export default function noSelection(): pdfMake.Content {
  return text('[no selection]', {
    style: s.contestResultNoSelection,
  })
}
