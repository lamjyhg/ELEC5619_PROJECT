// Attribution: <a href="https://www.vecteezy.com/free-photos">Free Stock photos by Vecteezy</a>

import { Card, Rate } from "antd";
import React from "react";
import GymsMap from "../GymsMap/GymsMap";
import "./MainPagebody.scss";
import {useNavigate} from "react-router-dom";

const MainPage = () => {

    const navigate  = useNavigate();
    const jumpToGymList = () => {
        navigate("/gyms")
    }

  return (
    <div className="main_container">
      <div className="book_section">
        <div className="left_info_container">
          <div className="name">Gymmy</div>
          <div className="descrption">Book your own place now!</div>
          <div className="book_button" onClick={jumpToGymList}>Gym list</div>
        </div>
      </div>
    </div>


  );
};
export default MainPage;
