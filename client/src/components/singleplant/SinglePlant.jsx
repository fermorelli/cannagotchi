import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { BsFillPencilFill } from 'react-icons/bs';
import { GoTrashcan } from 'react-icons/go'
import Modal from "../modal/modal";
import './singleplant.css';

export const SinglePlant = () => {
    const [ plant, setPlant ] = useState({});
    const [ isOpen, setIsOpen ] = useState(false);
    const [ confirm, setConfirm ] = useState(false);
    const [ plantName, setPlantName ] = useState('');
    const [ ID, setID ] = useState('');


    const { isDeleted } = useAuth();

    const params = useParams();
    const id = params.id;

    const navigate = useNavigate();

    const getPlant = () => {
        fetch(`http://localhost:8080/plants/${id}`)
        .then(response=>response.json())
        .then(data=>setPlant(data.data))
    }


    useEffect(()=>{
        getPlant()
    },[])

    const deletePlant = (id)=>{
        fetch(`http://localhost:8080/plants/${id}`, {method: 'DELETE'})
                .then((response)=> {
                    if(!response.ok){
                        throw new Error('Something went wrong')
                    }else{
                        isDeleted(true);
                    }
            }).catch((e)=>console.log(e))
            setConfirm(true);
            localStorage.setItem('change', 1)
    }

    const handleClose = ()=>{
        setIsOpen(false);
        setConfirm(false)
        isDeleted(false);
    }

    const handleChange = (id, plant_name)=>{
        setIsOpen(true);
        setID(id);
        setPlantName(plant_name);
    }

    const date = new Date(plant.germination_date);
    const dateString = date.toLocaleDateString('en-GB');

    return (
        <>
        {isOpen &&
            <Modal setIsOpen={setIsOpen} modalTitle={!confirm ? "Are you sure you want to delete this plant?" : "Plant successfully deleted"}>
                {confirm ? <p>{plantName} was deleted</p> : <p>This action cannot be undone</p> }
                <div className='addModalButtons'>
                    <button onClick={()=>deletePlant(ID, plantName)} className={confirm? "disabled" : null}>Delete</button>
                    <Link to={'/plants'}>
                        <span onClick={handleClose}>{!confirm? 'Cancel' : 'Go back'}</span>
                    </Link>
                </div>
            </Modal>}
        <div className="all">
            <div className="card">
                <div className="card_header">
                    <h2>{plant.plant_name}</h2>
                    <div className="plantHeadersButtons">
                        <Link to={`/edit-plant/${plant._id}`}>
                            <BsFillPencilFill className="icon" />
                        </Link>
                        <GoTrashcan className="icon" onClick={()=>{handleChange(plant._id, plant.plant_name)}}/>
                    </div>
                </div>
                <span>{plant.genetic}</span>
                <span>{dateString}</span>
                <span>{plant.grow_mode}</span>
            </div>
            <button className='button' onClick={()=>navigate(-1)}>Go back</button>
        </div>
        </>
    )
};