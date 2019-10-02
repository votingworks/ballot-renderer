/**
 * Builds an SVG path string based on QR code modules.
 *
 * Based on code originally from https://github.com/zpao/qrcode.react,
 * originally published with an ISC license.
 */
export default function generatePath(
  modules: boolean[][],
  margin: number
): string {
  const ops: string[] = []

  modules.forEach((row, y) => {
    let start: number | undefined

    row.forEach((cell, x) => {
      if (!cell && start !== undefined) {
        // M0 0h7v1H0z injects the space with the move and drops the comma,
        // saving a char per operation
        ops.push(
          `M${start + margin} ${y + margin}h${x - start}v1H${start + margin}z`
        )
        start = undefined
        return
      }

      // end of row, clean up or skip
      if (x === row.length - 1) {
        if (!cell) {
          // We would have closed the op above already so this can only mean
          // 2+ light modules in a row.
          return
        }
        if (start === undefined) {
          // Just a single dark module.
          ops.push(`M${x + margin},${y + margin} h1v1H${x + margin}z`)
        } else {
          // Otherwise finish the current line.
          ops.push(
            `M${start + margin},${y + margin} h${x + 1 - start}v1H${start +
              margin}z`
          )
        }
        return
      }

      if (cell && start === undefined) {
        start = x
      }
    })
  })

  return ops.join('')
}
