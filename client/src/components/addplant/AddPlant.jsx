import { useState } from 'react'
import Modal from '../modal/modal';
import { Link } from 'react-router-dom';
import '../adduser/adduser.css'
import { appendErrors, useForm } from 'react-hook-form';
import { schema } from './validations';
import { joiResolver } from '@hookform/resolvers/joi';
import { useEffect } from 'react';


export const AddPlant = ()=> {

    const [ userId, setUserId ] = useState('')
    const [ plantName, setPlantName ] = useState('');
    const [ genetic, setGenetic ] = useState('');
    const [ date, setDate ] = useState('');
    const [ growMode, setGrowMode ] = useState('');
    const [ auto, setAuto ] = useState(false);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ success, isSuccess ] = useState(false);
    const [ plants, setPlants ] = useState([]);

    const addPlant = (e)=>{
        e.preventDefault();

        setUserId(localStorage.getItem('authUserId'));

        fetch('http://localhost:8080/plants', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                user_id: userId,
                plant_name: plantName,
                genetic: genetic,
                grow_mode: growMode,
                auto: auto,
                germination_date: date
            })})
            .then((response) => response.json())
            .then((data) => {
                if(data.error===false){
                    isSuccess(true)
                    setIsOpen(true)
                }
            })
            .catch((err) => {
                console.log(err.message);
                isSuccess(false);
            });
    }

    const handleClose = ()=>{
        setIsOpen(false);
        setPlantName('');
        setGenetic('');
        setDate('');
        setGrowMode('');
        setAuto(false);
        setUserId('');
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
        resolver: joiResolver(schema)
    });

    return (
        <div className="all">
            {isOpen &&
            <Modal setIsOpen={setIsOpen} modalTitle={success===true? "Success" : "Something went wrong"}>
                <p>{success ? "User successfully added" : null}</p>
                <div className='addModalButtons'>
                    <Link to={'/'}>
                        <button onClick={handleClose}>Go back</button>
                    </Link>
                    <Link to={'/add-user'}>
                        <span onClick={handleClose}>Add another user</span>
                    </Link>
                </div>
            </Modal>}
            <div className="title">
                <h2>Add a new plant</h2>
            </div>
            <div className="form">
                <form action="" onSubmit={handleSubmit(addPlant)}>
                    <label htmlFor="">Plant Name</label>
                    <input type="text" {...register('plantName')} name="plantName" error={appendErrors.plantName?.message} value={plantName} onChange={(e)=>{setPlantName(e.target.value)}}/>
                        {errors.plantName && <span>{errors.plantName?.message}</span>}
                    <label htmlFor="">Genetic Family</label>
                    <select name="genetic" {...register('genetic')} error={appendErrors.genetic?.message} value={genetic} onChange={(e)=>{setGenetic(e.target.value)}}>
                        <option value="Indica">Indica</option>
                        <option value="Indica-dominating breed">Indica-dominating breed</option>
                        <option value="Sativa">Sativa</option>
                        <option value="Sativa-dominating breed">Sativa-dominating breed</option>
                    </select>
                    <label htmlFor="">Grow mode</label>
                    <select name="genetic" {...register('growMode')} error={appendErrors.growMode?.message} value={growMode} onChange={(e)=>{setGrowMode(e.target.value)}}>
                        <option value="Exterior">Exterior</option>
                        <option value="Interior">Interior</option>
                    </select>
                    <label htmlFor="">Germination date</label>
                    <input type="date" {...register('date')} name="date" error={appendErrors.date?.message} value={date} onChange={(e)=>{setDate(e.target.value)}}/>
                    <div className='auto'>
                        <label htmlFor="">Auto</label>
                        <input type="checkbox" {...register('auto')} name="auto" error={appendErrors.auto?.message} value={auto} onChange={(e)=>{setAuto(e.target.value)}}/>
                    </div>
                    <div className='formButtons'>
                        <button action="submit" type="submit" onClick={addPlant}>Add</button>
                        <Link to={'/'}>
                            <button>Go back</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
