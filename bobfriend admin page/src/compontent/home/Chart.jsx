import React from 'react'
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './chart.css'

const Chart = () => {
    const data = [
        {
            name : '1월',
            '방문자 수' : 134932
        },
        {
            name : '2월',
            '방문자 수' : 179921
        },
        {
            name : '3월',
            '방문자 수' : 191200
        },
        {
            name : '4월',
            '방문자 수' : 221392  
        },
        {
            name : '5월',
            '방문자 수' : 213213 
        },
        {
            name : '6월',
            '방문자 수' : 249582
        },
        {
            name : '7월',
            '방문자 수' : 278322
        },
        {
            name : '8월',
            '방문자 수' : 300102
        },
        {
            name : '9월',
            '방문자 수' : 332921
        },
        {
            name : '10월',
            '방문자 수' : 359200
        },
        {
            name : '11월',
            '방문자 수' : 341121
        },
        {
            name : '12월',
            '방문자 수' : 372321 
        }
    ];

    return (
        <div className='chart'>
            <h3 className='chartTitle'>방문자 수 그래프</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1} >
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke='5550bd' />
                    <Line type="monotone" dataKey="방문자 수" />
                    <Tooltip />
                    <CartesianGrid stroke='#e0dfdf' strokeDasharray="5 5" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart