import { useEffect, useState } from "react";
import './userlist.css';
import { BsFillPencilFill } from 'react-icons/bs';
import { GoTrashcan } from 'react-icons/go'
import { Link } from "react-router-dom";
import swal from 'sweetalert';

export const UserList = ()=> {

    const [ users, setUsers ] = useState([]);
    const [ show, setShow ] = useState(false);

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
            text: "Once deleted, you will not be able to recover this user!",
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
            swal("User successfully deleted", {
                icon: "success",
            });
            }
          });
    }

    return (
        <div id="#home" className="all">
            <div className="header">
                <h2 className="title">Users List</h2>
                <div className="editButtons">
                    <button onClick={()=>setShow(true)} className={!show ? "" : "disabled" }>Edit users</button>
                    <button onClick={()=>setShow(false)} className={show ? "" : "disabled" }>Done</button>
                </div>
            </div>
            <div className="userList">
                {users.map((user)=>{
                    return(
                        <div className="userCard" key={user._id}>
                            <div className="header">
                                <h3>{user.firstName} {user.lastName}</h3>
                                <div className={show ? "headersButtons" : "disabled" }>
                                    <Link to={`/edit-user/${user._id}`}>
                                        <BsFillPencilFill className="icon" />
                                    </Link>
                                    <GoTrashcan className="icon" onClick={()=>deleteUser(user._id)}/>
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