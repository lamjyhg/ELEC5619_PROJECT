import { Space, Spin, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleActionToGetAllGymApplication } from '../../state/gyms/gyms.action';

function GymRequestsTable() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { gymsList, isSuccess, isLoading, isError } = useSelector(
    (state) => state.gyms.gymApp
  );
  let data1 = [];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleView = (item) => {
    navigate('/admin/gymRequests/' + item.gymID);
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Gym ID',
      dataIndex: 'gymID',
    },
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'time',
      dataIndex: 'time',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Status',
      dataIndex: 'tags',
      render: (_, { status }) => (
        <Tag color={'red'} key={status}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (_, { type }) => (
        <Tag color={'orange'} key={type}>
          {type}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (_, item) => (
        <Space size="large">
          <a onClick={() => handleView(item)}>View</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const getAllRequest = async () => {
      await dispatch(handleActionToGetAllGymApplication());
    };

    getAllRequest();
  }, []);

  if (isSuccess) {
    for (let index = 0; index < gymsList.length; index++) {
      data1.push({
        id: index + 1,
        gymID: gymsList[index].id,
        key: index,
        name: gymsList[index].name,
        time: gymsList[index].lastUpdatedTime,
        status: gymsList[index].gymApplicationStatus,
        type: gymsList[index].gymApplicationType,
      });
    }
  }

  return (
    <Spin spinning={isLoading}>
      <Table
        dataSource={data1}
        columns={columns}
        className="table-gymRequests"
        pagination={{ pageSize: 8 }}
      />
    </Spin>
  );
}

export default GymRequestsTable;
