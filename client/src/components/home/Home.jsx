import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../context/authContext"
import './home.css';

export const Home = ()=>{

    const [ users, setUsers ] = useState([]);

    const [ id, setId ] = useState('')

    const [ authUser, setAuthUser ] = useState({})

    const { user } = useAuth();

    const currentUser = user;

    const getUsers = async () => {
        const response = await fetch('http://localhost:8080/users');
        const data = await response.json();
        setUsers(data.data);
        users.map((user)=>{
            if(user.email===currentUser.email){
                return setId(user._id);
            }
            return(
                console.log('id: ',id)
            )
        })
    }

    const getCurrentUser = async ()=>{
        const response = await fetch(`http://localhost:8080/users/${id}`);
        const data = await response.json();
        console.log('current user: ', data.data)
        setAuthUser(data.data)
    }

    useEffect(()=>{
        getUsers()
        getCurrentUser()
    },[])

    return (
        <>
        <div className="header">
            {user &&
                <h2>Welcome {currentUser.email}</h2>}
        </div>
        {authUser &&
            <div className="body">
                <div className="user__card">
                        <h3>{authUser.firstName} {authUser.lastName}</h3>
                </div>
            </div>
        }
        </>
    )
}