// Attribution: <a href="https://www.vecteezy.com/free-photos">Free Stock photos by Vecteezy</a>

import { Card, Rate } from "antd";
import React from "react";
import GymsMap from "../GymsMap/GymsMap";
import "./MainPagebody.scss";

const MainPage = () => {
  return (
    <div className="main_container">
      <div className="book_section">
        <div className="left_info_container">
          <div className="name">Gymmy</div>

          <div className="descrption">Book your own place now!</div>

          <div className="book_button">Book Now</div>
        </div>
      </div>

      <div className="about_section">
        <div className="title">About Gymmy</div>

        <div className="card_container">
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            Book your own gym spaces
          </Card>

          <Card
            hoverable
            style={{
              marginLeft: "10rem",
              width: 240,
            }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            Upload your gym
          </Card>

          <Card
            hoverable
            style={{
              marginLeft: "10rem",
              width: 240,
            }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            Review your experiences
          </Card>
        </div>
      </div>

      <div className="large_title_section"></div>

      <div className="map_section">
        <div className="title">Registered Gyms</div>
        <GymsMap></GymsMap>
      </div>

      <div className="review_section">
        <div className="title"> Current Reviews</div>

        <div className="review_container">
          <div className="single_review">
            <div className="comment">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in
              faucibus lorem. Phasellus rhoncus interdum pellentesque. Nullam
              consectetur velit faucibus risus bibendum m"
            </div>

            <Rate allowHalf defaultValue={3.5} />
          </div>

          <div className="single_review">
            <div className="comment">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in
              faucibus lorem. Phasellus rhoncus interdum pellentesque. Nullam
              consectetur velit faucibus risus bibendum m"
            </div>

            <Rate allowHalf defaultValue={0} />
          </div>

          <div className="single_review">
            <div className="comment">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in
              faucibus lorem. Phasellus rhoncus interdum pellentesque. Nullam
              consectetur velit faucibus risus bibendum m"
            </div>

            <Rate allowHalf defaultValue={5} disabled />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
