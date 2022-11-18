import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../context/authContext"
import { auth } from "../../firebase/firebase";
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
        aver();
    }

    const finding = (user)=>{
        return user?.email === currentUser?.email;
    }

    const aver = ()=>{
        setAuthUser(users.find(finding));
        console.log('a: ', authUser)
    }

    useEffect(()=>{
        getUsers()
    },[authUser])

    return (
        <>
        <div className="header">
            {user &&
                <h2>Welcome {currentUser?.email}</h2>}
        </div>
        {authUser && user &&
            <div className="body">
                <div className="user__card">
                        <h3>{authUser.firstName} {authUser.lastName}</h3>
                </div>
            </div>
        }
        </>
    )
}