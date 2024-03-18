import React, { useEffect, useState } from 'react';
import '../Styles/plan.css';
import Tick from '../Images/check-mark.png'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Plans() {
    const [arr, arrset] = useState([]);

    useEffect(async () => {
        try {
            const data = await axios.get("/plans/top3");
            console.log(data,23443);
            arrset(data.data.data);
            
        } catch (err) {
            console.log(err);
        }
    }, [])

    const handleClick = async () => {
        try {
        const response = await axios.post('/views/booking.html');
          // Handle the response from the backend if needed
        console.log(response.data);
        } catch (error) {
          // Handle errors if the API call fails
          console.log(error);
        }
      };

    return (
        <div className='plansCard'>
            <div className='h1Box'>
                <h1 className='h1'>START EATING HEALTHY TODAY</h1>
                <div className="line"></div>
            </div>
            <div className='planDetails'>
                {arr && arr?.map((ele, key) =>
                    <div className='pCard' key={key}>
                        <h3 className='h3'>{ele.name}</h3>
                        <div className='pCard1'>
                            <div className='priceBox'>
                                <div className='price'>Rs {ele.price}</div>
                                <div className="duration">/month</div>
                            </div>
                            <p className="point">That’s only 2₹ per meal</p>
                        </div>

                        <div className='pCard2'>
                            <div className='ppoints'>
                                <img src={Tick} alt='' className='img' />
                                <p className='point'>{ele.duration} meal every day</p>
                            </div>
                            <div className='ppoints'>
                                <img src={Tick} alt='' className='img' />
                                <p className='point'>{ele.discount} discount available.</p>
                            </div>
                            <div className='ppoints'>
                                <img src={Tick} alt='' className='img' />
                                <p className='point'>{ele.ratingsAverage} rated meal.</p>
                            </div>
                        </div>
                        <button className='btn' onClick={handleClick}>I'm Hungry</button>
                    </div>
                )}
            </div>
        
        </div>
    )
}

export default Plans
