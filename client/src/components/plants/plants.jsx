import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { BsFillPencilFill } from 'react-icons/bs';
import { GoTrashcan } from 'react-icons/go'
import { Link } from "react-router-dom";
import Modal from "../modal/modal";
import './plants.css'

export const Plants = ()=>{

    //HACER FETCHS LOCALES EN TODOS LOS COMPONENETES O BUSCAR UNA FORMA DE ACTUALIZAR EL USEEFFECT DE USEAUTH PARA QUE SE ACTUALICEN LAS COLECCIONES UNA VEZ AGREGADOS EDITADOS O BORRADOS ALGUNOS ELEMENTOS

    const [ myPlants, setMyPlants ] = useState([]);
    const [ show, setShow ] = useState(false);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ confirm, setConfirm ] = useState(false);
    const [ plantName, setPlantName ] = useState('');
    const [ ID, setID ] = useState('');

    const { plants,authUser } = useAuth();

    const deletePlant = (id)=>{
        fetch(`http://localhost:8080/plants/${id}`, {method: 'DELETE'})
                .then((response)=> {
                    if(!response.ok){
                        throw new Error('Something went wrong')
                    }else{
                        setMyPlants(plants.filter(item=>item._id !== id))
                    }
            }).catch((e)=>console.log(e))
            setConfirm(true);
            localStorage.setItem('change', 1)
    }

    const handleClose = ()=>{
        setIsOpen(false);
        setConfirm(false)
    }

    const handleChange = (id, plant_name)=>{
        setIsOpen(true);
        setID(id);
        setPlantName(plant_name);
    }

    useEffect(()=>{
        plants && setMyPlants(plants.filter(plant => plant.user_id === authUser?._id))
        console.log(myPlants)
    }, [])

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
        <h1 id="title">My plants</h1>
        <div className="editButtons">
            <button onClick={()=>setShow(!show)}>{show ? 'Done' : 'Edit plants'}</button>
        </div>
        <div className="all_plants">
            {myPlants.map((plant)=>{
                const date = new Date(plant.germination_date);
                const dateString = date.toLocaleDateString('en-GB');
                return(
                    <div className="plant_card">
                        <div className={show ? "plantHeadersButtons" : "disabled" }>
                            <Link to={`/edit-plant/${plant._id}`}>
                                <BsFillPencilFill className="icon" />
                            </Link>
                            <GoTrashcan className="icon" onClick={()=>{
                                handleChange(plant._id, plant.plant_name)}}/>
                        </div>
                        <div className="plant_attribute">
                            <h4>Genetic</h4>
                            <span>{plant.plant_name}</span>
                        </div>
                        <div className="plant_attribute">
                            <h4>Family</h4>
                            <span>{plant.genetic}</span>
                        </div>
                        <div className="plant_attribute">
                            <h4>Germinated</h4>
                            <span>{dateString}</span>
                        </div>
                        <div className="plant_attribute">
                            <h4>Grow mode</h4>
                            <span>{plant.grow_mode}</span>
                        </div>
                    </div>
                )
            })}
        </div>
        </>
    )
};