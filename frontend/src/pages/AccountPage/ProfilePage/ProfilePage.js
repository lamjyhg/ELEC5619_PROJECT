import {
  EditingState,
  IntegratedEditing,
  ViewState,
} from '@devexpress/dx-react-scheduler';
import {
  AppointmentTooltip,
  AppointmentForm,
  Appointments,
  ConfirmationDialog,
  DayView,
  Scheduler,
  DateNavigator,
  DragDropProvider,
  Toolbar,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Avatar, notification, Row, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { CalendarOutlined, MailOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import './ProfilePage.scss';
import { handleActionToGetUserAppointments } from '../../../state/appointments/appointments.action.js';
import { handleRequestToUpdateAppointment } from '../../../services/appointments.js';
import moment from 'moment';
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

  const { userAppointments } = useSelector((state) => state.appointments);
  let [appointmentsList, setAppointments] = useState();
  const [changedAppointment, setChangedAppointment] = useState();
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    //fetch all appointment create by user
    dispatch(handleActionToGetUserAppointments());
  }, []);

  useEffect(() => {
    setAppointments(
      processData(
        userAppointments.appointmentList.filter(
          (each) => each.status === 'PROCESSING'
        )
      )
    );
  }, [userAppointments]);

  useEffect(() => {
    if (changedAppointment) {
      //update change:
      const requestData = {
        id: changedAppointment.id,
        startTime: moment(changedAppointment.startDate).format(
          'YYYY-MM-DD HH:mm:ss'
        ),
        endTime: moment(changedAppointment.endDate).format(
          'YYYY-MM-DD HH:mm:ss'
        ),
      };
      handleRequestToUpdateAppointment(requestData)
        .then(() => {
          notification.success({
            message: 'Updated',
            description: 'Appointment updated.',
          });
        })
        .catch((error) => {
          notification.success({
            message: 'Fail',
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
    <div className="profile_contianer">
      {isLoading ? (
        <Spin />
      ) : (
        <div>
          <Row style={{ marginBottom: '10px' }}>
            <Avatar size={50}>{userInfo.username}</Avatar>
            <div className="center_text">
              <span>Welcome</span>
              <span>,{userInfo.name}</span>
            </div>
          </Row>
          <Row align="middle">
            <MailOutlined />
            <span className="center_text">{userInfo.email}</span>
          </Row>
          <Row
            align="middle"
            style={{ marginBottom: '10px', backgroundColor: 'burlywood' }}
          >
            <CalendarOutlined />
            <span className="center_text">Your Today's Appointments</span>
          </Row>
          <Scheduler data={appointmentsList}>
            <ViewState
              currentDate={currentDate}
              onCurrentDateChange={setCurrentDate}
            />
            <EditingState onCommitChanges={commitChanges} />
            <IntegratedEditing />
            <Toolbar />
            <DateNavigator />
            <DayView startDayHour={0} endDayHour={24} />
            <Appointments />
          </Scheduler>
        </div>
      )}
    </div>
  );
}
