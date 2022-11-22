import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import './home.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs';

export const Home = ()=>{

    const [ users, setUsers ] = useState([]);
    const [ showing, isShowing ] = useState(false);
    const [ authUser, setAuthUser ] = useState({});
    const [ plants, setPlants ] = useState([]);

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
        setPlants(authUser.plants);
        localStorage.setItem('id', authUser._id);
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
                <div className="card__header">
                    <h3 className="title">My personal profile</h3>
                    <Link to={`/edit-user/${authUser._id}`}>
                        <BsFillPencilFill/>
                    </Link>
                </div>
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
                    <span>Plants</span>
                    <p>{plants?.length}</p>
                </div>
            </div>
        </div>
        </>
        }
        </>
    )
}