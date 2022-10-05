import { Button, Spin, Table, Tooltip, notification, Tag } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleActionToCancelAppointmentByGymOwner,
  handleActionToGetGymsAppointmentsByGymOwner,
} from '../../state/appointments/appointments.action';
import GymOwnerAppointmentCancellationForm from './GymOwnerAppointmentCancellationForm/GymOwnerAppointmentCancellationForm';
import './GymOwnerAppointmentManagementTable.scss';

const GymOwnerAppointmentManagementTable = () => {
  const [cancelledAppointment, setCancelledAppointment] = useState(null);
  const [comment, setComment] = useState('');

  const { appointmentList, isError, isLoading, isSuccess } = useSelector(
    (state) => {
      return state.appointments.gymOwner;
    }
  );

  if (isError) {
    notification['error']({
      message: 'Notification Title',
      description: 'There is error in this page ',
    });
  }

  const dispatch = useDispatch();

  const columns = [
    { title: 'Gym Name', dataIndex: 'gymName', key: 'gymName' },
    { title: 'Customer Name', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Start Time', dataIndex: 'startTime', key: 'startTime' },
    { title: 'Duration', dataIndex: 'duration', key: 'duration' },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      render: (note) => (
        <Tooltip placement="left" title={note}>
          {note}
        </Tooltip>
      ),
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        var color = 'yellow';
        switch (status) {
          case 'COMPLETED':
            color = 'green';
            break;
          case 'CANCELLED':
            color = 'red';
            break;
          default:
            color = 'yellow';
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },

    {
      title: 'Actions',
      key: 'action',
      render: (_, record) =>
        record.status === 'CANCELLED' ? null : (
          <Button onClick={() => setCancelledAppointment(record)}>
            Cancel{' '}
          </Button>
        ),
    },
  ];

  const handleChangeCommentValue = (e) => {
    setComment(e.target.value);
  };

  const handleConfirmCancellation = async () => {
    //cancel appointment
    await dispatch(
      handleActionToCancelAppointmentByGymOwner({
        cancelledId: cancelledAppointment.id,
        comment,
      })
    );
    setCancelledAppointment(null);
    setComment('');
  };

  const handleCancelCancellatin = () => {
    setCancelledAppointment(null);
    setComment('');
  };

  useEffect(() => {
    const getAppointments = async () => {
      await dispatch(handleActionToGetGymsAppointmentsByGymOwner());
    };

    getAppointments();
  }, []);

  return (
    <Spin spinning={isLoading}>
      <div className="appointmentsPage-owner">
        <GymOwnerAppointmentCancellationForm
          cancelledAppointment={cancelledAppointment}
          handleConfirmCancellation={handleConfirmCancellation}
          handleCancelCancellatin={handleCancelCancellatin}
          comment={comment}
          handleChangeCommentValue={handleChangeCommentValue}
        ></GymOwnerAppointmentCancellationForm>
        <Table
          pagination={{ pageSize: 8 }}
          columns={columns}
          dataSource={appointmentList}
          className="appointmentsTable-owner"
        />
      </div>
    </Spin>
  );
};

export default GymOwnerAppointmentManagementTable;
