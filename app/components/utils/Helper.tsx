function formatMonth(month: number) {
  if (month < 10) {
    return '0' + month;
  }
  return month;
}
export const getDateString = (
  startDateInput: string,
  endDateInput: string
): string => {
  let startDateString = '';
  let endDateString = '';

  if (startDateInput) {
    const startDate = new Date(startDateInput);
    const startDay = startDate.getDate();
    const startMonth = startDate.getMonth();
    const startYear = startDate.getFullYear();
    startDateString = `${startDay}.${formatMonth(startMonth)}.${startYear}`;
  }

  if (endDateInput) {
    const endDate = new Date(endDateInput);
    const endDay = endDate.getDate();
    const endMonth = endDate.getMonth();
    const endYear = endDate.getFullYear();
    endDateString = `${endDay}.${formatMonth(endMonth)}.${endYear}`;
  }

  return startDateString + ' - ' + endDateString;
};
