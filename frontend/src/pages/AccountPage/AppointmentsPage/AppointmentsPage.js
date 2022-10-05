import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Appointments,
  MonthView,
  ConfirmationDialog,
  AppointmentTooltip,
  DateNavigator,
  Toolbar,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useState } from "react";
import { appointments } from "../../../utils/appointmentsMock";

export default function AppointmentsPage() {
  const [appointmentsList, setAppointments] = useState(appointments);
  const [currentDate, setCurrentDate] = useState(new Date("2018-06-27"));

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      const startingAddedId =
        appointmentsList.length > 0
          ? appointmentsList[appointmentsList.length - 1].id + 1
          : 0;
      appointmentsList = [
        ...appointmentsList,
        { id: startingAddedId, ...added },
      ];
    }
    if (changed) {
      appointmentsList = appointmentsList.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
    }
    if (deleted !== undefined) {
      appointmentsList = appointmentsList.filter(
        (appointment) => appointment.id !== deleted
      );
    }
    setAppointments(appointmentsList);
  };
  return (
    <Scheduler data={appointmentsList}>
      <ViewState
        currentDate={currentDate}
        onCurrentDateChange={setCurrentDate}
      />
      <EditingState onCommitChanges={commitChanges} />
      <Toolbar />
      <DateNavigator />
      <MonthView startDayHour={9} endDayHour={14} />
      <ConfirmationDialog />

      <Appointments />
      <AppointmentTooltip showOpenButton showDeleteButton />
      <AppointmentForm />
    </Scheduler>
  );
}
