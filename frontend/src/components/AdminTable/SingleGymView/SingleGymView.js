import React, { useEffect, useState } from "react";
import "./SingleGymView.scss";
import temp_gym from "../../../image/temp_gym_img.jpg";

import { EditFilled } from "@ant-design/icons";

import "antd/dist/antd.css";
import { Form, Input, Button, DatePicker, TreeSelect, Select } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleActionToGetSingleGym } from "../../../state/gyms/singleGym.action";
import { current } from "@reduxjs/toolkit";
import SingleGymMapView from "./SingleGymViewMap/SingleGymViewMap";
import { baseURL } from "../../../utils/request";
const { TextArea } = Input;

const SingleGymView = ({ GID }) => {
  const { gym, isSuccess, isLoading, isError } = useSelector(
    (state) => state.singleGym.singleGym
  );

  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [note, setNote] = useState();

  const [nameMsg, setNameMsg] = useState(null);
  const [emailMsg, setEmailMsg] = useState(null);
  const [dateMsg, setDateMsg] = useState(null);
  const [timeMsg, setTimeMsg] = useState(null);

  const [week, setWeek] = useState("this");

  const TimeMap = {
    0: "Monday",
    1: "Tuesday",
    2: "Wednesday",
    3: "Thursday",
    4: "Friday",
    5: "Saturday",
    6: "Sunday",
  };

  const dayValueMap = {
    Monday: "mon",
    Tuesday: "tue",
    Wednesday: "wed",
    Thursday: "thu",
    Friday: "fri",
    Saturday: "sat",
    Sunday: "sun",
  };

  //const { GID } = useParams();

  const submit_appointment = () => {};

  const submit_comment = () => {};

  useEffect(() => {
    const handleGetGym = async (GID) => {
      await dispatch(handleActionToGetSingleGym(GID));
    };

    handleGetGym(GID);
  }, []);

  const changeWeek = (opt) => {
    setWeek(opt);
  };

  if (isSuccess) {
    const treeData = [];
    const today = new Date();
    const day = today.getDay() - 1;
    const currentDayString = day.toString();
    for (const key in gym.tradingHours) {
      if (week === "this" && day >= key) {
        continue;
      }

      const timeChild = [];

      const dayName = TimeMap[key.toString()];
      const dayValue = dayValueMap[dayName];
      const hours = gym.tradingHours[key.toString()];
      const startTime = hours["startTime"].split(":")[0];
      const endTime = hours["endTime"].split(":")[0];

      for (let i = startTime; i < endTime; i++) {
        const time = i.toString() + ":00";
        const child = { title: time, value: i };
        timeChild.push(child);
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
              <div className="small_size_info">{gym.description}</div>
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
            <SingleGymMapView geoLocation={gym.geoLocation}></SingleGymMapView>
          </div>

          <div className="review_container">
            <div className="review_header">
              <div>Reviews</div>
              <div className="write_comment">
                <EditFilled />
                Write comments
              </div>
            </div>

            {/*<div className="line"/>*/}

            <div className="review_body">
              <div className="single_review">
                <div className="single_review_header">
                  yutong wang, 2022/02/12, * * * * *
                </div>

                <div className="single_review_body">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  congue, leo sed cursus tincidunt, ex metus pellentesque orci,
                  vel consectetur quam lectus eget tellus. Nulla congue molestie
                  quam at iaculis. Maecenas libero ex, ultricies eget ipsum sit
                  amet, feugiat ul
                </div>

                <div className="line" />
              </div>

              <div className="single_review">
                <div className="single_review_header">
                  yutong wang, 2022/02/12, * * * * *
                </div>

                <div className="single_review_body">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  congue, leo sed cursus tincidunt, ex metus pellentesque orci,
                  vel consectetur quam lectus eget tellus. Nulla congue molestie
                  quam at iaculis. Maecenas libero ex, ultricies eget ipsum sit
                  amet, feugiat ul
                </div>

                <div className="line" />
              </div>
            </div>
          </div>
        </div>

        <div className="side_floater">
          <div className="appointment_box">
            <div className="appointment_title">Make an appointment</div>

            <div className="short_line"></div>

            <Form
              labelCol={{
                span: 6,
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
                rules={[{ required: true, message: "Name cannot be empty!" }]}
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
                rules={[{ required: true, message: "Email cannot be empty!" }]}
              >
                <Input
                  onChange={(evt) => {
                    setEmail(evt.target.value);
                  }}
                />
              </Form.Item>

              {/*<Form.Item label="Date:" id="date" name="date"*/}
              {/*           rules={[{required: true, message: "Date cannot be empty!"}]}>*/}
              {/*    <DatePicker onChange={(value) => {*/}
              {/*        setDate(value)*/}
              {/*    }}/>*/}
              {/*</Form.Item>*/}

              <Form.Item
                label="Week:"
                name="week"
                rules={[{ required: true, message: "Week cannot be empty!" }]}
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
                rules={[{ required: true, message: "Time cannot be empty!" }]}
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
                  onClick={submit_appointment}
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

export default SingleGymView;
