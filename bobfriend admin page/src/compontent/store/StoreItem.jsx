import axios from 'axios';
import React, { useEffect } from 'react'
import { Button, Nav } from 'react-bootstrap';

const StoreItem = ({ store, callStores }) => {
    const { s_code, c_type, s_name, s_location, s_tel, s_admin } = store;

    const onClick = async () => {
        if (!window.confirm(`${s_code} 매장을 삭제하시겠습니까?`)) return;
        await axios.post(`/api/store/delete/${s_code}`);
        alert("삭제되었습니다.");
    }

    useEffect(() => {
        callStores();
    }, [])

    return (
        <tr>
            {/* s_c_code view 생성 요망 */}
            <td>{c_type}</td>
            <td>
                <Nav.Link href={`/store/read/${s_code}`}>{s_name}</Nav.Link>
            </td>
            <td>{s_location}</td>
            <td>{s_tel}</td>
            <td>{s_admin}</td>
            <td>
                <Button
                    style={{ backgroundColor: "orange", borderColor: "orange" }}
                    onClick={onClick}>삭제
                </Button>
            </td>
        </tr>
    )
}

export default StoreItem