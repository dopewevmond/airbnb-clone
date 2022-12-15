const doDatesOverlap = (start1: string, end1: string, start2: string, end2: string): boolean => {
  const startDate1 = new Date(start1).getTime()
  const endDate1 = new Date(end1).getTime()
  const startDate2 = new Date(start2).getTime()
  const endDate2 = new Date(end2).getTime()

  const dateOneInDateTwoRange = ((startDate1 <= startDate2) && (startDate2 <= endDate1)) || ((startDate1 <= endDate2) && (endDate2 <= endDate1))
  const dateTwoInDateOneRange = ((startDate2 <= startDate1) && (startDate1 <= endDate2)) || ((startDate2 <= endDate1) && (endDate1 <= endDate2))

  return dateOneInDateTwoRange || dateTwoInDateOneRange
}

export default doDatesOverlap
