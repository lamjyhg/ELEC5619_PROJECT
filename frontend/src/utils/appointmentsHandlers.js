export const replaceAppointmentInList = (appointment, list) => {
  const newList = [...list];
  const foundIndex = list.findIndex((each) => each.id === appointment.id);
  if (foundIndex) {
    newList[foundIndex] = appointment;
  }
  return newList;
};
