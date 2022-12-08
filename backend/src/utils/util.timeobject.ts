
/**
 * Create a Date object with preferred hours and minutes. The `year`, `month` and `day` have already been set to a constant value
 * so that differences in times can be calculated
 * @param hours hour of day. should be in 24-hour format
 * @param minutes minute of day
 * @returns a `Date` object
 */
function createTimeObject (hours: number, minutes: number): Date {
  return new Date(1970, 1, 1, hours, minutes, 0)
}

export default createTimeObject
