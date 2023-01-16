import React from 'react'
import { withRouter } from 'react-router-dom'
import './topbar.css'
import bob from './bob.png'
import { Button } from 'react-bootstrap'

const Topbar = () => {
    const LogOut = (e) => {
        e.preventDefault();
        sessionStorage.removeItem("u_type");
        window.location.href = "/";
    }
    return (
        <div className='topbar'>
            <div className='topbarWrapper'>
                <div className='topLeft'>
                    <img
                        src={bob}
                        alt=''
                        className='topAvatar' />
                    <span className='logo'>밥 친 구</span>
                </div>
                <div className='topRight'>
                <Button style={{backgroundColor : "#F76A12", borderColor : "#F76A12"}} onClick={LogOut}>LogOut</Button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Topbar)