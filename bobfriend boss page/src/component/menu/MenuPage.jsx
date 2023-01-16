import React from 'react'
import { Route } from 'react-router-dom';
import MenuInsert from './MenuInsert';
import MenuList from './MenuList';
import MenuRead from './MenuRead';
import '../home/home.css'

const MenuPage = () => {
    const s_code = "";

    return (
        <div className='home'>
            <Route path={`/menu/list/${s_code}`} component={MenuList}/>
            <Route path='/menu/insert' component={MenuInsert}/>
            <Route path={`/menu/read/:s_code/:m_code`} component={MenuRead}/>
        </div>
    )
}

export default MenuPage