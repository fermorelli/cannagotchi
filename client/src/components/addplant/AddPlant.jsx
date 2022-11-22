import { useState } from 'react'
import Modal from '../modal/modal';
import { Link } from 'react-router-dom';
import '../adduser/adduser.css'
import { appendErrors, useForm } from 'react-hook-form';
import { schema } from './validations';
import { joiResolver } from '@hookform/resolvers/joi';
import { useEffect } from 'react';


export const AddPlant = ()=> {

    const [ plantName, setPlantName ] = useState('');
    const [ genetic, setGenetic ] = useState('');
    const [ date, setDate ] = useState('');
    const [ growMode, setGrowMode ] = useState('');
    const [ isOpen, setIsOpen ] = useState(false);
    const [ success, isSuccess ] = useState(false);
    const [ plants, setPlants ] = useState([]);
    const [refresh, setRefresh] = useState('');

    const id = localStorage.getItem('id');

    useEffect(()=>{
        fetch(`http://localhost:8080/users/${id}`)
        .then((response) => response.json())
        .then((response) => {
        console.log('data: ', response.data)
        setPlants(response.data.plants);
        console.log('plants before: ', plants);
      });
    },[refresh])

    const addPlant = async (plant)=>{

        const res = await fetch('http://localhost:8080/plants', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(plant)
            });
        const data = await res.json();

        setPlants([...plants, data]);

        console.log('plants after: ', plants)

        if(data.error===false){
            setRefresh('');
            isSuccess(true)
            setIsOpen(true)
        }else if (data.error===true){
            console.log(data.error.message);
            isSuccess(false);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        addPlant({
          plantName,
          genetic,
          date,
          growMode
        });
        setPlantName('');
        setGenetic('');
        setDate('');
        setGrowMode('');
      };

    const handleClose = ()=>{
        setIsOpen(false);
        setPlantName('');
        setGenetic('');
        setDate('');
        setGrowMode('');
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
                <h2>Add a new user</h2>
            </div>
            <div className="form">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="">First Name</label>
                    <input type="text" {...register('plantName')} name="plantName" error={appendErrors.plantName?.message} value={plantName} onChange={(e)=>{setPlantName(e.target.value)}}/>
                        {errors.plantName && <span>{errors.plantName?.message}</span>}
                    <label htmlFor="">Last Name</label>
                    <input type="text" {...register('genetic')} name="genetic" error={appendErrors.genetic?.message} value={genetic} onChange={(e)=>{setGenetic(e.target.value)}}/>
                        {errors.genetic && <span>{errors.genetic?.message}</span>}
                    <label htmlFor="">date</label>
                    <input type="mail" {...register('date')} name="date" error={appendErrors.date?.message} value={date} onChange={(e)=>{setDate(e.target.value)}} />
                        {errors.date && <span>{errors.date?.message}</span>}
                    <label htmlFor="">growMode</label>
                    <input type="growMode" {...register('growMode')} error={appendErrors.growMode?.message} value={growMode} onChange={(e)=>{setGrowMode(e.target.value)}}/>
                        {errors.growMode && <span>{errors.growMode?.message}</span>}
                    <div className='formButtons'>
                        <button action="submit" type="submit" onClick={onSubmit}>Add</button>
                        <Link to={'/'}>
                            <button>Go back</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
