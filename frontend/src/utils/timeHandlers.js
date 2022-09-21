const weekDays = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
export const fromNumberToWeekday = (number) => {
  if (number < 0 || number > 6) {
    return '';
  }
  return weekDays[number];
};

export const fromWeekdayToNumber = (weekday) => {
  return weekDays.findIndex(weekday);
};

export const timeFormatter = (time) => {
  const timeList = time.split(':');
  if (timeList.length >= 2) {
    return timeList[0] + ':' + timeList[1];
  }
  return '00:00';
};
