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
    const [ date, setDate ] = useState('');

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
        setDate(plants.germination_date);
    }

    useEffect(()=>{
        getUsers()
    },[authUser])

    // const harvest = ()=>{

    // }

    return (
        <>
        {user && authUser &&
        <>
        <button onClick={()=>{
            console.log(plants.plant_family)
        }}>dale</button>
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
                    <div className="all_plants">{plants?.map((plant)=>{
                            // const date = plant.germination_date;
                            // const family = plant.plant_family;
                            // const miliDate = Date.parse(date);
                            // const fourMonths = 10368000000;
                            // const threeMonths = 7776000000;
                            // const operationS = miliDate + fourMonths;
                            // const finalDateS = new Date(operationS);
                            // const resultS = finalDateS.toLocaleString('en-GB')
                            // const operationI = miliDate + threeMonths;
                            // const finalDateI = new Date(operationI);
                            // const resultI = finalDateI.toLocaleString('en-GB')
                            // switch (family) {
                            //     case 'Indica' :
                            //         console.log(resultI);
                            //         break;
                            //     case 'Sativa':
                            //         console.log(resultS)
                            //         break;
                            //     default:
                            //         console.log('nada');
                            // }
                            return(
                                <div className="plant_card">
                                    <div className="plant_attribute">
                                        <span>Genetic</span>
                                        <span>{plant.plant_name}</span>
                                    </div>
                                    <div className="plant_attribute">
                                        <span>Family</span>
                                        <span>{plant.plant_family}</span>
                                    </div>
                                    <div className="plant_attribute">
                                        <span>Germinated</span>
                                        <span>{plant.germination_date}</span>
                                    </div>
                                    <div className="plant_attribute">
                                        <span>Potentially harvest date</span>
                                        <span>{date}</span>
                                    </div>
                                </div>
                            )
                    })}</div>
                </div>
            </div>
        </div>
        </>
        }
        </>
    )
}