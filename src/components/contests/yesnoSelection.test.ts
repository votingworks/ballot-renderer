import { YesNoContest } from '@votingworks/ballot-encoder'
import yesnoSelection from './yesnoSelection'

test('builds text describing a vote without a short title', () => {
  const contest: YesNoContest = {
    description: 'Shall we dance?',
    districtId: '1',
    id: 'dance',
    section: 'Bomont',
    title: 'Dance?',
    type: 'yesno',
    shortTitle: '',
  }

  expect(yesnoSelection('yes', contest)).toMatchObject({ text: 'Yes' })
  expect(yesnoSelection('no', contest)).toMatchObject({ text: 'No' })
})

test('builds text describing a vote with a short title', () => {
  const contest: YesNoContest = {
    description: 'Shall we dance?',
    districtId: '1',
    id: 'dance',
    section: 'Bomont',
    title: 'Dance?',
    type: 'yesno',
    shortTitle: 'Prop. Bacon',
  }

  expect(yesnoSelection('yes', contest)).toMatchObject({
    text: 'Yes on Prop. Bacon',
  })

  expect(yesnoSelection('no', contest)).toMatchObject({
    text: 'No on Prop. Bacon',
  })
})

test('has the expected style', () => {
  const contest: YesNoContest = {
    description: 'Shall we dance?',
    districtId: '1',
    id: 'dance',
    section: 'Bomont',
    title: 'Dance?',
    type: 'yesno',
    shortTitle: '',
  }

  expect(yesnoSelection('yes', contest)).toMatchObject({
    style: 'contest-result--voter-selection--yesno',
  })
})
