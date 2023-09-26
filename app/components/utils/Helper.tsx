export const getDateString = (
  startDateInput: Date,
  endDateInput: Date
): string => {
  let startDateString = '';
  let endDateString = '';

  if (startDateInput) {
    const startDate = new Date(startDateInput);
    const startDay = startDate.getDate();
    const startMonth = startDate.toLocaleString('default', {
      month: 'short',
    });
    startDateString = `${startDay} ${startMonth}`;
  }

  if (endDateInput) {
    const endDate = new Date(endDateInput);
    const endDay = endDate.getDate();
    const endMonth = endDate.toLocaleString('default', { month: 'short' });
    endDateString = `${endDay} ${endMonth}`;
  }

  return startDateString + ' - ' + endDateString;
};
