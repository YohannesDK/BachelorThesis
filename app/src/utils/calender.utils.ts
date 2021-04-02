const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const date = new Date();
const day = date.getDate();
const month = monthNames[date.getMonth()];
const year = date.getFullYear();

const datify = (date: string) => {
  const datee = new Date(date);
  return `${datee.getDate()} ${monthNames[datee.getMonth()].substring(
    0,
    3
  )} ${datee.getFullYear()}`;
};

export { date, day, month, year, datify };
