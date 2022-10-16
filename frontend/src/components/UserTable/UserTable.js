import { Space, Table, Tag, Modal, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  handleActionToDeleteUser,
  handleActionToGetAllUsers,
} from '../../state/user/user.action';

function UserTable() {
  const { users, isSuccess, isLoading, isError } = useSelector(
    (state) => state.user.userList
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showModal = (email) => {
    setIsModalOpen(true);
    setUserEmail(email);
  };

  const handleOk = () => {
    submit(userEmail);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let data1 = [];

  const columns = [
    {
      title: 'Index',
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
            if (tag === 'OWNER') {
              color = 'volcano';
            } else if (tag === 'ADMIN') {
              color = 'yellow';
            } else if (tag === 'unset') {
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
      render: (_, { email }) => (
        <Space size="large">
          <a onClick={() => handleEdit(email)}>Edit</a>
        </Space>
      ),
    },
  ];

  const handleEdit = (email) => {
    navigate('/admin/userManagement/edit/' + email);
  };
  const submit = (email) => {
    const selectedUser = {
      email: email,
    };

    const handleDelete = async () => {
      await dispatch(handleActionToDeleteUser(selectedUser));
    };
    handleDelete();
    setTimeout(function () {
      setIsModalOpen(false);
      setCount((count) => count + 1);
    }, 1000);
  };

  const fetchAllUsers = async () => {
    await dispatch(handleActionToGetAllUsers());
  };

  useEffect(() => {
    fetchAllUsers();
  }, [count]);

  if (isSuccess) {
    let len = users.length - 1;
    for (let index = 0; index < users.length; index++) {
      data1.push({
        id: index + 1,
        key: index,
        name: 'user' + users[index].username,
        email: users[index].email,
        tags: [users[index].type],
      });
    }
  }

  return (
    <>
      <Modal
        title="Confirmation"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure to delete user? </p>
      </Modal>
      <Table
        className="table-users"
        dataSource={data1}
        columns={columns}
        pagination={{ pageSize: 8 }}
      />
    </>
  );
}

export default UserTable;
