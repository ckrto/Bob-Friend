import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Button, Card, Figure, Form, Row } from 'react-bootstrap'

const MenuInsert = ({ history }) => {
    const s_code = sessionStorage.getItem("s_code");

    const refFile = useRef();

    const [image, setImage] = useState("");
    const [menu, setMenu] = useState({
        s_code: s_code,
        m_name: '',
        m_price: '',
        file: null        
    });
    const {m_name, m_price, file} = menu;

    const onChange = (e) => {
        setMenu({
            ...menu,
            [e.target.name]: e.target.value
        });
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

    const onSubmit = async (e) => {
        e.preventDefault();

        if(m_name === "" || m_price === "") {
            alert("필수 입력란을 확인해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("s_code", s_code);
        formData.append("m_name", m_name);
        formData.append("m_price", m_price);
        formData.append("m_photo", image);
        formData.append("file", file);
        // console.log(menu);

        if (!window.confirm("등록하시겠습니까?")) return;

        const result = await axios.post('/api/menu/insert', formData);
        console.log(result.data);
        if(result.data === 1) {
            alert("등록되었습니다.");
            history.push(`/menu/list/${s_code}`);
        } else {
            alert("이미 등록된 메뉴입니다.");
        }
    }

    return (
        <Row className="justify-content-md-center">
            <Card
                    className="my-3 py-4 px-5"
                    style={{width: "80%"}}>
                <Card.Title>메뉴 등록</Card.Title>
                <Form style={{textAlign: "left"}} onSubmit={onSubmit}>
                    <Form.Label >Menu name</Form.Label>
                    <Form.Control
                            onChange={onChange}
                            placeholder="Menu name"
                            className="mb-3"
                            name="m_name"
                            value={m_name}/>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                            onChange={onChange}
                            placeholder="Price"
                            className="mb-3"
                            name="m_price"
                            value={m_price}/>
                    <hr />
                    <Figure.Image
                            width={200}
                            src={image ? image : "https://dummyimage.com/300"}
                            onClick={() => refFile.current.click()}/>
                    <Form.Control
                                type="file"
                                style={{display: "none"}}
                                ref={refFile}
                                onChange={onChangeFile}/>
                    <br />
                    <Button
                        className="m-3"
                        type="submit"
                        style={{ width: "82%" }}>등록하기
                    </Button>
                </Form>
            </Card>
            <div>

            </div>
        </Row>
    )
}

export default MenuInsert