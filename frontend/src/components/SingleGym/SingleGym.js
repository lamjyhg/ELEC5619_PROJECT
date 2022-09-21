import React, {useEffect, useState} from "react"
import "./SingleGym.scss"
import left_arrow from '../../image/left_arrow.png'
import right_arrow from '../../image/right_arrow.png'
import temp_gym from '../../image/temp_gym_img.jpg'
import g1 from '../../image/g1.jpg'
import g2 from '../../image/g2.jpg'
import g3 from '../../image/g3.jpg'


import 'antd/dist/antd.css';
import { PlusOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Button,
    DatePicker,
    TreeSelect
} from 'antd';
import GymsMap from "../GymsMap/GymsMap";
const { RangePicker } = DatePicker;
const { TextArea } = Input;




const SingleGym = () => {


    const [] = useState();

    const config = {
        rules: [
            {
                type: 'object',
                required: true,
                message: 'Please select time!',
            },
        ],
    };


    return(
        <div className="single_gym_container">

            <div className="top_container">


                <div className="left_info_area">


                    <div className="info_title">
                        Anytime Fitness 7/24
                    </div>


                    <div className="large_size_info">
                        $110 - $3000
                    </div>

                    <div className="middle_size_info">
                        Location: xxxx, Y Street, Chippendale 2008, NSW
                    </div>


                    <div className="description_wrapper">
                        <div className="small_size_info">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Cras congue, leo sed cursus tincidunt, ex metus pellentesque orci,
                            vel consectetur quam lectus eget tellus. Nulla congue molestie quam at
                            iaculis. Maecenas libero ex, ultricies eget ipsum sit amet, feugiat ul
                            lamcorper ex. Cras ullamcorper massa in felis rhoncus porttitor. Pellen
                            tesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
                            egestas. Praesent mollis, nunc id consequat malesuada, nulla metus eleifend metus,
                        </div>
                    </div>
                </div>


                <div className="right_image_area">


                    <div className="mid_img">
                        <img className="large_img" src={temp_gym}/>
                    </div>


                    {/*<div className="small_img_container">*/}
                    {/*    <img className="small_img" src={g1}/>*/}


                    {/*    <div className="small_img">*/}
                    {/*        <img className="small_img" src={g2}/>*/}
                    {/*    </div>*/}

                    {/*    <div className="small_img">*/}
                    {/*        <img className="small_img" src={g3}/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>








            <div className="bot_container">
                <div className="small_map">
                    <GymsMap></GymsMap>
                </div>




                <div className="review_container">

                    <div className="review_header">
                        Reviews
                    </div>

                    <div className="line"/>

                    <div className="review_body">


                        <div className="single_review">
                            <div className="single_review_header">
                                yutong wang, 2022/02/12, * * * * *
                            </div>

                            <div className="single_review_body">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Cras congue, leo sed cursus tincidunt, ex metus pellentesque orci,
                                vel consectetur quam lectus eget tellus. Nulla congue molestie quam at
                                iaculis. Maecenas libero ex, ultricies eget ipsum sit amet, feugiat ul
                            </div>

                            <div className="line"/>
                        </div>

                        <div className="single_review">
                            <div className="single_review_header">
                                yutong wang, 2022/02/12, * * * * *
                            </div>

                            <div className="single_review_body">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Cras congue, leo sed cursus tincidunt, ex metus pellentesque orci,
                                vel consectetur quam lectus eget tellus. Nulla congue molestie quam at
                                iaculis. Maecenas libero ex, ultricies eget ipsum sit amet, feugiat ul
                            </div>

                            <div className="line"/>
                        </div>


                        <div className="single_review">
                            <div className="single_review_header">
                                yutong wang, 2022/02/12, * * * * *
                            </div>

                            <div className="single_review_body">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Cras congue, leo sed cursus tincidunt, ex metus pellentesque orci,
                                vel consectetur quam lectus eget tellus. Nulla congue molestie quam at
                                iaculis. Maecenas libero ex, ultricies eget ipsum sit amet, feugiat ul
                            </div>

                            <div className="line"/>
                        </div>

                        <div className="single_review">
                            <div className="single_review_header">
                                yutong wang, 2022/02/12, * * * * *
                            </div>

                            <div className="single_review_body">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Cras congue, leo sed cursus tincidunt, ex metus pellentesque orci,
                                vel consectetur quam lectus eget tellus. Nulla congue molestie quam at
                                iaculis. Maecenas libero ex, ultricies eget ipsum sit amet, feugiat ul
                            </div>

                            <div className="line"/>
                        </div>








                    </div>
                </div>





            </div>


            <div className="side_floater">
                <div className="appointment_box">

                    <div className="appointment_title">
                        Make an appointment
                    </div>

                    <div className="short_line">

                    </div>


                    <Form
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        layout="horizontal"
                    >
                        <Form.Item label="Name">
                            <Input />
                        </Form.Item>

                        <Form.Item label="Email">
                            <Input />
                        </Form.Item>


                        <Form.Item label="Date:">
                            <DatePicker />
                        </Form.Item>

                        <Form.Item label="Time:">
                            <TreeSelect
                                treeData={[
                                    {
                                        title: 'Monday',
                                        value: 'mon',
                                        children: [
                                            {
                                                title: '7:00',
                                                value: '7',
                                            },
                                            {
                                                title: '8:00',
                                                value: '8',
                                            },
                                            {
                                                title: '9:00',
                                                value: '9',
                                            },
                                        ],
                                    },
                                ]}
                            />
                        </Form.Item>



                        <Form.Item label="Note">
                            <TextArea rows={4} />
                        </Form.Item>

                        <Form.Item label="Submit">
                            <Button>Submit</Button>
                        </Form.Item>
                    </Form>

                </div>

            </div>



        </div>
    )
}

export default SingleGym