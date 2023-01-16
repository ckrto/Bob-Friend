import React from 'react'
import './info.css'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Info = () => {
    return (
        <div className='info'>
            <div className='infoItem'>
                <span className='infoTitle'>금일 방문자 수</span>
                <div className='infoMoneyContainer'>
                    <span className='infoMoney'>13,562명</span>
                    <span className='infoMoneyRate'>
                        +253명 <ArrowUpwardIcon className='infoIcon'/>
                    </span>
                </div>
                <span className='infoSub'>지난일 대비</span>
            </div>
            <div className='infoItem'>
                <span className='infoTitle'>이번달 총 방문자 수</span>
                <div className='infoMoneyContainer'>
                    <span className='infoMoney'>372,321명</span>
                    <span className='infoMoneyRate'>
                        +101,321명 <ArrowDownwardIcon className='infoIcon negative'/>
                    </span>
                </div>
                <span className='infoSub'>지난달 대비</span>
            </div>
            <div className='infoItem'>
                <span className='infoTitle'>매칭 성공 수</span>
                <div className='infoMoneyContainer'>
                    <span className='infoMoney'>285번</span>
                    <span className='infoMoneyRate'>
                        +32번 <ArrowUpwardIcon className='infoIcon'/>
                    </span>
                </div>
                <span className='infoSub'>지난달 대비</span>
            </div>
        </div>
    )
}

export default Info