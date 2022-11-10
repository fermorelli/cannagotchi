import { createContext, useContext } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

export const authContext = createContext();

export const useAuth = () =>{
    const context = useContext(authContext);
    return context;
}

export const AuthProvider = ({children})=>{

    const regNew = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password);
        console.log('created');
    }

    return(
        <authContext.Provider value={{regNew}}>
            {children}
        </authContext.Provider>
    )
};