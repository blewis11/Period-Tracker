import { Model } from 'mongoose'

import { subDays, differenceInCalendarDays, isSameDay } from 'date-fns'
import { fetchUserSymptoms } from '../database/queries/fetchUserSymptoms'
import { UserSymptomType } from '../database/schema/userSymptom'

const containsPreviousDay = (list: Date[][], date: Date): number | null => {
  let itemIndex = null

  if (list.length == 0) {
    return itemIndex
  }

  const lastListItem = list.slice(-1)[0] 
  const lastInnerListItem = lastListItem.slice(-1)[0] 

  if (isSameDay(lastInnerListItem, date)) {
    itemIndex = list.length - 1
  }

  return itemIndex
}

const addToExistingGroup = (list: Date[][], date: Date, index: number): Date[][] => {
  const listItem: Date[] = [...list[index], date]
  const updatedList = list
  updatedList[index] = listItem

  return updatedList
}

const createCycles = (userSymptomList: UserSymptomType[]): Date[][] => {
  const userSymptomGrouped: Date[][] = []

  userSymptomList.map((userSymptom: UserSymptomType) => {
    const timeStamp = userSymptom.timeStamp
    const previousDay = subDays(timeStamp, 1)
    
    const itemIndex = containsPreviousDay(userSymptomGrouped, previousDay)

    if (itemIndex != null) {
      addToExistingGroup(userSymptomGrouped, timeStamp, itemIndex)
    } else {
      userSymptomGrouped.push([ timeStamp ])
    }
  })

  return userSymptomGrouped
}

const calculateAverageCycle = async (UserSymptom: Model<UserSymptomType>, userId: string): Promise<number> => {
  const userSymptoms = await fetchUserSymptoms(UserSymptom, userId)
  
  const cycles = createCycles(userSymptoms)
  let cycleLengthSum = 0

  for (let i = 0; i < cycles.length - 1; i++ ){
    const firstDayOfCycle = cycles[i][0]
    const lastDayOfCycle = cycles[i+1][0]
    cycleLengthSum += differenceInCalendarDays(lastDayOfCycle, firstDayOfCycle)
  }

  
  const averageLength = (cycleLengthSum != 0)
    ? Number((cycleLengthSum / (cycles.length-1)).toFixed(2))
    : 0

  return averageLength
}

export {
  createCycles,
  fetchUserSymptoms,
  calculateAverageCycle
}
