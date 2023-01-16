import './sidebar.css'

import { withRouter } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const Sidebar = ({ history }) => {

    const onClick = (e) => {
        e.preventDefault();

        const href = e.target.getAttribute("href");
        history.push(href);
    }

    return (
        <div className='sidebar'>
            <div className='sidebarWrapper'>
                <div className='sidebarMenu'>
                    <ul className='sidebarList'>
                        <li className='sidebarListItem'>
                            
                            <Nav.Link href='/' onClick={onClick}>홈</Nav.Link>
                        </li>

                        <li className='sidebarListItem'>
             
                            <Nav.Link href='/user/list' onClick={onClick}>고객정보</Nav.Link>
                        </li>

                        <li className='sidebarListItem'>
                     
                            <Nav.Link href='/store/list' onClick={onClick} >가게정보</Nav.Link>
                        </li>

                        <li className='sidebarListItem'>
                         
                            <Nav.Link href='/report/list' onClick={onClick}>신고관리</Nav.Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Sidebar)