import React from 'react'
import { Route } from 'react-router-dom';
import StoreList from './StoreList';
import StoreRead from './StoreRead';
import '../home/HomePage';

const StorePage = () => {
    return (
        <div className='homepage' style={{marginTop : "0px"}}>
            <Route path='/store/list' component={StoreList} />
            <Route path='/store/read/:s_code' component={StoreRead} />
        </div>
    )
}

export default StorePage