import { getContests } from '@votingworks/ballot-encoder'
import completedBallot from '../../../test/fixtures/completedBallot'
import results from './results'

test('builds two columns of results', () => {
  const ballot = completedBallot
  const { election, ballotStyle } = ballot
  const object = results(ballot)

  expect(object).toMatchObject(
    expect.objectContaining({
      columns: [
        expect.objectContaining({ table: { body: expect.anything() } }),
        expect.objectContaining({ table: { body: expect.anything() } }),
      ],
    })
  )

  expect(object.columns!.flatMap(column => column.table!.body).length).toEqual(
    getContests({ election, ballotStyle }).length
  )
})
