import { Button, Col, Modal, Row, Table, Tooltip } from 'antd';
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

const data = [
  {
    key: '1',
    gymName: 'A',
    userName: 'a',
    startTime: '1',
    duration: '1',
    status: '1',
    note: '11fhfdshsfhdsjdgjshdjhsdkhhdhjkadhkjahdkhakjhdjkahjkhjkahkjdhahdahdkahkdhkahkdahkdhkahkdhakhkhakhdkah',
  },
  {
    key: '2',
    gymName: 'B',
    userName: 'a',
    startTime: '1',
    duration: '1',
    status: '1',
    note: '11fhfdshsfhdsjdgjshdjhsdkhhdhjkadhkjahdkhakjhdjkahjkhjkahkjdhahdahdkahkdhkahkdahkdhkahkdhakhkhakhdkah',
  },
  {
    key: '3',
    gymName: 'A',
    userName: 'a',
    startTime: '1',
    duration: '1',
    status: '1',
    note: '11fhfdshsfhdsjdgjshdjhsdkhhdhjkadhkjahdkhakjhdjkahjkhjkahkjdhahdahdkahkdhkahkdahkdhkahkdhakhkhakhdkah',
  },
  {
    key: '5',
    gymName: 'A',
    userName: 'a',
    startTime: '1',
    duration: '1',
    status: '1',
    note: '11fhfdshsfhdsjdgjshdjhsdkhhdhjkadhkjahdkhakjhdjkahjkhjkahkjdhahdahdkahkdhkahkdahkdhkahkdhakhkhakhdkah',
  },
  {
    key: '1dskl',
    gymName: 'A',
    userName: 'a',
    startTime: '1',
    duration: '1',
    status: '1',
    note: '11fhfdshsfhdsjdgjshdjhsdkhhdhjkadhkjahdkhakjhdjkahjkhjkahkjdhahdahdkahkdhkahkdahkdhkahkdhakhkhakhdkah',
  },
  {
    key: '1sbj',
    gymName: 'A',
    userName: 'a',
    startTime: '1',
    duration: '1',
    status: '1',
    note: '11fhfdshsfhdsjdgjshdjhsdkhhdhjkadhkjahdkhakjhdjkahjkhjkahkjdhahdahdkahkdhkahkdahkdhkahkdhakhkhakhdkah',
  },
  {
    key: '1djskj',
    gymName: 'A',
    userName: 'a',
    startTime: '1',
    duration: '1',
    status: '1',
    note: '11fhfdshsfhdsjdgjshdjhsdkhhdhjkadhkjahdkhakjhdjkahjkhjkahkjdhahdahdkahkdhkahkdahkdhkahkdhakhkhakhdkah',
  },
  {
    key: '1ds',
    gymName: 'A',
    userName: 'a',
    startTime: '1',
    duration: '1',
    status: '1',
    note: '11fhfdshsfhdsjdgjshdjhsdkhhdhjkadhkjahdkhakjhdjkahjkhjkahkjdhahdahdkahkdhkahkdahkdhkahkdhakhkhakhdkah',
  },
  {
    key: '1ssd',
    gymName: 'A',
    userName: 'a',
    startTime: '1',
    duration: '1',
    status: '1',
    note: '11fhfdshsfhdsjdgjshdjhsdkhhdhjkadhkjahdkhakjhdjkahjkhjkahkjdhahdahdkahkdhkahkdahkdhkahkdhakhkhakhdkah',
  },
];

const GymOwnerAppointmentManagementTable = () => {
  const [cancelledId, setCancelledId] = useState(null);

  const { appointmentList, isError, isLoading, isSuccess } = useSelector(
    (state) => {
      return state.appointments.gymOwner;
    }
  );

  const dispatch = useDispatch();

  const columns = [
    { title: 'Gym Name', dataIndex: 'gymName', key: 'gymName' },
    { title: 'User Name', dataIndex: 'userName', key: 'userName' },
    { title: 'Start Time', dataIndex: 'startTime', key: 'startTime' },
    { title: 'Duration', dataIndex: 'duration', key: 'duration' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
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
      title: 'Actions',
      dataIndex: 'key',
      key: 'action',
      render: (id) => (
        <Button onClick={() => setCancelledId(id)}>Cancel </Button>
      ),
    },
  ];

  const handleOk = async () => {
    //cancel appointment
    console.log(cancelledId);
    await dispatch(handleActionToCancelAppointmentByGymOwner(cancelledId));
    setCancelledId(null);
  };

  const handleCancel = () => {
    setCancelledId(null);
  };

  useEffect(() => {
    const getAppointments = async () => {
      await dispatch(handleActionToGetGymsAppointmentsByGymOwner());
    };

    getAppointments();
  }, []);

  return (
    <>
      <GymOwnerAppointmentCancellationForm
        cancelledId={cancelledId}
        handleOk={handleOk}
        handleCancel={handleCancel}
      ></GymOwnerAppointmentCancellationForm>
      <Table
        pagination={{ pageSize: 8 }}
        columns={columns}
        dataSource={data}
        className="appointmentsTable--owner"
      />
    </>
  );
};

export default GymOwnerAppointmentManagementTable;
