import { useState } from 'react'
import './adduser.css'

export const AddUser = ()=> {

    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const addUser = (e)=>{
        e.preventDefault();

        fetch('http://localhost:8080', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })})

            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                console.log(err.message);
            });
        }

    return (
        <div className="all">
            <div className="title">
                <h2>Add a new user</h2>
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
