import {
  EditingState,
  IntegratedEditing,
  ViewState,
} from "@devexpress/dx-react-scheduler";
import {
  AppointmentTooltip,
  AppointmentForm,
  Appointments,
  ConfirmationDialog,
  DayView,
  Scheduler,
  DragDropProvider,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Avatar, Row, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { CalendarOutlined, MailOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { appointments } from "../../../utils/appointmentsMock.js";
import "./ProfilePage.scss";
import { handleActionToGetUserAppointments } from "../../../state/appointments/appointments.action.js";
const processData = (data) => {
  const result = data.map((item) => {
    return {
      title: item.gymName,
      startDate: new Date(item.startTime),
      endDate: new Date(item.endTime),
      id: item.id,
      note: item.note,
    };
  });
  return result;
};
export default function ProfilePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    //fetch all appointment create by user
    dispatch(handleActionToGetUserAppointments());
    setAppointments(processData(userAppointments.appointmentList));
  }, []);
  const { userAppointments } = useSelector((state) => state.appointments);
  let [appointmentsList, setAppointments] = useState();
  const [currentDate, setCurrentDate] = useState(new Date());
  const { userInfo, isSuccess, isLoading } = useSelector(
    (state) => state.login.loginPage
  );

  const commitChanges = ({ added, changed, deleted }) => {
    console.log({ added, changed, deleted });
    if (added) {
      const startingAddedId =
        appointmentsList.length > 0
          ? appointmentsList[appointmentsList.length - 1].id + 1
          : 0;
      appointmentsList = [
        ...appointmentsList,
        { id: startingAddedId, ...added },
      ];
      console.log("add");
    }

    if (changed) {
      console.log("changedx");
      appointmentsList = appointmentsList.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
      //update change:
    }
    if (deleted !== undefined) {
      appointmentsList = appointmentsList.filter(
        (appointment) => appointment.id !== deleted
      );
    }

    setAppointments(appointmentsList);
  };
  return (
    <div className="profile_contianer">
      {isLoading ? (
        <Spin />
      ) : (
        <div>
          <Row style={{ marginBottom: "10px" }}>
            <Avatar size={50}>{userInfo.username}</Avatar>
            <div className="center_text">
              <span>Welcome,</span>
              <span>{userInfo.name}</span>
            </div>
          </Row>
          <Row align="middle">
            <MailOutlined />
            <span className="center_text">{userInfo.email}</span>
          </Row>
          <Row
            align="middle"
            style={{ marginBottom: "10px", backgroundColor: "burlywood" }}
          >
            <CalendarOutlined />
            <span className="center_text">Your Today's Appointments</span>
          </Row>
          <Scheduler data={appointmentsList}>
            <ViewState currentDate={currentDate} />
            <EditingState onCommitChanges={commitChanges} />
            <IntegratedEditing />
            <DayView startDayHour={9} endDayHour={14} />
            <ConfirmationDialog />
            <Appointments />
            <AppointmentTooltip showOpenButton showDeleteButton />
            <AppointmentForm />
            <DragDropProvider />
          </Scheduler>
        </div>
      )}
    </div>
  );
}
