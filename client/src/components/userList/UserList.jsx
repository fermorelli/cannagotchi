import { useEffect } from "react";
import { useState } from "react";
import './userlist.css';
import { BsFillPencilFill } from 'react-icons/bs';
import { GoTrashcan } from 'react-icons/go'

export const UserList = ()=> {

    const [ users, setUsers ] = useState([]);

    const getUsers = async () =>{
        const response = await fetch('http://localhost:8080/users');
        const data = await response.json();
        setUsers(data.data);
    }

    console.log(users);

    useEffect(()=>{
        getUsers();
    },[])

    return (
        <div id="#home" className="all">
            <h2 className="title">Users List</h2>
            <div className="userList">
                {users.map((user)=>{
                    return(
                        <div className="userCard">
                            <div className="header">
                                <h3>{user.firstName} {user.lastName}</h3>
                                <div className="headerButtons">
                                    <BsFillPencilFill />
                                    <GoTrashcan />
                                </div>
                            </div>
                            <span>{user.email}</span>
                        </div>
                    )})
                }
            </div>
        </div>
    )
}