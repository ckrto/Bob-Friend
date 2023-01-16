import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../home/home.css'
import ReviewList from './ReviewList';

const Review = () => {
    const s_code = sessionStorage.getItem("s_code");
    
    const [reviews, setReviews] = useState([]);
    const [storeReview, setStoreReview] = useState('');
    
    const callReview = async () => {
        const result = await axios.get(`/api/review/sread/${s_code}`);
        setReviews(result.data.review);
        setStoreReview(result.data.store);
    }

    useEffect (() => {
        callReview();
    })

    return (
        <div className='home'>
            {reviews.map(review =>
                <ReviewList key={review.r_code} review={review} callReview={callReview} />
            )}
        </div>
    )
}

export default Review