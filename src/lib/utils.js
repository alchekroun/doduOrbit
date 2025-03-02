import dayjs from "dayjs"

const ALIGNMENT_DAYS = [51, 79, 110, 140, 172, 365]
const ALIGNMENT_HOURS = ALIGNMENT_DAYS.map((day) => day * 24 - 5)

const getCurrentSegment = (daytime) => {
  const HOURS_IN_YEAR = 8760 // 365 * 24
  let periodCount = Math.floor(daytime / HOURS_IN_YEAR)
  let timeInYear = daytime - periodCount * HOURS_IN_YEAR // Heure dans l'année actuelle

  let segmentIndex = ALIGNMENT_HOURS.findIndex(
    (h, i) =>
      i < ALIGNMENT_HOURS.length - 1 && timeInYear < ALIGNMENT_HOURS[i + 1]
  )
  if (segmentIndex === -1) segmentIndex = ALIGNMENT_HOURS.length - 1

  return { periodCount, segmentIndex, timeInYear }
}

const getAngle2 = (daytime, shift = 0) => {
  const { periodCount, segmentIndex, timeInYear } = getCurrentSegment(daytime)

  let t0 = ALIGNMENT_HOURS[segmentIndex]
  let t1 = ALIGNMENT_HOURS[segmentIndex + 1]

  let cycleTime = (timeInYear - t0) / (t1 - t0)

  return (
    2 *
      Math.PI *
      (periodCount * ALIGNMENT_HOURS.length + segmentIndex + cycleTime) +
    shift
  )
}

const getAngle = (daytime, shift = 0, speed = 1) => {
  return (daytime * Math.PI * 2) / (672 * (1 / speed)) + shift
}

const getPointOnCircle = (r, angle, cx = 0, cy = 0) => {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  }
}

const getPointOnEllispe = (a, b, angle, cx = 0, cy = 0) => {
  return {
    x: cx + a * Math.cos(angle),
    y: cy + b * Math.sin(angle),
  }
}

const START_OF_YEAR = dayjs("2025-01-01T00:00:00")

const dateToHourOfYear = (date) => {
  return date.diff(START_OF_YEAR, "hour") + 1 // +1 pour avoir une base 1 au lieu de 0
}

const hourOfYearToDate = (hour) => {
  return START_OF_YEAR.add(hour - 1, "hour") // -1 pour ajuster le décalage
}

export {
  getAngle,
  getAngle2,
  getPointOnCircle,
  getPointOnEllispe,
  dateToHourOfYear,
  hourOfYearToDate,
  ALIGNMENT_HOURS,
}
