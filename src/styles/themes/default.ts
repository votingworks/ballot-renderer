import * as pdfMake from 'pdfmake/build/pdfmake'
import * as s from '../definitions'

const NormalFontSize = 11

const DefaultStyleSheet: Readonly<{ [key: string]: pdfMake.Style }> = {
  [s.contestResultNoSelection]: {
    italics: true,
  },

  [s.contestResultTitle]: {
    fontSize: NormalFontSize,
  },

  [s.contestResultVoterSelection]: {
    fontSize: NormalFontSize,
  },

  [s.contestResult]: {
    margin: [0, 5],
  },

  [s.contestResultCandidateName]: {
    bold: true,
  },

  [s.contestResultVoterSelectionCandidate]: {
    bold: true,
  },

  [s.contestResultVoterSelectionYesno]: {
    bold: true,
  },
}

export default DefaultStyleSheet
