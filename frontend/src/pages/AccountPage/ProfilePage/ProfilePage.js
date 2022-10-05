import { Avatar, Row, Spin } from "antd";
import { useSelector } from "react-redux";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";

import { MailOutlined, CalendarOutlined } from "@ant-design/icons";
import "./ProfilePage.scss";
import { appointments } from "../../../utils/appointmentsMock.js";
import { useState } from "react";
export default function ProfilePage() {
  const [appointmentsList, setAppointments] = useState(appointments);
  const [currentDate, setCurrentDate] = useState(new Date("2018-06-27"));
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
          <Scheduler data={appointments}>
            <ViewState currentDate={currentDate} />
            <EditingState onCommitChanges={commitChanges} />
            <DayView startDayHour={9} endDayHour={14} />
            <ConfirmationDialog />
            <Appointments />
            <AppointmentTooltip showOpenButton showDeleteButton />
            <AppointmentForm />
          </Scheduler>
        </div>
      )}
    </div>
  );
}
