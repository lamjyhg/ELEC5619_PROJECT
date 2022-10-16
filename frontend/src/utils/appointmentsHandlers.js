export const replaceAppointmentInList = (appointment, list) => {
  const newList = [...list];
  const foundAppointment = list.find((each) => each.id === appointment.id);
  console.log(foundAppointment);
  if (foundAppointment) {
    const foundIndex = list.indexOf(foundAppointment);
    newList.splice(foundIndex, 1, appointment);
  }
  return newList;
};

export const removeAppointmentInList = (appointment, list) => {
  const newList = [...list];

  const foundAppointment = list.find((each) => each.id === appointment.id);
  if (foundAppointment) {
    const foundIndex = list.indexOf(foundAppointment);
    newList.splice(foundIndex, 1);
  }
  return newList;
};
