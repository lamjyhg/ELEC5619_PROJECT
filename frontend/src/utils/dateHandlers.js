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
