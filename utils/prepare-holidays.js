import dayjs from 'dayjs'

export const prepareSixMonthHolidays = (holidays) => {
  const dateNow = dayjs()
  const sixMonthsFromNow = dayjs().add(6, 'month')

  // filter to 6 months from today
  const englandAndWales = holidays['england-and-wales'].events.filter((hol) => sixMonthsFromNow.diff(dayjs(hol.date), 'month') < 6 && sixMonthsFromNow.diff(dayjs(hol.date), 'day') >= 0)

  const scotland = holidays.scotland.events.filter((hol) => sixMonthsFromNow.diff(dayjs(hol.date), 'month') < 6 && sixMonthsFromNow.diff(dayjs(hol.date), 'day') >= 0)

  const northernIreland = holidays['northern-ireland'].events.filter((hol) => sixMonthsFromNow.diff(dayjs(hol.date), 'month') < 6 && sixMonthsFromNow.diff(dayjs(hol.date), 'day') >= 0)

  // create a more suitable object structure
  return rebuildWithoutDuplicates(englandAndWales, scotland, northernIreland)
}

// since the three areas will remain a constant we can take in 3 params
const rebuildWithoutDuplicates = (englandAndWales, scotland, northernIreland) => {
  // result need some predefined dataset to compare
  // adding england and wales along with extra key to track country occurrences
  const result = [...englandAndWales.map(hol => ({ ...hol, countries: ['England', ' Wales'] }))]

  scotland.forEach(hol => {
    // its ok to use find from here on since there will never be duplicates in result
    const matchedHoliday = result.find(r => r.title === hol.title)
    if (matchedHoliday) {
      result[result.indexOf(matchedHoliday)].countries.push(' Scotland')
    } else {
      result.push({ ...hol, countries: [' Scotland'] })
    }
  })

  northernIreland.forEach(hol => {
    const matchedHoliday = result.find(r => r.title === hol.title)
    if (matchedHoliday) {
      result[result.indexOf(matchedHoliday)].countries.push(' Northern ireland')
    } else {
      result.push({ ...hol, countries: [' Northern ireland'] })
    }
  })

  result.sort(compare)
  return result
}

const compare = (a, b) => {
  if (dayjs(a.date).isBefore(b.date)) {
    return -1
  } else {
    return 1
  }
}
