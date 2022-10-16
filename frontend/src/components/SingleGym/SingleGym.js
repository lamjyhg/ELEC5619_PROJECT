import { Avatar, Modal, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import temp_gym from '../../image/temp_gym_img.jpg';
import SingleGymMap from './SingleGymMap/SingleGymMap';
import { EditFilled } from '@ant-design/icons';
import { Button, Form, Input, notification, Select, TreeSelect } from 'antd';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { handleRequestToCreateAppointment } from '../../services/appointments';
import { handleActionToGetCurrentUser } from '../../state/currentUser/currentUser.action';
import { handleActionToGetSingleGym } from '../../state/gyms/singleGym.action';
import {
  handleActionToGetReviews,
  handleActionToSubmitReview,
} from '../../state/Review/review.action';
import { baseURL } from '../../utils/request';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import './SingleGym.scss';
import { handleActionToGetGymTimeAvailability } from '../../state/gyms/gyms.action';
import { handleRequestToGetGymTimeAvailability } from '../../services/gyms';

import Lottie from 'lottie-react';
import './SingleGym.scss';
import error from '../../image/lotties/errorPage.json';
import privateGym from '../../image/lotties/private.json';
import { Space, Spin } from 'antd';
import moment from 'moment';
import { days } from '../../utils/dateHandlers';
const { TextArea } = Input;

const SingleGym = () => {
  const { gym, isSuccess, isError, isLoading } = useSelector(
    (state) => state.singleGym.singleGym
  );
  const { reviewList } = useSelector((state) => state.reviews.reviewPage);

  const { currentUser } = useSelector(
    (state) => state.currentUser.currentUserPage
  );

  const dispatch = useDispatch();
  const { GID } = useParams();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [note, setNote] = useState();

  const [nameMsg, setNameMsg] = useState(null);
  const [emailMsg, setEmailMsg] = useState(null);
  const [dateMsg, setDateMsg] = useState(null);
  const [timeMsg, setTimeMsg] = useState(null);

  const [week, setWeek] = useState('this');
  const [star, setStar] = useState(3);
  const [comment, setComment] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  let dateNow = Date.now();

  let dateObj = new Date(dateNow);
  let day = dateObj.getDate();
  let month = dateObj.getMonth() + 1;
  let year = dateObj.getFullYear();

  // prints date & time in YYYY-MM-DD format
  const dateString = ' ' + year + '/' + month + '/' + day;

  const showModal = () => {
    if (!currentUser || !currentUser.id) {
      navigate('/login', { replace: true });
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const UID = currentUser.id;

    const handleCreateReview = async () => {
      await dispatch(handleActionToSubmitReview({ star, comment, GID, UID }));
    };

    handleCreateReview();

    setIsModalOpen(false);
  };

  const handleCancel = () => {

    setIsModalOpen(false);
  };

  const onStarChange = (e) => {
    setStar(e);
  };

  const onCommentChange = (e) => {
    setComment(e.target.value);
  };

  const submitAppointment = () => {
    const application = {
      gymId: gym.id,
      customerName: name,
      customerEmail: email,
      startTime: time,
      note,
    };
  };

  useEffect(() => {
    const handleGetReview = async () => {
      await dispatch(handleActionToGetReviews({ GID }));
    };

    handleGetReview();
  }, [isModalOpen]);

  const desc = [1, 2, 3, 4, 5];

  const showComments = () => {
    const component = [];

    if (reviewList) {
      const len = reviewList.length;
      for (let i = 0; i < len; i++) {
        const singleGym = reviewList[i];

        const src = 'https://joeschmoe.io/api/v1/' + singleGym.username;
        component.push(
          <div className="single_review">
            <div className="single_review_header">
              <div className="user_id">
                <Avatar src={src}></Avatar>
                {singleGym.username}, {singleGym.date}
              </div>

              <Rate allowHalf disabled defaultValue={singleGym.rating} />
            </div>

            <div className="single_review_body">{singleGym.comment}</div>

            <div className="line" />
          </div>
        );
      }
    }
    return component;
  };

  const TimeMap = {
    0: 'Monday',
    1: 'Tuesday',
    2: 'Wednesday',
    3: 'Thursday',
    4: 'Friday',
    5: 'Saturday',
    6: 'Sunday',
  };

  const dayValueMap = {
    Monday: 'mon',
    Tuesday: 'tue',
    Wednesday: 'wed',
    Thursday: 'thu',
    Friday: 'fri',
    Saturday: 'sat',
    Sunday: 'sun',
  };

  useEffect(() => {
    const handleGetGym = async (GID) => {
      await dispatch(handleActionToGetSingleGym(GID));
    };

    const handleGetCurrentUser = async () => {
      await dispatch(handleActionToGetCurrentUser());
    };

    handleGetGym(GID);
    handleGetCurrentUser();
  }, []);

  const changeWeek = (opt) => {
    setWeek(opt);
  };
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const showAppointmnetModal = () => {
    setIsAppointmentModalOpen(true);
  };
  const getTimeAvailability = async (gymId, startTime, endTime) => {
    await dispatch(
      handleActionToGetGymTimeAvailability({
        id: gymId,
        body: {
          startTime,
          endTime,
        },
      })
    );
  };
  const onCreate = (values) => {
    const date = values.date.format('YYYY-MM-DD');
    const startTime = values.startTime;

    const endTime = moment(startTime, 'hh:ss').add(1, 'hours').format('hh:ss');

    // getTimeAvailability(GID, startTime, endTime);

    handleRequestToCreateAppointment({
      ...values,
      startTimeString: `${date} ${startTime}`,
      endTimeString: `${date} ${endTime}`,
      gymId: GID,
    })
      .then((res) => {
        notification.success({
          message: 'Success',
          description: 'Appointment created.',
        });
        setIsAppointmentModalOpen(false);
      })
      .catch((error) => {
        notification.error({
          message: 'Failed',
          description: 'Appointment created failed',
        });
      });
  };

  const getTradingHours = (tradingHours) => {
    if (!tradingHours || Object.keys(tradingHours).length <= 0) {
      return <p>coming soon</p>;
    }

    const component = [];

    for (const key in tradingHours){

      if(tradingHours.hasOwnProperty(key)){
          const day = TimeMap[key];
          const startTime = tradingHours[key].startTime;
          const endTime = tradingHours[key].endTime;
          const res = <div> {day} : {startTime} - {endTime}</div>;
          component.push(res);
      }
    }


    return component;
  };

  const navigateToGymList = () => {
    navigate('/gyms');
  };

  if (isError) {
    return (
      <div className="errorPage">
        <h1>This gym does not exist!</h1>
        <Lottie animationData={error} />
        <Button type="primary" shape="round" onClick={navigateToGymList}>
          Gym list
        </Button>
      </div>
    );
  }

  if (isSuccess) {
    if (gym.gymStatus === 'PRIVATE') {
      return (
        <div className="errorPage">
          <h1>This gym is currently private!</h1>
          <Lottie animationData={privateGym} />
          <Button type="primary" shape="round" onClick={navigateToGymList}>
            Gym list
          </Button>
        </div>
      );
    }

    if (isSuccess) {
      if (gym.gymStatus === 'PRIVATE') {
        return (
          <div className="errorPage">
            <h1>This gym is currently private!</h1>
            <Lottie animationData={privateGym} />
            <Button type="primary" shape="round" onClick={navigateToGymList}>
              Gym list
            </Button>
          </div>
        );
      }

      const treeData = [];
      const today = new Date();
      const day = today.getDay() - 1;
      const currentDayString = day.toString();

      var id = 1;
      for (const key in gym.tradingHours) {
        if (week === 'this' && day >= key) {
          continue;
        }

        const timeChild = [];

        const dayName = TimeMap[key.toString()];
        const dayValue = dayValueMap[dayName];
        const hours = gym.tradingHours[key.toString()];
        const startTime = hours['startTime'].split(':')[0];
        const endTime = hours['endTime'].split(':')[0];

        for (let i = startTime; i < endTime; i++) {
          const time = i.toString() + ':00';
          const child = { title: time, value: i };
          timeChild.push(child);
          id += 1;
        }

        treeData.push({
          title: dayName,
          value: dayValue,
          disabled: true,
          children: timeChild,
        });
      }

      return (
        <div className="single_gym_container">
          <AppointmentForm
            gymId={GID}
            tradingHours={gym.tradingHours}
            open={isAppointmentModalOpen}
            onCancel={() => {
              setIsAppointmentModalOpen(false);
            }}
            onCreate={onCreate}
            acitonType={'CREATE'}
            gym={gym}
          />
          <div className="top_container">
            <div className="left_info_area">
              <div className="info_title">{gym.name}</div>

              {/*<div className="large_size_info">*/}
              {/*    $110 - $3000*/}
              {/*</div>*/}

              <div className="large_size_info">
                Number of appointments: {gym.maximumOfAppointments}
              </div>

              <div className="middle_size_info">Location: {gym.address}</div>


                <div className="other_container">
                  <div className="description_wrapper" style={{marginTop:"0"}}>
                      <div className="small_size_info">{gym.description}</div>
                  </div>


                  <div className="vertical_wrapper">
                      <div className="tradingHours">
                          {getTradingHours(gym.tradingHours)}
                      </div>


                      <Button type="primary" onClick={showAppointmnetModal}>
                          Make Appointment
                      </Button>
                  </div>
                </div>
              </div>




            <div className="right_image_area">
              <div className="mid_img">
                <img
                  className="large_img"
                  src={gym.imageUrl ? baseURL + gym.imageUrl : temp_gym}
                />
              </div>
            </div>
          </div>

          <div className="bot_container">
            <div className="small_map">
              <SingleGymMap
                geoLocation={gym.geoLocation}
                gymsList={[gym]}
              ></SingleGymMap>
            </div>

            <div className="review_container">
              <div className="review_header">
                <div>Reviews</div>
                <div className="write_comment" onClick={showModal}>
                  <EditFilled />
                  Write comments
                </div>
              </div>

              {/*<div className="line"/>*/}

              <div className="review_body">{showComments()}</div>
            </div>

            <Modal
              className="comment_modal"
              title="Write your comment"
              visible={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div className="single_review_header">
                <div className="user_id">
                  <Avatar src={'https://joeschmoe.io/api/v1/x'}></Avatar>
                  {currentUser ? currentUser.username : '-'}, {dateString}
                </div>

                <Rate tooltips={desc} onChange={onStarChange} value={star} />
              </div>

              <div className="comment_space" onChange={onCommentChange}>
                <TextArea rows={4} placeholder="Put your comment here ..." />
              </div>
            </Modal>
          </div>
        </div>
      );
    }
  }
};
export default SingleGym;

// <div className="side_floater">
//           <div className="appointment_box">
//             <div className="appointment_title">Make an appointment</div>

//             <div className="short_line"></div>

//             <Form
//               labelCol={{
//                 span: 6,
//               }}
//               wrapperCol={{
//                 span: 14,
//               }}
//               layout="horizontal"
//             >
//               <Form.Item
//                 label="Name"
//                 id="name"
//                 name="name"
//                 rules={[{ required: true, message: 'Name cannot be empty!' }]}
//               >
//                 <Input
//                   onChange={(evt) => {
//                     setName(evt.target.value);
//                   }}
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Email"
//                 name="email"
//                 id="email"
//                 rules={[{ required: true, message: 'Email cannot be empty!' }]}
//               >
//                 <Input
//                   onChange={(evt) => {
//                     setEmail(evt.target.value);
//                   }}
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Week:"
//                 name="week"
//                 rules={[{ required: true, message: 'Week cannot be empty!' }]}
//               >
//                 <Select defaultValue="this" id="week" onChange={changeWeek}>
//                   <Select.Option value="this">This week</Select.Option>
//                   <Select.Option value="next">Next week</Select.Option>
//                 </Select>
//               </Form.Item>

//               <Form.Item
//                 label="Time:"
//                 id="time"
//                 name="time"
//                 rules={[{ required: true, message: 'Time cannot be empty!' }]}
//               >
//                 <TreeSelect
//                   onChange={(value) => {
//                     setTime(value);
//                   }}
//                   treeData={treeData}
//                   getPopupContainer={(trigger) => trigger.parentNode}
//                 />
//               </Form.Item>

//               <Form.Item label="Note" id="note">
//                 <TextArea
//                   rows={4}
//                   onChange={(evt) => {
//                     setNote(evt.target.value);
//                   }}
//                 />
//               </Form.Item>

//               <Form.Item label="Submit">
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   onClick={submitAppointment}
//                 >
//                   Submit
//                 </Button>
//               </Form.Item>
//             </Form>
//           </div>
//         </div>
