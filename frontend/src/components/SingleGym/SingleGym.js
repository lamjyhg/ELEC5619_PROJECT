import React, {useEffect, useState} from "react"
import "./SingleGym.scss"
import left_arrow from '../../image/left_arrow.png'
import right_arrow from '../../image/right_arrow.png'
import temp_gym from '../../image/temp_gym_img.jpg'
import g1 from '../../image/g1.jpg'
import g2 from '../../image/g2.jpg'
import g3 from '../../image/g3.jpg'



const SingleGym = () => {


    const [] = useState();


    return(
        <div className="single_gym_container">

            <div className="top_container">
                <div className="left_info_area">
                    <div className="info_title">
                        Anytime Fitness 7/24
                    </div>

                    <div className="middle_size_info">
                        Price: $110 - $3000
                    </div>

                    <div className="middle_size_info">
                        Location: 50
                    </div>

                </div>


                <div className="right_image_area">


                    <div className="mid_img">
                        <img className="large_img" src={temp_gym}/>
                    </div>


                    <div className="small_img_container">
                        <img className="small_img" src={g1}/>


                        <div className="small_img">
                            <img className="small_img" src={g2}/>
                        </div>

                        <div className="small_img">
                            <img className="small_img" src={g3}/>
                        </div>
                    </div>
                </div>
            </div>




            <div className="bot_info_area">

            </div>





        </div>
    )
}

export default SingleGym