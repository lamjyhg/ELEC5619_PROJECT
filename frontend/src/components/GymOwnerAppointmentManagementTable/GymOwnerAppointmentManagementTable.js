import { Button, Spin, Table, Tooltip, notification, Tag } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleActionToCancelAppointmentByGymOwner,
  handleActionToGetGymsAppointmentsByGymOwner,
} from '../../state/appointments/appointments.action';
import { displayDate } from '../../utils/dateHandlers';
import GymOwnerAppointmentCancellationForm from './GymOwnerAppointmentCancellationForm/GymOwnerAppointmentCancellationForm';
import './GymOwnerAppointmentManagementTable.scss';

const GymOwnerAppointmentManagementTable = () => {
  const [cancelledAppointment, setCancelledAppointment] = useState(null);
  const [comment, setComment] = useState('');

  const { appointmentList, isError, isLoading, isSuccess, cancel } =
    useSelector((state) => {
      return state.appointments.gymOwner;
    });

  const dispatch = useDispatch();

  const columns = [
    { title: 'Gym Name', dataIndex: 'gymName', key: 'gymName' },
    { title: 'Customer Name', dataIndex: 'customerName', key: 'customerName' },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (startTime) => displayDate(startTime),
      sorter: (a, b) => moment(a.startTime).unix() - moment(b.startTime).unix(),
      defaultSortOrder: 'ascend',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (endTime) => displayDate(endTime),
      sorter: (a, b) => moment(a.endTime).unix() - moment(b.endTime).unix(),
      defaultSortOrder: 'ascend',
    },
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
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.status.includes(value),
      filters: [
        {
          text: 'completed',
          value: 'COMPLETED',
        },
        {
          text: 'cancelled',
          value: 'CANCELLED',
        },
        {
          text: 'processing',
          value: 'PROCESSING',
        },
      ],
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
    if (cancel.isLoading) {
      return;
    }
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
    if (cancel.isLoading) {
      return;
    }
    setCancelledAppointment(null);
    setComment('');
  };

  useEffect(() => {
    const getAppointments = async () => {
      await dispatch(handleActionToGetGymsAppointmentsByGymOwner());
    };

    getAppointments();
  }, []);

  useEffect(() => {
    if (isError) {
      notification.destroy();
      notification['error']({
        message: 'Error',
        description: 'There is error to get appointments ',
      });
    }

    if (cancel.isError) {
      notification.destroy();
      notification['error']({
        message: 'Error',
        description: 'Cancel failed ',
      });
    }

    if (cancel.isSuccess) {
      notification.destroy();
      notification['success']({
        message: 'Success',
        description: 'Cancel Successfully ',
      });
    }
  }, [isError, cancel]);

  return (
    <Spin spinning={isLoading}>
      <div className="appointmentsPage-owner">
        <GymOwnerAppointmentCancellationForm
          cancelledAppointment={cancelledAppointment}
          handleConfirmCancellation={handleConfirmCancellation}
          handleCancelCancellatin={handleCancelCancellatin}
          comment={comment}
          isLoading={cancel.isLoading}
          handleChangeCommentValue={handleChangeCommentValue}
        ></GymOwnerAppointmentCancellationForm>
        <Table
          pagination={{ pageSize: 8 }}
          columns={columns}
          dataSource={appointmentList}
          className="appointmentsTable-owner"
          rowKey="id"
        />
      </div>
    </Spin>
  );
};

export default GymOwnerAppointmentManagementTable;
