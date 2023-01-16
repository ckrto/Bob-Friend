import React from 'react'
import './info.css'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Info = () => {
    return (
        <div className='info'>
            <div className='infoItem'>
                <span className='infoTitle'>금일 매출 현황</span>
                <div className='infoMoneyContainer'>
                    <span className='infoMoney'>100,000원</span>
                    <span className='infoMoneyRate'>
                        +10,000원 <ArrowUpwardIcon className='infoIcon'/>
                    </span>
                </div>
                <span className='infoSub'>지난일 대비</span>
            </div>
            <div className='infoItem'>
                <span className='infoTitle'>이번달 매출 현황</span>
                <div className='infoMoneyContainer'>
                    <span className='infoMoney'>6,900,000원</span>
                    <span className='infoMoneyRate'>
                        -2,056,400원 <ArrowDownwardIcon className='infoIcon negative'/>
                    </span>
                </div>
                <span className='infoSub'>지난달 대비</span>
            </div>
            <div className='infoItem'>
                <span className='infoTitle'>배달 현황</span>
                <div className='infoMoneyContainer'>
                    <span className='infoMoney'>200번</span>
                    <span className='infoMoneyRate'>
                        +20번 <ArrowUpwardIcon className='infoIcon'/>
                    </span>
                </div>
                <span className='infoSub'>지난달 대비</span>
            </div>
        </div>
    )
}

export default Info