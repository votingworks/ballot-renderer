// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace jest {
  interface Matchers<R> {
    toContainPDFText(string: string): R
  }
}

interface PDFContent {
  [key: string]: unknown
}

function findTextMatching<T extends PDFContent>(
  content: T,
  predicate: (content: T) => boolean
): T | undefined {
  if ('text' in content) {
    if (predicate(content)) {
      return content
    }
  }

  for (const key of Object.getOwnPropertyNames(content)) {
    const value = content[key]

    if (value && !Array.isArray(value) && typeof value === 'object') {
      const found = findTextMatching(value as T, predicate)

      if (found) {
        return found
      }
    } else if (value && Array.isArray(value)) {
      for (const element of value) {
        if (typeof element === 'object') {
          const found = findTextMatching(element as T, predicate)

          if (found) {
            return found
          }
        }
      }
    }
  }

  return undefined
}

expect.extend({
  toContainPDFText<T extends PDFContent>(
    received: T,
    expected: string
  ): jest.CustomMatcherResult {
    const found = findTextMatching(
      received,
      content =>
        typeof content.text === 'string' && content.text.includes(expected)
    )

    return {
      pass: typeof found !== 'undefined',
      message: (): string =>
        `could not find ${JSON.stringify(expected)} in PDF content`,
    }
  },
})
