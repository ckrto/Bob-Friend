import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Dropdown, Form, Table } from 'react-bootstrap'
import StoreItem from './StoreItem';
import '../Pagination.css';
import Pagination from 'react-js-pagination';
import '../home/HomePage';
import { TableBody } from '@mui/material';

const StoreList = () => {
    const [stores, setStores] = useState([]);
    const [total, setTotal] = useState(0);
    const [form, setForm] = useState({
        column: 's_name',
        query: '',
        page: 1,
        num: 5
    });

    const { column, query, page, num } = form;

    const callStores = async () => {
        const result = await axios.get(`/api/store/weblist?page=${page}&num=${num}&column=${column}&query=${query}`);
        setStores(result.data.list);
        setTotal(result.data.total);
    };

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onChangePage = (e) => {
        setForm({
            ...form,
            page: e
        });
    }

    const onChangeNum = (e) => {
        setForm({
            ...form,
            num: e
        });
    }

    const onChangeColumn = (e) => {
        setForm({
            ...form,
            column: e
        })
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

    const onSubmit = (e) => {
        e.preventDefault();
        callStores();
    }

    useEffect(() => {
        callStores();
    }, [column, num, page]);

    if (!stores) return <h2>Loading...</h2>

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
                                <Dropdown.Item eventKey="1">5개씩 보기</Dropdown.Item>
                                <Dropdown.Item eventKey="10">10개씩 보기</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Select value={column} onChange={onChange} name="column" style={{ marginLeft: "30px", width: "140px" }}>
                            <option value="s_name">Name</option>
                            <option value="s_location">Location</option>
                        </Form.Select>
                        <Form.Control placeholder='검색어' style={{ width: "200px" }} onChange={onChange} name="query"></Form.Control>
                        <Button onClick={onSubmit} style={{ width: "100px", backgroundColor: "orange", borderColor: "orange" }}>검색</Button>
                    </ButtonGroup>
                </Form>
            </div>
            <div style={{ marginLeft: '20px' }} className='data'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{ textAlign: "center" }}>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Tel</th>
                            <th>Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <TableBody>
                        {stores.map(store =>
                            <StoreItem
                                key={store.s_code}
                                store={store}
                                callStores={callStores} />
                        )}
                    </TableBody>
                </Table>
            </div>
            <Pagination
                activePage={page}
                itemsCountPerPage={num}
                totalItemsCount={total}
                pageRangeDisplayed={20}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={onChangePage} />
        </div>
    )
}

export default StoreList