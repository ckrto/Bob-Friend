import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Figure, Form, Row } from 'react-bootstrap'

const StoreRead = ({ match, history }) => {
    const s_code = match.params.s_code;

    const refFile = useRef();

    const [image, setImage] = useState("");
    const [store, setStore] = useState({
        s_code: s_code,
        s_c_code: "",
        s_name: "",
        s_location: "",
        s_tel: "",
        s_admin: "",
        s_photo: image,
        file: null
    });
    const {s_c_code, s_name, s_location, s_tel, s_admin, s_photo, file} = store;

    const onChange = (e) => {
        setStore({
            ...store,
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

        const newStore = {
            ...store,
            file: e.target.files[0]
        }
        setStore(newStore);
    }

    const onSubmit = async(e) => {
        e.preventDefault();

        if(s_c_code === "" || s_name === "" || s_location === ""
                || s_tel === "" || s_admin === "") {
            alert("필수 입력란을 확인해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("s_code", s_code);
        formData.append("s_c_code", s_c_code);
        formData.append("s_name", s_name);
        formData.append("s_location", s_location);
        formData.append("s_tel", s_tel);
        formData.append("s_admin", s_admin);
        formData.append("s_photo", s_photo);
        formData.append("file", file);
        // console.log(store);

        if(!window.confirm("정보를 수정하시겠습니까?")) return;
        await axios.post('/api/store/update', formData);
        alert("수정이 완료되었습니다.");
        history.push('/store/list');
    }

    const callStore = async() => {
        const result = await axios.get(`/api/store/read/${s_code}`);
        setStore(result.data);

        // console.log(result.data.s_photo);

        if(result.data.s_photo) setImage(`/api/display?fileName=${result.data.s_photo}`)
        else setImage("https://dummyimage.com/300")
    };

    useEffect(() => {
        callStore();
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
                                    src={image}
                                    onClick={() => refFile.current.click()}/>
                            <Form.Control
                                    type="file"
                                    style={{display: "none"}}
                                    ref={refFile}
                                    onChange={onChangeFile}/>
                        </Col>
                        <Col>
                            <Form.Label>Code</Form.Label>
                            <Form.Control
                                    value={s_code}
                                    className="mb-3"
                                    disabled={true}/>
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                    value={s_c_code}
                                    name="s_c_code"
                                    className="mb-3"
                                    onChange={onChange}>
                                <option>Please select a category</option>
                                <option value="1">1. 한식</option>
                                <option value="2">2. 일식</option>
                                <option value="3">3. 중식</option>
                                <option value="4">4. 패스트푸드</option>
                                <option value="5">5. 기타</option>
                            </Form.Select>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                    value={s_name}
                                    name="s_name"
                                    className="mb-3"
                                    onChange={onChange}/>
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                    value={s_location}
                                    name="s_location"
                                    className="mb-3"
                                    onChange={onChange}/>
                            <Form.Label>Tel</Form.Label>
                            <Form.Control
                                    value={s_tel}
                                    name="s_tel"
                                    className="mb-3"
                                    onChange={onChange}/>
                            <Form.Label>Admin</Form.Label>
                            <Form.Control
                                    value={s_admin}
                                    name="s_admin"
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
                        onClick={() => history.go(-2)}>매장목록
                </Button>
                </div>
            </Row>
        </Form>
    )
}

export default StoreRead