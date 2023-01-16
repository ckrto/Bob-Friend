import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Figure, Form, Row } from 'react-bootstrap';

const MenuRead = ({ match, history }) => {
    const m_code = match.params.m_code;
    const s_code = match.params.s_code;

    const refFile = useRef();

    const [image, setImage] = useState("");
    const [photo, setPhoto] = useState("");
    const [menu, setMenu] = useState({
        m_code: m_code,
        s_code: s_code,
        m_name: "",
        m_price: "",
        m_photo: photo,
        file: null
    });
    const {m_name, m_price, file} = menu;

    const onChange = (e) => {
        setMenu({
            ...menu,
            [e.target.name]: e.target.value
        })
    }

    const onChangeFile = (e) => {
        // 이미지 미리보기
        var reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
        }
        reader.readAsDataURL(e.target.files[0]);

        const newMenu = {
            ...menu,
            file: e.target.files[0]
        }
        setMenu(newMenu);
    }

    const onSubmit = async(e) => {
        e.preventDefault();

        if(m_name === "" || m_price === "") {
            alert("필수 입력란을 확인해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("m_code", m_code);
        formData.append("s_code", s_code);
        formData.append("m_name", m_name);
        formData.append("m_price", m_price);
        formData.append("m_photo", photo);
        formData.append("file", file);
        // console.log(menu);

        if(!window.confirm("정보를 수정하시겠습니까?")) return;
        
        await axios.post('/api/menu/update', formData);
        alert("수정이 완료되었습니다.");
        history.push(`/menu/list/${s_code}`);
    }

    const callMenus = async() => {
        const result = await axios.post('/api/menu/read', menu);
        // console.log(result.data);
        setMenu(result.data);
        setPhoto(result.data.m_photo ? `${result.data.m_photo}` : "");
    };

    useEffect(() => {
        callMenus();
    }, []);

    return (
        <Form onSubmit={onSubmit}>
            <Row className="justify-content-md-center">
                <Card
                        className="my-3 py-4 px-5"
                        style={{width: "80%", textAlign: "left"}}>
                    <Row>
                        <Col xs lg="3">
                            <Figure.Image
                                    width={300}
                                    src={
                                        image ? image : photo ?
                                        `/api/display?fileName=${photo}` :
                                        "https://dummyimage.com/300"
                                    }
                                    onClick={() => refFile.current.click()}/>
                            <Form.Control
                                    type="file"
                                    style={{display: "none"}}
                                    ref={refFile}
                                    onChange={onChangeFile}/>
                        </Col>
                        <Col>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                    value={m_name}
                                    name="m_name"
                                    className="mb-3"
                                    onChange={onChange}/>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                    value={m_price}
                                    name="m_price"
                                    className="mb-3"
                                    onChange={onChange}/>
                        </Col>
                    </Row>
                </Card>
                <div>
                <Button
                        type="submit"
                        className="m-3"
                        style={{width: "30%"}}>수정하기
                </Button>
                <Button
                        className="m-3"
                        style={{width: "30%"}}
                        onClick={() => history.push(`/menu/list/${s_code}`)}>메뉴목록
                </Button>
                </div>
            </Row>
        </Form>
    )
}

export default MenuRead