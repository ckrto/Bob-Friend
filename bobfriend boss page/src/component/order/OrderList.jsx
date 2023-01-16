import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Accordion, Button, Card, Form } from 'react-bootstrap';
import OrderItem from './OrderItem';

const OrderList = ({ post }) => {

    const s_code = sessionStorage.getItem("s_code");

    const [users, setUsers] = useState('');
    const [orders, setOrder] = useState([]);

    const callOrder = async () => {
        const result = await axios.get(`/api/cart/orderlist/${post.p_code}`);
        setOrder(result.data);
    }

    const callUsers = async () => {
        const result = await axios.get(`/api/user/read/${post.u_code}`);
        setUsers(result.data);

    }

    useEffect(() => {
        callUsers();
        callOrder();
    }, []);

    if(!post) {
        return <h1>로딩중...</h1>
    }

    return (
        <Form style={{ marginLeft: "20px" }}>
            <Accordion defaultActiveKey="1">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>작성자 : {users.u_id} 제목 : {post.p_title} ({post.p_date})</Accordion.Header>
                    <Accordion.Body>
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                {post.p_code ?
                                    <>
                                        {orders.map(order =>
                                            <OrderItem order={order} callOrder={callOrder} />
                                        )}
                                        <Button style={{ marginLeft: "1250px", marginTop : "20px", backgroundColor : "#F76A12", borderColor : "#F76A12" }}>배달 시작</Button>
                                    </>
                                    :
                                    <>
                                    </>
                                }


                            </Card.Body>
                        </Card>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Form>
    )
}

export default OrderList