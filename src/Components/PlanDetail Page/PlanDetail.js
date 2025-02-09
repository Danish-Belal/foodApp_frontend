import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import '../Styles/planDetail.css'
import '../Styles/contact.css'
import AuthProvider, { useAuth } from '../Context/AuthProvider';

function PlanDetail() {
    const [plan, setplan] = useState({})
    const { id } = useParams();
    const [arr, setarr] = useState();
    const [review, setreview] = useState("");
    const [rate, setrate] = useState();
    const { user } = useAuth();
    console.log(id, "<<<<<<<<<<Danish>>>>>>>>>>>>>>");
    useEffect(() => {
        const fetchPlan = async () => {
        try {
            const planResponse = await axios.get(`/planDetail/${id}`);
            const planData = planResponse.data.data;
            delete planData._id;
            delete planData.__v;
            setplan(planData);
        } catch (error) {
            console.log(error);
        }
        };
    
        const fetchReviews = async () => {
        try {
            const reviewsResponse = await axios.get(`/review/${id}`);
            const reviewsData = reviewsResponse.data.data;
            setarr(reviewsData);
        } catch (error) {
            console.log(error);
        }
        };
            
        fetchPlan();
        fetchReviews();
    }, [id]);
    

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    console.log(rate);
    // console.log("user ",user);

    const handleClick = async () => {
        try {
            const data = await axios.post(`/review/crud/${id}`, {
                review,
                rating: rate,
                user: user.data.id,
                plan: id
            });

            const reviewsResponse = await axios.get(`/review/${id}`);
            const reviewsData = reviewsResponse.data.data;
            setarr(reviewsData);
        } catch (error) {
            console.log(error);
        }
    };

    
    const handleDelete = async (reviewId) => {
        try {
            await axios.delete(`/review/crud/${id}`, { data: { id: reviewId } });

            const reviewsResponse = await axios.get(`/review/${id}`);
            const reviewsData = reviewsResponse.data.data;
            setarr(reviewsData);

            alert("Review deleted");
        } catch (error) {
            console.log(error);
            alert("Error occurred while deleting the review");
        }
    };

    return (
        <div className="pDetailBox">
            <div className='h1Box'>
                <h1 className='h1'>PLAN DETAILS</h1>
                <div className="line"></div>
            </div>
            <div className="planDetailBox">
                <div className='planDetail'>
                    <div className="loginBox">
                        {
                            Object.keys(plan).map((ele, key) => (
                                <div className='entryBox' key={key}>
                                    <div className="entryText">{capitalizeFirstLetter(ele)}</div>
                                    <div className=" input">{capitalizeFirstLetter(plan[ele].toString())}</div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>

            <div className='reviewBox'>
                <div className="reviewEnrty">
                    <input type="text" value={review} onChange={(e) => setreview(e.target.value)} />
                    <select name="" id="" className="select" onChange={(e) => { setrate(e.target.value) }}>
                        <option value="5">5 Excellent</option>
                        <option value="4">4 Very Good</option>
                        <option value="3">3 Good</option>
                        <option value="2">2 Poor</option>
                        <option value="1">1 Very Poor</option>
                    </select>
                    <button className="btn" onClick={handleClick}>
                        Submit
                    </button>
                </div>
                {
                    arr && arr?.map((ele, key) => (
                        <div className="reviewsCard" key={key}>
                            <div className="pdreviews">
                                <div className="pdrdetail">
                                    <h3>{ele.user.name}</h3>
                                    <div className="input"> {ele.review}</div>
                                </div>
                                <div className='rate'>
                                    {
                                        <label htmlFor="star5" title="text">{ele.rating}</label>

                                    }
                                </div>
                            </div>

                            <div className='rcBtn'>
                                <button className="showMoreBtn btn" onClick={()=>{handleDelete(ele._id)}}>Delete</button>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default PlanDetail
