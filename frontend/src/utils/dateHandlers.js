export const displayDate = (date) => {
  if (date) {
    const newDate = new Date(date);
    return `${newDate.getFullYear()}/${displayTwoNumber(
      newDate.getMonth() + 1
    )}/${displayTwoNumber(newDate.getDate())} ${displayTwoNumber(
      newDate.getHours()
    )}:${displayTwoNumber(newDate.getMinutes())}:${displayTwoNumber(
      newDate.getSeconds()
    )}`;
  }
  return '';
};

const displayTwoNumber = (number) => {
  if (number === 0) {
    return '00';
  }
  if (number) {
    return ('0' + number).slice(-2);
  }
  return '';
};

export const days = ['Mon', 'Tus', 'Wed', 'Thur', 'Fri', 'Sat', 'Fri'];

export const getStringFromNumber = (number) => {
  const num = number * 1;
  if (num < 7 && num >= 0) {
    return days[num];
  }
  return '';
};

export const dayObjects = [
  {
    text: 'Mon',
    value: '0',
  },
  {
    text: 'Tue',
    value: '1',
  },
  {
    text: 'Wed',
    value: '2',
  },
  {
    text: 'Thur',
    value: '3',
  },
  {
    text: 'Fri',
    value: '4',
  },
  {
    text: 'Sat',
    value: '5',
  },
  {
    text: 'Sun',
    value: '6',
  },
];
