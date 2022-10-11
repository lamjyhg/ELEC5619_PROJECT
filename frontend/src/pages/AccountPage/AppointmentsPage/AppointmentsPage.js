import {
  EditingState,
  IntegratedEditing,
  ViewState,
} from "@devexpress/dx-react-scheduler";
import {
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  ConfirmationDialog,
  DateNavigator,
  MonthView,
  Scheduler,
  Toolbar,
} from "@devexpress/dx-react-scheduler-material-ui";
import { notification } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import { useEffect } from "react";
import { handleRequestToUpdateAppointment } from "../../../services/appointments.js";
import { handleActionToGetUserAppointments } from "../../../state/appointments/appointments.action.js";

const processData = (data) => {
  
  const result = data.map((item) => {
    return {
      title: item.gymName,
      startDate: new Date(item.startTime.slice(0, -10)),
      endDate: new Date(item.endTime.slice(0, -10)),
      id: item.id,
      note: item.note,
    };
  });
  return result;
};

export default function AppointmentsPage() {
  const dispatch = useDispatch();
  const { userAppointments } = useSelector((state) => state.appointments);
  let [appointmentsList, setAppointments] = useState();
  const [changedAppointment, setChangedAppointment] = useState();
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    //fetch all appointment create by user
    dispatch(handleActionToGetUserAppointments());
  }, []);

  useEffect(() => {
    setAppointments(processData(userAppointments.appointmentList));
  }, [userAppointments]);

  useEffect(() => {
    if (changedAppointment) {
      //update change:
      const requestData = {
        id: changedAppointment.id,
        startTime: moment(changedAppointment.startDate).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        endTime: moment(changedAppointment.endDate).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
      };
      
      handleRequestToUpdateAppointment(requestData)
        .then(() => {
          notification.success({
            message: "Updated",
            description: "Appointment updated.",
          });
        })
        .catch((error) => {
          notification.success({
            message: "Fail",
            description: error.errors,
          });
        });
    }
  }, [changedAppointment]);

  const { userInfo, isSuccess, isLoading } = useSelector(
    (state) => state.login.loginPage
  );
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
      
      appointmentsList = appointmentsList.map((appointment) => {
        if (changed[appointment.id]) {
          const newAppointment = {
            ...appointment,
            ...changed[appointment.id],
          };
          
          setChangedAppointment(newAppointment);
          return newAppointment;
        } else {
          return appointment;
        }
      });
    }
    if (deleted !== undefined) {
      appointmentsList = appointmentsList.filter(
        (appointment) => appointment.id !== deleted
      );
    }
    setAppointments(appointmentsList);
  };
  return (
    <>
      <Scheduler data={appointmentsList}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={setCurrentDate}
        />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <Toolbar />
        <DateNavigator />
        <MonthView startDayHour={0} endDayHour={24} />
        <ConfirmationDialog />
        <Appointments />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm />
      </Scheduler>
    </>
  );
}
