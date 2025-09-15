// This utility function is used to generate formatted date for taskServices.

export function daySummary(startDate: Date, endDate: Date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const daysRemaining = endDate.getDate() - new Date().getDate();
  const startMonth = months[startDate.getMonth()];
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const endMonth = months[endDate.getMonth()];
  let daySummary: string;
  if (startMonth === endMonth) {
    daySummary = `${startMonth} ${startDay} - ${endDay}`;
  } else {
    daySummary = `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
  }

  return { daysRemaining, daySummary };
}
