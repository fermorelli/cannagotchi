import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../context/authContext"
import { auth } from "../../firebase/firebase";
import './home.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

export const Home = ()=>{

    const [ users, setUsers ] = useState([]);
    const [ showing, isShowing ] = useState(false);
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
        {user && authUser &&
        <>
        <div className="header">
            <h2>Welcome {authUser.firstName} {authUser.lastName}</h2>
        </div>
        <div className="body">
            <div className="user__card">
                <h3 className="title">My personal profile</h3>
                <div className="fields">
                    <span>Name</span>
                    <span className="data">{authUser.firstName}</span>
                    <span>Last name</span>
                    <span className="data">{authUser.lastName}</span>
                    <span>Email</span>
                    <span className="data">{authUser.email}</span>
                    <span>Password</span>
                    <div className="password">
                        <span className="data">{showing ? authUser.password : '********'}</span>
                        {!showing ? <AiOutlineEye onClick={()=>{isShowing(true)}} /> : <AiOutlineEyeInvisible onClick={()=>{isShowing(false)}} />}
                    </div>

                </div>
            </div>
        </div>
        </>
        }
        </>
    )
}