import { compareHolidays, rebuildWithoutDuplicates, prepareSixMonthHolidays } from './prepare-holidays'

// Test Data
const holiday1 = { title: 'Yay', date: '2022-12-27', notes: '', bunting: true }
const holiday2 = { title: 'Yay', date: '2022-12-26', notes: '', bunting: true }
const holiday3 = { title: 'Yay', date: '2022-12-26', notes: '', bunting: true }

test('holiday object comparator greater than', () => {
  expect(compareHolidays(holiday1, holiday2)).toBe(1)
})

test('holiday object comparator less than', () => {
  expect(compareHolidays(holiday2, holiday1)).toBe(-1)
})

test('holiday object comparator equals to', () => {
  expect(compareHolidays(holiday2, holiday3)).toBe(0)
})
