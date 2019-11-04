import anyTest, { TestInterface, } from 'ava'
import { stub, SinonStub } from 'sinon'

import { createCycles, calculateAverageCycle } from './calculateCycleAverage'

interface Context {
  testData: any,
  fetchUserSymptoms: SinonStub
}

interface TestData {
  userId: string,
  symptomId: string,
  timeStamp: Date
}

const test = anyTest as TestInterface<Context>

test.before((t: any) => {
  const testData: TestData[] = [
    {
      userId: "1",
      symptomId: "1",
      timeStamp: new Date("2019-10-23T18:25:43.511Z")
    },
    {
      userId: "1",
      symptomId: "2",
      timeStamp: new Date("2019-10-24T18:25:43.511Z")
    },
    {
      userId: "1",
      symptomId: "3",
      timeStamp: new Date("2019-10-25T18:25:43.511Z")
    },
    {
      userId: "1",
      symptomId: "1",
      timeStamp: new Date("2019-10-31T18:25:43.511Z")
    },
    {
      userId: "1",
      symptomId: "2",
      timeStamp: new Date("2019-11-01T18:25:43.511Z")
    },
    {
      userId: "1",
      symptomId: "3",
      timeStamp: new Date("2019-11-02T18:25:43.511Z")
    },
    {
      userId: "1",
      symptomId: "2",
      timeStamp: new Date("2019-12-05T18:25:43.511Z")
    },
    {
      userId: "1",
      symptomId: "3",
      timeStamp: new Date("2019-12-06T18:25:43.511Z")
    }
  ]
  
  const fetchUserSymptoms = stub(require('../database/queries/fetchUserSymptoms'), "fetchUserSymptoms").resolves(testData)

  t.context = {
    ...t.context,
    testData,
    fetchUserSymptoms
  }
})

test('Given a UserSymptom list, a data structure displaying cycles can be created', async (t: any) => {
  const { testData } = t.context
  const cycles: Date[][] = createCycles(testData)
  
  const expectedResult: Date[][] = [
    [
      new Date("2019-10-23T18:25:43.511Z"),
      new Date("2019-10-24T18:25:43.511Z"),
      new Date("2019-10-25T18:25:43.511Z")
    ],
    [
      new Date("2019-10-31T18:25:43.511Z"),
      new Date("2019-11-01T18:25:43.511Z"),
      new Date("2019-11-02T18:25:43.511Z")
    ],
    [
      new Date("2019-12-05T18:25:43.511Z"),
      new Date("2019-12-06T18:25:43.511Z")
    ]
]
  
  t.deepEqual(cycles, expectedResult)
})

test('Given a cycles data structure, the cycle average can be calculated', async (t: any) => {
  const average = await calculateAverageCycle(null, "1")
  t.is(average, 21.5)
  t.pass()
})

test.after((t: any) => {
  const { fetchUserSymptoms } = t.context
  fetchUserSymptoms.restore()
})
