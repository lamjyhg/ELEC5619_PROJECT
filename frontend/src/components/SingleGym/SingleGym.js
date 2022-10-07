import React, { useEffect, useState } from 'react';
import './SingleGym.scss';
import temp_gym from '../../image/temp_gym_img.jpg';
import { Avatar, Rate, Modal } from 'antd';

import { EditFilled } from '@ant-design/icons';

import 'antd/dist/antd.css';
import { Form, Input, Button, DatePicker, TreeSelect, Select } from 'antd';
import GymsMap from '../GymsMap/GymsMap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleActionToGetSingleGym } from '../../state/gyms/singleGym.action';
import { handleLoginRequest } from '../../state/auth/login.action';
import {
  handleActionToGetReviews,
  handleActionToSubmitReview,
} from '../../state/Review/review.action';
import SingleGymMap from './SingleGymMap/SingleGymMap';
const { TextArea } = Input;

const SingleGym = () => {
  const { gym, isSuccess, isLoading, isError } = useSelector(
    (state) => state.singleGym.singleGym
  );

  const { reviewList, isSuc, isLod, isErr } = useSelector(
    (state) => state.reviews.reviewPage
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const UID = '0a8df40e-3995-40d9-8678-c0a522cdd37d';

    const handleCreateReview = async () => {
      await dispatch(handleActionToSubmitReview({ star, comment, GID, UID }));
    };

    handleCreateReview();

    setIsModalOpen(false);
    window.location.reload();
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

  const submitAppointment = () => {};

  useEffect(() => {
    const handleGetReview = async () => {
      await dispatch(handleActionToGetReviews({ GID }));
    };

    handleGetReview();
  }, [isModalOpen]);

  const desc = [1, 2, 3, 4, 5];

  const showComments = () => {
    const component = [];

    reviewList.map((singleGym) => {
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
    });

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

    handleGetGym(GID);
  }, []);

  const changeWeek = (opt) => {
    setWeek(opt);
  };

  if (isSuc) {
    console.log(reviewList);
  }

  if (isSuccess) {
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
        const child = { title: time, value: key + ' ' + i.toString() };
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

            <div className="description_wrapper">
              <div className="small_size_info">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                congue, leo sed cursus tincidunt, ex metus pellentesque orci,
                vel consectetur quam lectus eget tellus. Nulla congue molestie
                quam at iaculis. Maecenas libero ex, ultricies eget ipsum sit
                amet, feugiat ul lamcorper ex. Cras ullamcorper massa in felis
                rhoncus porttitor. Pellen tesque habitant morbi tristique
                senectus et netus et malesuada fames ac turpis egestas. Praesent
                mollis, nunc id consequat malesuada, nulla metus eleifend metus,
              </div>
            </div>
          </div>

          <div className="right_image_area">
            <div className="mid_img">
              <img className="large_img" src={temp_gym} />
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
                <Avatar src="https://joeschmoe.io/api/v1/x"></Avatar>
                yutong wang, 2022/02/12
              </div>

              <Rate tooltips={desc} onChange={onStarChange} value={star} />
            </div>

            <div className="comment_space" onChange={onCommentChange}>
              <TextArea rows={4} placeholder="Put your comment here ..." />
            </div>
          </Modal>
        </div>

        <div className="side_floater">
          <div className="appointment_box">
            <div className="appointment_title">Make an appointment</div>

            <div className="short_line"></div>

            <Form
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
            >
              <Form.Item
                label="Name"
                id="name"
                name="name"
                rules={[{ required: true, message: 'Name cannot be empty!' }]}
              >
                <Input
                  onChange={(evt) => {
                    setName(evt.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                id="email"
                rules={[{ required: true, message: 'Email cannot be empty!' }]}
              >
                <Input
                  onChange={(evt) => {
                    setEmail(evt.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Week:"
                name="week"
                rules={[{ required: true, message: 'Week cannot be empty!' }]}
              >
                <Select defaultValue="this" id="week" onChange={changeWeek}>
                  <Select.Option value="this">This week</Select.Option>
                  <Select.Option value="next">Next week</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Time:"
                id="time"
                name="time"
                rules={[{ required: true, message: 'Time cannot be empty!' }]}
              >
                <TreeSelect
                  onChange={(value) => {
                    setTime(value);
                  }}
                  treeData={treeData}
                  getPopupContainer={(trigger) => trigger.parentNode}
                />
              </Form.Item>

              <Form.Item label="Note" id="note">
                <TextArea
                  rows={4}
                  onChange={(evt) => {
                    setNote(evt.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item label="Submit">
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={submitAppointment}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
};

export default SingleGym;
