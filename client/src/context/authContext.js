import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';

export const authContext = createContext();

export const useAuth = () =>{
    const context = useContext(authContext);
    return context;
}

export const AuthProvider = ({children})=>{

    const [ user, setUser ] = useState();

    const regNew = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password);
        console.log('created');
    }

    const login = (email,password) => {
        signInWithEmailAndPassword(auth, email, password);
        console.log('access ok');
    }

    useEffect(()=>{
        console.log('cargo');
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('asd: ', user);
        });
    },[])

    return(
        <authContext.Provider value={{regNew, login}}>
            {children}
        </authContext.Provider>
    )
};