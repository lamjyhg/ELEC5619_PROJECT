import { Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {handleActionToGetAllGymApplication} from "../../state/gyms/gyms.action";
import {handleActionToGetUser} from "../../state/user/user.action";

// generate user list
const data1 = [];
let len = 50;
while(len--) {
  data1.unshift({
    id: len,
    key: len,
    time: Date(),
    title: 'title' + len,
    tags: ['Solved'],
})
}
data1.push({ id: 50, key: 50, time:  Date(), title: 'DAO BI LE', tags: ['Unsolved'],})

// function
function RequestTable () {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { gymsList, isSuccess, isLoading, isError } = useSelector(
      (state) => state.gyms.gymsPage
  );

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleView = (item) => {
    console.log("id is " + item.id);
    navigate("/admin/gymRequests/"+item.id);
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'time',
      dataIndex: 'time',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'tags',
      render: (_, { tags }) => (
          <>
            {tags.map((tag) => {
              let color = 'green';
              if (tag === 'Unsolved') {
                color = 'red';
              }

              return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
              );
            })}
          </>
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
            <a>Approve</a>
            <a>Decline</a>
            <a>Remove</a>
          </Space>
      ),
    },
  ];

  // row selection can be found at the top left of the table
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    const getAllRequest = async () => {
      await dispatch(handleActionToGetAllGymApplication());
    }

    getAllRequest();
  } , []);

  if(isSuccess){
    console.log("all request is ");
    console.log(gymsList);
  }

  return <Table dataSource={data1} columns={columns} rowSelection={rowSelection} pagination={{ pageSize: 8 }}/> ;
  
  
}

export default RequestTable;