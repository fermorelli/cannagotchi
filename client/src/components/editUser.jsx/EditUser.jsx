import { useState } from 'react'
import Modal from '../modal/modal';
import { Link, useParams  } from 'react-router-dom';
import './editUser.css'
import { useEffect } from 'react';

export const EditUser = ()=> {

    const [ firstName, setFirstName ] = useState();
    const [ lastName, setLastName ] = useState();
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ isOpen, setIsOpen ] = useState(false);
    const [ success, isSuccess ] = useState(false);
    const [ data, setData ] = useState([]);

    const params = useParams();
    const id = params.id;

    useEffect(()=>{
        fetch(`http://localhost:8080/${id}`)
        .then((response)=>response.json())
        .then((data)=>setData(data.data))}, [])

    console.log('full data: ', data);

    const handleClose = ()=>{
        setIsOpen(false);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }

    return (
        <div className="all">
            {isOpen &&
            <Modal setIsOpen={setIsOpen} modalTitle={success===true? "Success" : "Something went wrong"}>
                <p>{success ? "User successfully updated" : null}</p>
                <div className='addModalButtons'>
                    <Link to={'/'}>
                        <button onClick={handleClose}>Go back</button>
                    </Link>
                </div>
            </Modal>}
            <div className="title">
                <h2>Update user</h2>
            </div>
            <div className="form">
                <form action="">
                    <label htmlFor="">First Name</label>
                    <input type="text" defaultValue={data.firstName} value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                    <label htmlFor="">Last Name</label>
                    <input type="text" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                    <label htmlFor="">Email</label>
                    <input type="mail" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                    <label htmlFor="">Password</label>
                    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    <div className='formButtons'>
                        <button type="submit">Add</button>
                        <Link to={'/'}>
                            <button>Go back</button>
                        </Link>
                    </div>
                </form>
            </div>

        </div>
    )
}
