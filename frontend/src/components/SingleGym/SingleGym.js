import React, {useState} from "react"
import "./SingleGym.scss"
import temp_gym from '../../image/temp_gym_img.jpg'



import {EditFilled} from '@ant-design/icons';


import 'antd/dist/antd.css';
import {
    Form,
    Input,
    Button,
    DatePicker,
    TreeSelect
} from 'antd';
import GymsMap from "../GymsMap/GymsMap";
const { TextArea } = Input;




const SingleGym = () => {



    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [note, setNote] = useState();

    const [nameMsg, setNameMsg] = useState(null);
    const [emailMsg, setEmailMsg] = useState(null);
    const [dateMsg, setDateMsg] = useState(null);
    const [timeMsg, setTimeMsg] = useState(null);



    const submit_appointment = () => {


        console.log("im here")


    }


    const submit_comment = () => {

    }

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

                </div>
            </div>








            <div className="bot_container">

                <div className="small_map">
                    <GymsMap></GymsMap>
                </div>



                <div className="review_container">

                    <div className="review_header">
                        <div>Reviews</div>
                        <div className="write_comment"><EditFilled />Write comments</div>
                    </div>

                    {/*<div className="line"/>*/}

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












                    </div>
                </div>





            </div>


            <div className="side_floater">
                <div className="appointment_box" >

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
                        <Form.Item label="Name" id="name" name="name" rules={[{required: true, message:"Name cannot be empty!"}]}>
                            <Input onChange={(evt) => {setName(evt.target.value)}}/>
                        </Form.Item>

                        <Form.Item label="Email" name="email" id="email" rules={[{required: true, message:"Email cannot be empty!"}]}>
                            <Input onChange={(evt) => {setEmail(evt.target.value)}}/>
                        </Form.Item>


                        <Form.Item label="Date:" id="date" name="date" rules={[{required: true, message:"Date cannot be empty!"}]}>
                            <DatePicker onChange={(value) => {setDate(value)}}/>
                        </Form.Item>

                        <Form.Item label="Time:" id="time" name="time" rules={[{required: true, message:"Time cannot be empty!"}]}>
                            <TreeSelect onChange={(value) => {setTime(value)}}
                                treeData={[
                                    {

                                        title: 'Monday',
                                        value: 'mon',
                                        disabled: true,
                                        children: [
                                            {
                                                title: '7:00',
                                                value: 'm7',
                                            },
                                            {
                                                title: '8:00',
                                                value: 'm8',
                                            },
                                            {
                                                title: '9:00',
                                                value: 'm9',
                                            },
                                        ],
                                    },
                                ]}
                            />
                        </Form.Item>



                        <Form.Item label="Note" id="note">
                            <TextArea rows={4} onChange={(evt)=>{setNote(evt.target.value)}}/>
                        </Form.Item>

                        <Form.Item label="Submit" >
                            <Button type="primary" htmlType="submit" onClick={submit_appointment}>Submit</Button>
                        </Form.Item>
                    </Form>

                </div>

            </div>



        </div>
    )
}

export default SingleGym