import { useEffect, useState } from "react";
import './userlist.css';
import { BsFillPencilFill } from 'react-icons/bs';
import { GoTrashcan } from 'react-icons/go'
import { Link } from "react-router-dom";
import Modal from "../modal/modal";
import { useAuth } from "../../context/authContext";
import { useNavigate } from 'react-router-dom';

export const UserList = ()=> {

    const [ users, setUsers ] = useState([]);
    const [ show, setShow ] = useState(false);
    const [ list, setList ] = useState(false);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ confirm, setConfirm ] = useState(false);
    const [ ID, setID ] = useState('');
    const [ name, setName ] = useState('');
    const [ lastname, setLastName ] = useState('');
    const [ loggedUser, setLoggedUser ] = useState({});

    const navigate = useNavigate();

    const { user, logout } = useAuth();
    const localUser = JSON.parse(localStorage.getItem('user'));

    const handleLogOut = async () => {
        await logout();
        navigate('/')
    }

    const id = localStorage.getItem('id');

    const ifPrevData = ()=>{
        if(id.length>0){
            setList(true)
            setShow(true)
        }
    }

    const getUsers = async () =>{
        const response = await fetch('http://localhost:8080/users');
        const data = await response.json();
        setUsers(data.data);
        user ? setLoggedUser(user) : setLoggedUser(localUser);
        ifPrevData();
    }

    // const pairUsers = ()=> {
    //     users.map((user)=>{
    //         if(user.email.match(loggedUser.email)){
    //             setLoggedUserName(user.name)
    //         } return(
    //             console.log('name: ', loggedUserName)
    //         )
    //     })
    // }

    useEffect(()=>{
        getUsers();
        localStorage.removeItem('id');
    },[user])

    const handleChange = (id, firstName, lastName)=>{
        setIsOpen(true);
        setID(id);
        setName(firstName);
        setLastName(lastName);
    }

    const handleClose = ()=>{
        setIsOpen(false);
        setConfirm(false)
    }

    const deleteUser = (id, firstName, lastName)=>{
        fetch(`http://localhost:8080/${id}`, {method: 'DELETE'})
                .then((response)=> {
                    if(!response.ok){
                        throw new Error('Something went wrong')
                    }else{
                        setUsers(users.filter(item=>item._id !== id))
                    }
            }).catch((e)=>console.log(e))
            setConfirm(true);
    }

    return (
        <div id="#home" className="all">
            {isOpen &&
            <Modal setIsOpen={setIsOpen} modalTitle={!confirm ? "Are you sure you want to delete this user?" : "User successfully deleted"}>
                {confirm ? <p>{name} {lastname} was deleted</p> : <p>This action cannot be undone</p> }
                <div className='addModalButtons'>
                    <button onClick={()=>deleteUser(ID, name, lastname)} className={confirm? "disabled" : null}>Delete</button>
                    <Link to={'/users'}>
                        <span onClick={handleClose}>{!confirm? 'Cancel' : 'Go back'}</span>
                    </Link>
                </div>
            </Modal>}
            {user ? <span>Welcome {loggedUser?.email}</span> : <span>Welcome {localUser?.email}</span>}
            <div className="header">
                <h2 onClick={()=>{
                    setList(!list)
                    setShow(false);
                    }} className="title">{list ? "Hide user list" : "Show user list"}</h2>
                <div className="editButtons">
                    <button onClick={()=>setShow(true)} className={!show && list ? "" : "disabled" }>Edit users</button>
                    <button onClick={()=>setShow(false)} className={show ? "" : "disabled" }>Done</button>
                </div>
            </div>
            <button onClick={handleLogOut}>Log out</button>
            <div className={list ? "userList" : "disabled"}>
                {users.map((user)=>{
                    return(
                        <div className="userCard" key={user._id}>
                            <div className="header">
                                <h3>{user.firstName} {user.lastName}</h3>
                                <div className={show ? "headersButtons" : "disabled" }>
                                    <Link to={`/edit-user/${user._id}`}>
                                        <BsFillPencilFill className="icon" />
                                    </Link>
                                    <GoTrashcan className="icon" onClick={()=>{
                                        handleChange(user._id, user.firstName, user.lastName)}}/>
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