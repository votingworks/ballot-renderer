export default function inColumns<T>(columnCount: number, list: T[]): T[][] {
  const rowCount = Math.ceil(list.length / columnCount)
  const columns: T[][] = []

  for (let c = 0; c < columnCount; c += 1) {
    columns.push(list.slice(c * rowCount, (c + 1) * rowCount))
  }

  return columns
}
