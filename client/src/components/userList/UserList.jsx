import { useEffect } from "react";
import { useState } from "react";
import './userlist.css';
import { BsFillPencilFill } from 'react-icons/bs';
import { GoTrashcan } from 'react-icons/go'
import { Link } from "react-router-dom";
import swal from 'sweetalert';

export const UserList = ()=> {

    const [ users, setUsers ] = useState([]);

    const getUsers = async () =>{
        const response = await fetch('http://localhost:8080/users');
        const data = await response.json();
        setUsers(data.data);
    }

    useEffect(()=>{
        getUsers();
    },[])


    const deleteUser = (id)=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                fetch(`http://localhost:8080/${id}`, {method: 'DELETE'})
                .then((response)=> {
                    if(!response.ok){
                        throw new Error('Something went wrong')
                    }else{
                        setUsers(users.filter(item=>item._id !== id))
                    }
            }).catch((e)=>console.log(e))
            swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
            });
            } else {
              swal("Your imaginary file is safe!");
            }
          });
    }

    return (
        <div id="#home" className="all">
            <h2 className="title">Users List</h2>
            <div className="userList">
                {users.map((user)=>{
                    return(
                        <div className="userCard" key={user._id}>
                            <div className="header">
                                <h3>{user.firstName} {user.lastName}</h3>
                                <div className="headerButtons">
                                    <Link to={'/edit-user'}>
                                        <BsFillPencilFill />
                                    </Link>
                                    <GoTrashcan onClick={()=>deleteUser(user._id)}/>
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