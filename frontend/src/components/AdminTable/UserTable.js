import { Space, Table, Tag } from 'antd';
import React, {useEffect, useState} from 'react';
import {handleActionToGetSingleGym} from "../../state/gyms/singleGym.action";
import {useDispatch, useSelector} from "react-redux";
import {handleActionToGetAllUsers} from "../../state/user/user.action";
import {handleActionToDeleteUser} from "../../state/user/user.action";

// table header




// function
function UserTable () {
  const { users, isSuccess, isLoading, isError } = useSelector(
      (state) => state.user.userList
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const dispatch = useDispatch();
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  let data1 = [];

  // row selection can be found at the top left of the table
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
              else if(tag == 'unset'){
                color = 'grey';
              }

              return (
                  <Tag color={color} key={tag}>
                    {tag}
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
      render: (_, {email}) => (
          <Space size="large">
            <a onClick={() => submit(email)}>Delete</a>
          </Space>
      ),
    },
  ];

  const submit = (email) => {

    const selectedUser = {
      email: email,
    }
    console.log(email);

    const handleDelete = async () => {
      await dispatch(handleActionToDeleteUser(selectedUser));
    };

    handleDelete();
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const fetchAllUsers = async () => {
    await dispatch(handleActionToGetAllUsers());
  }

  useEffect( () => {
    fetchAllUsers();
  }, [])

  if (isSuccess) {
    let len = users.length - 1;
    for(let index = 0; index < users.length; index++){
      data1.push({
        id: index + 1,
        key: index,
        name: 'user' + users[index].username,
        email: users[index].email,
        tags: [users[index].type],
      })
    }
  }

  return (
      <Table dataSource={data1} columns={columns} rowSelection={rowSelection} pagination={{ pageSize: 8 }}/>
  )
  
  
}

export default UserTable;