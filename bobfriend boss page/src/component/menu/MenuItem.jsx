import { TableCell, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Figure, Nav } from 'react-bootstrap';

const MenuItem = ({ menu, callMenus }) => {
    const { m_code, s_code, m_name, m_price, m_photo } = menu;
    const number2 = m_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const [image, setImage] = useState("");

    const onClickDelete = async () => {
        if (!window.confirm(`${m_name} 메뉴를 삭제하시겠습니까?`)) return;

        await axios.post('/api/menu/delete', menu);
        alert(`${m_name} 메뉴가 삭제되었습니다.`);
        callMenus();
    }

    useEffect(() => {
        callMenus();
        // console.log(menu);

        if (m_photo) setImage(`/api/display?fileName=${m_photo}`)
        else setImage("https://dummyimage.com/100")
    }, [])

    return (
        <TableRow>
            <TableCell align="center">{m_code}</TableCell>
            <TableCell component="th" scope="row" align='center'>
                <Figure.Image
                    width={100}
                    src={image} />
            </TableCell>
            <TableCell align="center"><Nav.Link href={`/menu/read/${s_code}/${m_code}`}>{m_name}</Nav.Link></TableCell>
            <TableCell align="center">{number2}원</TableCell>
            <TableCell align="center">
                <Button
                    variant="outline-danger"
                    onClick={onClickDelete}>Delete
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default MenuItem