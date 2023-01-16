import React from 'react'
import Chart from './Chart'
import './home.css'
import Info from './Info'

const Home = () => {
    return (
        <div className='home'>
            <Info />
            <Chart />
        </div>
    )
}

export default Home