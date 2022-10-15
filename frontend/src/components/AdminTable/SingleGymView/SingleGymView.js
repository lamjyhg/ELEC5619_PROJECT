import React, { useEffect, useState } from "react";
import temp_gym from "../../../image/temp_gym_img.jpg";
import "./SingleGymView.scss";
import { EditFilled } from "@ant-design/icons";
import { Button, Form, Input, Select, TreeSelect } from "antd";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { handleActionToGetSingleGym } from "../../../state/gyms/singleGym.action";
import { baseURL } from "../../../utils/request";
import SingleGymMapView from "./SingleGymViewMap/SingleGymViewMap";
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

        </div>

      </div>
    );
  }
};

export default SingleGymView;
