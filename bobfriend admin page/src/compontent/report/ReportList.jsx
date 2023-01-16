import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Button, ButtonGroup, Dropdown, Form, Pagination, Table } from 'react-bootstrap';
import ReportItem from './ReportItem';
import '../home/HomePage';
import { TableBody } from '@mui/material';

const ReportList = () => {
    const [reports, setReport] = useState([]);
    const [total, setTotal] = useState(0);
    const [form, setForm] = useState({
        column: 'r_code',
        query: '',
        page: 1,
        num: 5
    });

    const { column, query, page, num } = form;

    const CallReport = async () => {
        const result = await axios.get(`/api/report/list?page=${page}&num=${num}&column=${column}&query=${query}`);
        setReport(result.data.list);
        setTotal(result.data.total);
    }

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
    
    const onSubmit = (e) => {
        e.preventDefault();
        CallReport();
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
            case "r_code":
                onChangeColumn("u_code");
                break;
            case "suer":
                onChangeColumn("u_name");
                break;
            case "defender":
                onChangeColumn("u_id");
                break;
        }
    }

    useEffect(() => {
        CallReport();
    }, [column, num, page]);

    if (!reports) return <h1>Loading...</h1>
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
                            <option value="r_code">신고 코드</option>
                            <option value="suer">신고한 유저</option>
                            <option value="defender">신고 당한 유저</option>
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
                            <th>신고 코드</th>
                            <th>신고한 유저</th>
                            <th>신고 당한 유저</th>
                            <th>신고 내용</th>
                            <th>신고 타입</th>
                        </tr>
                    </thead>
                    <TableBody>
                        {reports.map(report =>
                            <ReportItem key={reports.r_code} report={report} />
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
                onChange={onChangePage}
            />
        </div>
    )
}

export default ReportList