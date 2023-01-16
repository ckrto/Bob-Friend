import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';

const Header = ({ history }) => {
    const onClick = (e) => {
        e.preventDefault();

        const href = e.target.getAttribute("href");
        history.push(href);
    }

    const LogOut = (e) => {
        e.preventDefault();
        sessionStorage.removeItem("u_type");
        window.location.href="/";
    }

    return (
        <>
            <Navbar className="mb-3" bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Logo</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/user/list" onClick={onClick} >User</Nav.Link>
                        <Nav.Link href='/store/list' onClick={onClick}>Store</Nav.Link>
                        <Nav.Link href='/report/list' onClick={onClick}>report</Nav.Link>
                    </Nav>
                    <Nav.Link href="#" style={{color : "white"}} onClick={LogOut}>Logout</Nav.Link>
                </Container>
            </Navbar>
        </>
    )
}

export default withRouter(Header)