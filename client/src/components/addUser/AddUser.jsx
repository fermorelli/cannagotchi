import { useState } from 'react'
import './adduser.css'

export const AddUser = ()=> {

    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const addUser = (e)=>{
        e.preventDefault();
        let user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
        console.log(user);
    }


    return (
        <div className="all">
            <div className="title">
                <h2>Crear un nuevo usario</h2>
            </div>
            <div className="form">
                <form action="">
                    <label htmlFor="">First Name</label>
                    <input type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                    <label htmlFor="">Last Name</label>
                    <input type="text" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                    <label htmlFor="">Email</label>
                    <input type="mail" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                    <label htmlFor="">Password</label>
                    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    <label htmlFor="">Confirm Password</label>
                    <input type="password" />
                    <button type="submit" onClick={addUser}>Add</button>
                </form>
            </div>
        </div>
    )
}