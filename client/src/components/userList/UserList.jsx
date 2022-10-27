import { useEffect } from "react";
import { useState } from "react";
import { GetUser } from "../getUser.jsx/GetUser"

export const UserList = ()=> {

    const [ users, setUsers ] = useState([]);

    const getUsers = async () =>{
        const response = await fetch('http://localhost:8080/users');
        const data = await response.json();
        setUsers(data.data);
    }

    useEffect(()=>{
        getUsers();
    },[users])

    return (
        <div id="#home">
            <h2>Lista de usuarios</h2>
            <p>{users.map((user)=>{return(<p>{user.firstName}</p>)})}</p>
            <GetUser />
        </div>
    )
}