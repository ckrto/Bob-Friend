import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';

const OrderItem = ({ order, callOrder }) => {

    const [users, setUsers] = useState('');
    const callUsers = async () => {
        const result = await axios.get(`/api/user/read/${order.u_code}`);
        setUsers(result.data);

    }

    useEffect(() => {
        callUsers();
        callOrder();
    }, []);

    return (
        <>
            <Card style={{ width: '100%' }}>
                <Card.Title></Card.Title>
                <Card.Body>
                    <Card.Text>
                        참여자 아이디 : {users.u_id}
                    </Card.Text>
                    <Card.Text>
                        주문 메뉴 : {order.m_name}
                    </Card.Text>
                    <Card.Text>
                        가격 : {order.m_price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default OrderItem