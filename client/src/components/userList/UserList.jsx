import { useEffect } from "react";
import { useState } from "react";
import { GetUser } from "../getUser.jsx/GetUser"

export const UserList = ()=> {

    const [ users, setUsers ] = useState([]);

    const getUsers = async () =>{
        const response = await fetch('http://localhost:5000/');
        const data = response.json();
        setUsers(data);
    }

    useEffect(()=>{
        getUsers();
    })

    console.log(users);

    return (
        <div id="#home">
            <h2>Lista de usuarios</h2>
            <p>{users.map((user)=>{return(<p>{user.firstName}</p>)})}</p>
            <GetUser />
        </div>
    )
}