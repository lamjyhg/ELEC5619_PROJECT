import { Button, Col, Modal, Row, Table, Tooltip } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import { useEffect } from 'react';
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
    key: '1',
    gymName: 'A',
    userName: 'a',
    startTime: '1',
    duration: '1',
    status: '1',
    note: '11fhfdshsfhdsjdgjshdjhsdkhhdhjkadhkjahdkhakjhdjkahjkhjkahkjdhahdahdkahkdhkahkdahkdhkahkdhakhkhakhdkah',
  },
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
    key: '1',
    gymName: 'A',
    userName: 'a',
    startTime: '1',
    duration: '1',
    status: '1',
    note: '11fhfdshsfhdsjdgjshdjhsdkhhdhjkadhkjahdkhakjhdjkahjkhjkahkjdhahdahdkahkdhkahkdahkdhkahkdhakhkhakhdkah',
  },
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
    key: '1',
    gymName: 'A',
    userName: 'a',
    startTime: '1',
    duration: '1',
    status: '1',
    note: '11fhfdshsfhdsjdgjshdjhsdkhhdhjkadhkjahdkhakjhdjkahjkhjkahkjdhahdahdkahkdhkahkdahkdhkahkdhakhkhakhdkah',
  },
];

const GymOwnerAppointmentManagementTable = () => {
  useEffect(() => {}, []);
  const [cancelledId, setCancelledId] = useState(null);

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

  const handleOk = () => {
    //cancel appointment
    setCancelledId(null);
  };

  const handleCancel = () => {
    setCancelledId(null);
  };

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
