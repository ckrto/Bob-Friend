import React from 'react'
import Info from './info'
import './homepage.css'
import SalesChart from './SalesChart'


const HomePage = () => {
    return (
        <div className='homepage'>
            <Info/>
            <SalesChart/>
        </div>
        
    )
}

export default HomePage