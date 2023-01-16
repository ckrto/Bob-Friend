import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import '../home/home.css'
import OrderList from './OrderList';

const OrderPage = () => {
    const s_code = sessionStorage.getItem("s_code");

    const [posts, setPost] = useState([]);

    const callPost = async () => {
        const result = await axios.get(`/api/post/list/${s_code}`);
        setPost(result.data);
    }
    

    useEffect(() => {
        callPost();
    }, []);

    return (
        <div className='home'>
            
            {posts.map(post =>
                <OrderList key={post.p_code} post={post} callPost={callPost} />
            )}
        </div>
    )
}

export default OrderPage