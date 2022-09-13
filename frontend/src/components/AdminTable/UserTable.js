import { Space, Table, Tag } from 'antd';
import React, { useState } from 'react';

// table header
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = 'green';
          if (tag === 'gym owner') {
            color = 'volcano';
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
    render: (_, record) => (
      <Space size="large">
        <a>Invite</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

// generate user list
const data1 = [];
let len = 50;
while(len--) {
  data1.unshift({
    id: len,
    key: len,
    name: 'user' + len,
    email: 'test' + len +' @gmail.com',
    tags: ['normal user'],
  })
}

// function
function UserTable () {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // row selection can be found at the top left of the table
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return <Table dataSource={data1} columns={columns} rowSelection={rowSelection} pagination={{ pageSize: 8 }}/> ;
  
  
}

export default UserTable;