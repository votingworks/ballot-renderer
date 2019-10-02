import * as pdfMake from 'pdfmake/build/pdfmake'
import stack from './stack'

export default function styled(
  content: pdfMake.Content,
  style: pdfMake.Style
): pdfMake.Content {
  return stack([content], style)
}
