import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MenuItem from './MenuItem'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';

const MenuList = () => {
    const s_code = sessionStorage.getItem("s_code");
    const [menus, setMenus] = useState([]);

    const callMenus = async () => {
        const result = await axios.get(`/api/menu/list?s_code=${s_code}`);
        setMenus(result.data);
        // console.log(result.data);
    };

    useEffect(() => {
        callMenus();
    }, []);

    if (!menus) return <h2>Loading...</h2>

    return (
        <div style={{ marginLeft: '20px' }}>
            <h1 className="my-3" style={{ textAlign: "center" }}>Menu List</h1>
            <Row>
                <Col className='' md={5} style={{ marginBottom: '20px' }}>
                    <Link to='/menu/insert'>
                        <Button style={{backgroundColor : "orange", borderColor : "orange"}}>메뉴등록</Button>
                    </Link>
                </Col>
            </Row>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>No.</TableCell>
                            <TableCell align='center'>Image</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Price&nbsp;(￦)</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {menus.map(menu =>
                            <MenuItem
                                key={menu.m_code}
                                menu={menu}
                                callMenus={callMenus} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default MenuList