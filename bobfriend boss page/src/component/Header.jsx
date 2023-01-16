import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';

const Header = ({ history }) => {
    const s_code = sessionStorage.getItem("u_id");

    const onClick = (e) => {
        e.preventDefault();

        const href = e.target.getAttribute("href");
        history.push(href);
    }

    const LogOut = (e) => {
        e.preventDefault();
        sessionStorage.removeItem("u_type");
        window.location.href = "/";
    }

    return (
        <Navbar className="mb-3" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/" onClick={onClick}>Store Management</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link
                        href='/info'
                        onClick={onClick}>Store Info
                    </Nav.Link>
                    <Nav.Link
                        href={`/menu/list/${s_code}`}
                        onClick={onClick}>Menu
                    </Nav.Link>
                </Nav>
                <Nav.Link href="#" style={{ color: "white" }} onClick={LogOut}>Logout</Nav.Link>
            </Container>
        </Navbar>
    )
}

export default withRouter(Header)