import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Accordion, Button, Card, Figure, Form } from 'react-bootstrap';
import ReviewItem from './ReviewItem';

const ReviewList = ({ review, callReview }) => {

    const u_code = sessionStorage.getItem("u_code");
    const s_code = sessionStorage.getItem("s_code");

    const [image, setImage] = useState("");
    const [replys, setReplys] = useState([]);
    const [reply, setReply] = useState({
        r_code: review.r_code,
        s_code: s_code,
        u_code: u_code,
        re_content: ''
    });

    const { re_content } = reply;

    const callReply = async () => {
        const result = await axios.get(`/api/reply/uread/${review.r_code}`);
        setReplys(result.data.reply);
    }

    const onChange = (e) => {
        setReply({
            ...reply,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (re_content === "") {
            alert("필수 입력란을 확인해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("r_code", review.r_code);
        formData.append("s_code", s_code);
        formData.append("u_code", u_code);
        formData.append("re_content", re_content);

        if (!window.confirm("등록하시겠습니까?")) return;


        const result = await axios.post('/api/reply/insert', formData);
        const update = await axios.post(`/api/review/reviewupdate/${review.r_code}`);
        alert("등록되었습니다.");
        callReply();
        callReview();
    }

    useEffect(() => {
        callReview();
        callReply();
        if (review.r_photo) setImage(`/api/display?fileName=${review.r_photo}`)
        else setImage("https://dummyimage.com/100")
    }, [])

    if (!review) return <h1>Loading...</h1>

    return (
        <Form onSubmit={onSubmit} style={{ marginLeft: "20px" }}>
            <Accordion defaultActiveKey="1">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{review.r_code} {review.u_id} ({review.review_date})</Accordion.Header>
                    <Accordion.Body>
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                <Figure.Image
                                    width={100}
                                    src={image} />
                                <Card.Text>
                                    {review.r_content}
                                </Card.Text>
                                {review.r_reply === '1' ?
                                    <>
                                        {replys.map(reply => <ReviewItem key={reply.r_code} reply={reply} callReply={callReply} />)}
                                    </>
                                    :
                                    <>
                                        <Form.Control type="text" onChange={onChange} name="re_content" value={re_content} placeholder='답글을 입력해주세요.' />
                                        <Button type="submit">답글 달기</Button>
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

export default ReviewList