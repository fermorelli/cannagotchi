import { useState } from 'react'
import Modal from '../modal/modal';
import { Link } from 'react-router-dom';
import './adduser.css'

export const AddUser = ()=> {

    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isOpen, setIsOpen ] = useState(false);
    const [ success, isSuccess ] = useState(false);

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
                isSuccess(true);
                setIsOpen(true);
            })
            .catch((err) => {
                console.log(err.message);
                isSuccess(false);
            });
        }

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
            <Modal setIsOpen={setIsOpen} modalTitle={success===true? "User successfully added" : "Something went wrong"}>
                <p>asd</p>
                <Link to={'/'}>
                    <button onClick={handleClose}>Go back</button>
                </Link>
                <Link to={'/add-user'}>
                    <span onClick={handleClose}>Add another user</span>
                </Link>
            </Modal>}
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
                    <button type="submit" onClick={addUser}>Add</button>
                </form>
            </div>
        </div>
    )
}
