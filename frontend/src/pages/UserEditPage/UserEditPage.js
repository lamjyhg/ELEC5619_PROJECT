import {
  Button,
  Col,
  Input,
  Layout,
  notification,
  Row,
  Select,
  Space,
  Spin,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import EditUserBody from '../../components/EditUserBody/EditUserBody';
import { handleActionToGetUser } from '../../state/user/user.action';
import './UserEditPage.scss';

function UserEditPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, isSuccess, isLoading, isError } = useSelector(
    (state) => state.user.user
  );

  const { id } = useParams();
  const [type, setType] = useState('');

  useEffect(() => {
    const getUser = async () => {
      await dispatch(handleActionToGetUser(id));
    };
    getUser();
  }, []);

  return (
    <>
      {isLoading ? <Spin></Spin> : <EditUserBody user={users}></EditUserBody>}
    </>
  );
}
export default UserEditPage;
