import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Button, ButtonGroup, Dropdown, Form, Table } from 'react-bootstrap';
import UserItem from './UserItem';
import Pagination from 'react-js-pagination';
import TableBody from '@mui/material/TableBody';
import '../Pagination.css';
import '../home/HomePage';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const [form, setForm] = useState({
        column: 'u_id',
        query: '',
        page: 1,
        num: 5
    });

    const { column, query, page, num } = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onChangeNum = (e) => {
        setForm({
            ...form,
            num: e
        });
    }

    const onChangePage = (e) => {
        setForm({
            ...form,
            page: e
        });
    }

    const onChangeColumn = (e) => {
        setForm({
            ...form,
            column: e
        })
    }

    const onClick = async () => {
        await axios.post(`/api/user/del_user`);
        callUsers();
    }

    const callUsers = async () => {
        const result = await axios.get(`/api/user/list?page=${page}&num=${num}&column=${column}&query=${query}`);
        setUsers(result.data.list);
        setTotal(result.data.total);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        callUsers();
    }

    const onSelect = (eventKey) => {
        switch (eventKey) {
            case "1":
                onChangeNum(5);
                break;
            case "10":
                onChangeNum(10);
                break;
        }
    }

    const onSelectColumn = (eventKey) => {
        switch (eventKey) {
            case "u_code":
                onChangeColumn("u_code");
                break;
            case "u_name":
                onChangeColumn("u_name");
                break;
            case "u_id":
                onChangeColumn("u_id");
                break;
        }
    }

    useEffect(() => {
        callUsers();
    }, [column, num, page]);

    if (!users) return <h1>Loading...</h1>

    return (
        <div className='homepage' style={{ marginLeft: '30px' }}>
            <div className='search' style={{ marginBottom: '20px' }}>
                <Form onSubmit={onSubmit}>
                    <ButtonGroup>
                        <Dropdown onSelect={onSelect}>
                            <Dropdown.Toggle style={{ backgroundColor: "orange", borderColor: "orange" }}>
                                모아보기
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="1">5명씩 보기</Dropdown.Item>
                                <Dropdown.Item eventKey="10">10명씩 보기</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Select value={column} onChange={onChange} name="column" style={{ marginLeft: "30px", width: "140px" }}>
                            <option value="u_code">User Code</option>
                            <option value="u_name">User Name</option>
                            <option value="u_id">User ID</option>
                        </Form.Select>
                        <Form.Control placeholder='검색어' style={{ width: "200px" }} onChange={onChange} value={query} name="query"></Form.Control>
                        <Button onClick={onSubmit} style={{ width: "100px", backgroundColor: "orange", borderColor: "orange" }}>검색</Button>
                    </ButtonGroup>
                </Form>
            </div>

            <div style={{ marginLeft: '20px' }} className='data'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{ textAlign: "center" }}>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Address</th>
                            <th>Del</th>
                        </tr>
                    </thead>
                    <TableBody>
                        {users.map(user =>
                            <UserItem key={user.u_code} user={user} callUsers={callUsers} />
                        )}
                    </TableBody>
                </Table>
            </div>
            <Button style={{ backgroundColor: "orange", borderColor: "orange", marginLeft: "20px" }}>완벽 삭제</Button>
            <Pagination
                activePage={page}
                itemsCountPerPage={num}
                totalItemsCount={total}
                pageRangeDisplayed={20}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={onChangePage}
            />
        </div>
    )
}

export default UserList