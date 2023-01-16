import './sidebar.css'
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { withRouter } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import ListAltIcon from '@mui/icons-material/ListAlt';

const Sidebar = ({ history }) => {
    const u_id = sessionStorage.getItem("u_id");

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
                            <HomeIcon className='sidebarIcon' />
                            <Nav.Link href='/' onClick={onClick}>홈</Nav.Link>
                        </li>

                        <li className='sidebarListItem'>
                            <StoreIcon className='sidebarIcon' />
                            <Nav.Link href='/info' onClick={onClick}>매장정보</Nav.Link>
                        </li>

                        <li className='sidebarListItem'>
                            <RateReviewIcon className='sidebarIcon' />
                            <Nav.Link href='/review' onClick={onClick} >리뷰관리</Nav.Link>
                        </li>

                        <li className='sidebarListItem'>
                            <RestaurantMenuIcon className='sidebarIcon' />
                            <Nav.Link href={`/menu/list/${u_id}`} onClick={onClick}>메뉴관리</Nav.Link>
                        </li>

                        <li className='sidebarListItem'>
                            <ListAltIcon className='sidebarIcon' />
                            <Nav.Link href={'/order'} onClick={onClick}>주문확인</Nav.Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Sidebar)