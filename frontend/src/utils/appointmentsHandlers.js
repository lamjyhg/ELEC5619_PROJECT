export const replaceAppointmentInList = (appointment, list) => {
  const newList = [...list];
  const foundIndex = list.findIndex((each) => each.id === appointment.id);
  if (foundIndex) {
    newList.splice(foundIndex, 1, appointment);
  }
  return newList;
};

export const removeAppointmentInList = (appointment, list) => {
  const newList = [...list];

  const foundIndex = list.findIndex((each) => each.id === appointment.id);
  if (foundIndex) {
    newList.splice(foundIndex, 1);
  }
  return newList;
};
