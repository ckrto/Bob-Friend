import axios from 'axios';
import React from 'react'
import { Button, Nav } from 'react-bootstrap';

const UserItem = ({ user,callUsers }) => {
    const { u_code, u_name, u_address, u_id, u_status } = user;

    const onClickDel=async()=>{
        await axios.post(`/api/user/delete/${u_code}`);
        callUsers();
    }

    const onClickRe=async()=>{
        await axios.post(`/api/user/recover/${u_code}`);
        callUsers();
    }

    return (
        <>
            <tr>
                <td>{u_code}</td>
                <td><Nav.Link href={`/user/read/${u_code}`}>{u_name}</Nav.Link></td>
                <td>{u_id}</td>
                <td>{u_address}</td>
                <td>
                    {u_status ?
                        <Button style={{backgroundColor : "orange", borderColor : "orange"}} onClick={onClickDel}>삭제</Button>
                        :
                        <Button style={{backgroundColor : "orange", borderColor : "orange"}} onClick={onClickRe}>복구</Button>
                    }
                </td>
            </tr>
        </>
    )
}

export default UserItem