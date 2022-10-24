export const getDatesFormat = (date) => {
  const formatedDate = new Date(date);

  const currentDay = formatedDate.getDate();
  const currentMonth = formatedDate.getMonth() + 1;
  const currentYear = formatedDate.getFullYear();

  return `${currentDay}/${currentMonth}/${currentYear}`;
};

export default {
  getDatesFormat,
};
