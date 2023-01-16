import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { Alert, Button, Card, Form, Nav, Row } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';

const LoginPage = () => {
    const [message, setMessage] = useState('');
    const [form, setForm] = useState({
        u_id: '',
        u_pass: ''
    });

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (form.u_id === '' || form.u_pass === '') {
            setMessage("아이디 및 비밀번호를 입력하세요.");
            return;
        }
        const result = await axios.post("/api/user/login", form);
        const check = result.data.check;
        const u_type = result.data.u_type;

        if (check === 0) {
            setMessage("존재하지 않는 사용자 입니다.");
        }
        else if (check === 1) {
            setMessage("비밀번호가 일치하지 않습니다.")
        }
        else if (u_type === 1 && check === 2) {
            sessionStorage.setItem("u_type", u_type);
            setMessage('');
            window.location.href="/";

        }
        else {
            setMessage("접근 권한이 없는 사용자입니다.");
        }
    }

    return (
        <>
            <Row className="justify-content-md-center">
                <h2 style={{ marginTop: "50px", textAlign: "center" }}>Sign in to here</h2>
                <Card className="my-3" style={{ width: '40%' }}>
                    <Row className="justify-content-md-center">
                        <Form className="my-4" style={{ width: '90%', textAlign: "left" }} onSubmit={onSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="text" placeholder="Enter ID" name="u_id" value={form.u_id} onChange={onChange} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="u_pass" value={form.u_pass} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button style={{ width: "100%" }} variant="primary" type="submit">
                                Sign in
                            </Button>
                        </Form>
                    </Row>
                </Card>
            </Row>
            <Row className="justify-content-md-center">
                <Card className="p-3" style={{ width: '40%', textAlign: "center" }}>
                    <Nav.Link style={{ color: "rgb(13, 110, 253)" }}>Create an account.</Nav.Link>
                </Card>
            </Row>
            {message &&
                <Row style={{ marginTop: "20px" }} className="justify-content-md-center">
                    <Alert key='primary' variant='primary' style={{ width: '40%', textAlign: "center" }}>
                        {message}
                    </Alert>
                </Row>
            }
        </>
    )
}

export default withRouter(LoginPage)