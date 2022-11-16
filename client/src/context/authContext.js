import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const authContext = createContext();

export const useAuth = () =>{
    const context = useContext(authContext);
    return context;
}

export const AuthProvider = ({children})=>{

    const [ user, setUser ] = useState(null);

    useEffect(()=>{
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('user: ', currentUser);
            localStorage.setItem('user', JSON.stringify(currentUser));
        });
    },[user])

    const regNew = async (email, password) => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('entro')
            localStorage.setItem('auth', 'auth')
        }
        catch(err){
            console.log('no entro')
            localStorage.setItem('authed', 'notauth')
        }
    }

    const login = (email,password) => {
        signInWithEmailAndPassword(auth, email, password);
    }

    const logout = ()=> {
        signOut(auth);
        localStorage.clear();
    }

    return(
        <authContext.Provider value={{regNew, login, logout, user}}>
            {children}
        </authContext.Provider>
    )
};