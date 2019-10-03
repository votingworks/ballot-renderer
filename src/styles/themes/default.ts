import * as pdfMake from 'pdfmake/build/pdfmake'
import * as s from '../definitions'

const NormalFontSize = 11
const LargeFontSize = 13

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

  [s.bold]: {
    bold: true,
  },

  [s.italic]: {
    italics: true,
  },

  [s.large]: {
    fontSize: LargeFontSize,
  },
}

export default DefaultStyleSheet
