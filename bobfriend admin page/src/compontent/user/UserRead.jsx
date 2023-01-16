import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Figure, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const UserRead = ({ match, history }) => {
    const u_code = match.params.u_code;
    const [user, setUser] = useState('');

    const callAPI = async () => {
        const result = await axios.get(`/api/user/read/${u_code}`);
        setUser(result.data);
    }

    const callBack = () => {
        history.go(-1);
    }

    useEffect(() => {
        callAPI();
    }, []);

    if (!user) return <h1>Loading....</h1>

    return (
        <>
            <Card className="p-3 my-3">
                <Form.Label>유저코드</Form.Label>
                <Form.Control className="my-2"
                    value={user.u_code} disabled={true} />
                <Form.Label>이름</Form.Label>
                <Form.Control className="my-2"
                    value={user.u_name} disabled={true} />
                <Form.Label>아이디</Form.Label>
                <Form.Control className="my-2"
                    value={user.u_id} disabled={true} />
                <Form.Label>성인인증여부</Form.Label>
                <Form.Control className="my-2"
                    value={user.u_adult} disabled={true} />
                <Form.Label>주소</Form.Label>
                <Form.Control className="my-2"
                    value={user.u_address} disabled={true} />
                <Form.Label>생성일</Form.Label>
                <Form.Control className="my-2"
                    value={user.u_date} disabled={true} />
                <Form.Label>매너온도</Form.Label>
                <Form.Control className="my-2"
                    value={user.manner} disabled={true} />
                <Form.Label>신고누적수</Form.Label>
                <Form.Control className="my-2"
                    value={user.r_count} disabled={true} />
                <Form.Label>사용자타입</Form.Label>
                <Form.Control className="my-2"
                    value={user.u_type} disabled={true} />
                <Form.Label>상태</Form.Label>
                <Form.Control className="my-2"
                    value={user.u_status} disabled={true} />
                <Figure.Image
                    width={200}
                    src="https://dummyimage.com/200" />

            </Card>
            <Button onClick={callBack}>목록</Button>
        </>
    )
}

export default withRouter(UserRead)