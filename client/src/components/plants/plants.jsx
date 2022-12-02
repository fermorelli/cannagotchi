import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { AiFillPlusCircle } from 'react-icons/ai'
// import { BsFillPencilFill } from 'react-icons/bs';
// import { GoTrashcan } from 'react-icons/go'
import { Link } from "react-router-dom";
// import Modal from "../modal/modal";
import './plants.css'

export const Plants = ()=>{

    const [ myPlants, setMyPlants ] = useState([]);
    // const [ show, setShow ] = useState(false);
    // const [ isOpen, setIsOpen ] = useState(false);
    // const [ confirm, setConfirm ] = useState(false);
    // const [ plantName, setPlantName ] = useState('');
    // const [ ID, setID ] = useState('');

    const { plants, authUser} = useAuth();

    useEffect(()=>{
        plants && setMyPlants(plants.filter(plant => plant.user_id === authUser?._id))
    }, [])

    // const deletePlant = (id)=>{
    //     fetch(`http://localhost:8080/plants/${id}`, {method: 'DELETE'})
    //             .then((response)=> {
    //                 if(!response.ok){
    //                     throw new Error('Something went wrong')
    //                 }else{
    //                     setMyPlants(myPlants.filter(item=>item._id !== id))
    //                     isDeleted(true);
    //                 }
    //         }).catch((e)=>console.log(e))
    //         setConfirm(true);
    //         localStorage.setItem('change', 1)
    // }

    // const handleClose = ()=>{
    //     setIsOpen(false);
    //     setConfirm(false)
    //     isDeleted(false);
    // }

    // const handleChange = (id, plant_name)=>{
    //     setIsOpen(true);
    //     setID(id);
    //     setPlantName(plant_name);
    // }

    return (
        <>
        {/* {isOpen &&
            <Modal setIsOpen={setIsOpen} modalTitle={!confirm ? "Are you sure you want to delete this plant?" : "Plant successfully deleted"}>
                {confirm ? <p>{plantName} was deleted</p> : <p>This action cannot be undone</p> }
                <div className='addModalButtons'>
                    <button onClick={()=>deletePlant(ID, plantName)} className={confirm? "disabled" : null}>Delete</button>
                    <Link to={'/plants'}>
                        <span onClick={handleClose}>{!confirm? 'Cancel' : 'Go back'}</span>
                    </Link>
                </div>
            </Modal>} */}
        <div className="header">
            <h1 id="title">My plants</h1>
            <Link to={'/add-plant'}>
                <AiFillPlusCircle/>
            </Link>
        </div>
        {/* <div className="editButtons">
            <button onClick={()=>setShow(!show)}>{show ? 'Done' : 'Edit plants'}</button>
        </div> */}
        <div className="all_plants">
            {myPlants.map((plant)=>{
                const date = new Date(plant.germination_date);
                const dateString = date.toLocaleDateString('en-GB');
                return(
                    <Link to={`/plants/${plant._id}`}>
                        <div className="plant_card">
                            {/* <div className={show ? "plantHeadersButtons" : "disabled" }>
                                <Link to={`/edit-plant/${plant._id}`}>
                                    <BsFillPencilFill className="icon" />
                                </Link>
                                <GoTrashcan className="icon" onClick={()=>{
                                    handleChange(plant._id, plant.plant_name)}}/>
                            </div> */}
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
                    </Link>
                )
            })}
        </div>
        </>
    )
};