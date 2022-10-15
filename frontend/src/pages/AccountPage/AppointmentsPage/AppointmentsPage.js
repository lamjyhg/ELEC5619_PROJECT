import {
  EditingState,
  IntegratedEditing,
  ViewState,
} from '@devexpress/dx-react-scheduler';
import {
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  ConfirmationDialog,
  DateNavigator,
  MonthView,
  Scheduler,
  Toolbar,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Modal, notification, Spin } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import { useEffect } from 'react';
import {
  handleRequestToCancelAppointmentByGymOwner,
  handleRequestToUpdateAppointment,
  handleRequestToUpdateAppointmentStatusByUser,
} from '../../../services/appointments.js';
import {
  handleActionToGetUserAppointments,
  handleActionToUpdateAppointmentStatusByUser,
} from '../../../state/appointments/appointments.action.js';
import { PUT } from '../../../constants/requests';
import { SmileTwoTone } from '@ant-design/icons';

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

export default function AppointmentsPage() {
  const dispatch = useDispatch();
  const { userAppointments } = useSelector((state) => state.appointments);
  const { isLoading, isSuccess, isError } = userAppointments;
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

  const commitChanges = async ({ added, changed, deleted }) => {
    var newAppointmentsList = appointmentsList;
    if (added) {
      const startingAddedId =
        newAppointmentsList.length > 0
          ? newAppointmentsList[newAppointmentsList.length - 1].id + 1
          : 0;
      newAppointmentsList = [
        ...newAppointmentsList,
        { id: startingAddedId, ...added },
      ];
    }
    if (changed) {
      newAppointmentsList = newAppointmentsList.map((appointment) => {
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
      try {
        await handleRequestToUpdateAppointmentStatusByUser(
          deleted,
          'CANCELLED'
        );
        newAppointmentsList = appointmentsList.filter(
          (appointment) => appointment.id !== deleted
        );
        setAppointments(newAppointmentsList);
        notification.destroy();
        notification['success']({
          message: 'Success',
          description: 'Update successfully ',
        });
      } catch (error) {
        notification.destroy();
        notification['error']({
          message: 'Error',
          description: 'Update failed since system error, please try again',
        });
      }
    }
    setAppointments(newAppointmentsList);
  };

  const cancelAppointment = async (id) => {
    await dispatch(
      handleActionToUpdateAppointmentStatusByUser({
        id: id,
        status: 'CANCELLED',
      })
    );
  };

  return (
    <>
      <Spin spinning={isLoading}>
        <Scheduler data={appointmentsList}>
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={setCurrentDate}
          />
          <Modal open={cancelAppointment}></Modal>
          <EditingState onCommitChanges={commitChanges} />
          <IntegratedEditing />

          <Toolbar />
          <DateNavigator />
          <MonthView startDayHour={0} endDayHour={24} />

          <Appointments />
          <AppointmentTooltip showDeleteButton />
          <AppointmentForm />
        </Scheduler>
      </Spin>
    </>
  );
}
