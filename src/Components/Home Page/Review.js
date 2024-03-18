import React, { useEffect, useState } from 'react';
import Star from '../Images/star.png'
import UserIcon from '../Images/UserIcon.png'
import '../Styles/review.css'
import axios from 'axios';

function Review() {
    const [arr, setArr] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
          try {
            const response = await axios.get("/review/top3");
            // console.log("Response data:", response.data);
            setArr(response.data.top3Reviews);

          } catch (error) {
            console.error("Error fetching reviews:", error);
            setError(error);
          }
        };
    
        fetchReviews();
    }, []);

    if (error) {
        return <div>Error fetching reviews: {error.message}</div>;
    }

    return (
        <div className="reviewImg">
            <div className="reviewCard">
                <div className='h1Box'>
                    <h1 className='h1'>REVIEWS</h1>
                    <div className="line"></div>
                </div>
                <div className="rDetail">
                    {arr && arr.map((ele, key) => (
                        <div className="rCard" key={key}>
                            {console.log("Review data:", ele)}
                            <div className='rimage'>
                                <img alt='' src={ele && ele.user && ele.user.profileImage ? ele.user.profileImage : UserIcon} className='img' />
                            </div>
                            <div className='rheader'>
                                <h3 className="rh3">{ele && ele.user && ele.user.name ? ele.user.name : 'Unknown User'}</h3>
                            </div>
                            <div className='rsummary'>
                                <p className='para'>
                                    {ele && ele.review}
                                </p>
                            </div>
                            <div><h4>Plan Name : {ele && ele.plan && ele.plan.name ? ele.plan.name : 'Unknown Plan'}</h4></div>
                            
                            <div className='frate'>
                                {/* Check if ele.rating exists and is a valid number */}
                                {typeof ele.rating === 'number' && Array.from(Array(Math.floor(ele.rating)).keys()).map((_, index) => (
                                    <img key={index} alt='' src={Star} className='img' />
                                ))}
                            </div>
                        </div>
                    ))}
                
                </div>
            </div>
        </div>
    );
}

export default Review;
