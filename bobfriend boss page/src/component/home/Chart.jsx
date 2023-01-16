import React from 'react'
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './chart.css'

const Chart = () => {
    const data = [
        {
            name : '1월',
            '판매금액' : 7000000
        },
        {
            name : '2월',
            '판매금액' : 10000000
        },
        {
            name : '3월',
            '판매금액' : 8000000  
        },
        {
            name : '4월',
            '판매금액' : 8500000   
        },
        {
            name : '5월',
            '판매금액' : 7250000  
        },
        {
            name : '6월',
            '판매금액' : 11000000
        },
        {
            name : '7월',
            '판매금액' : 9530000  
        },
        {
            name : '8월',
            '판매금액' : 7852000
        },
        {
            name : '9월',
            '판매금액' : 11250000
        },
        {
            name : '10월',
            '판매금액' : 8956400
        },
        {
            name : '11월',
            '판매금액' : 6900000 
        },
        {
            name : '12월',
            '판매금액' : 7523000 
        }
    ];

    return (
        <div className='chart'>
            <h3 className='chartTitle'>매출 그래프</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1} >
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke='5550bd' />
                    <Line type="monotone" dataKey="판매금액" />
                    <Tooltip />
                    <CartesianGrid stroke='#e0dfdf' strokeDasharray="5 5" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart