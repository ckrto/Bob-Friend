import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap';

const ReviewItem = ({ reply, callReply }) => {

    useEffect(() => {
        callReply();
    }, []);

    return (
        <>
            <Card style={{ width: '100%' }}>
                <Card.Title></Card.Title>
                <Card.Body>
                    <Card.Text>
                        {reply.re_content} ({reply.re_date}) {reply.r_code}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default ReviewItem