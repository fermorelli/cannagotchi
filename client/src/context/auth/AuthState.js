import { useReducer, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import { LOGIN_ERROR, LOGIN_PENDING, LOGIN_SUCCESS, SIGNUP_ERROR, SIGNUP_PENDING, SIGNUP_SUCCESS } from '../Types';

export const AuthState = ({children})=>{

  const [ user, setUser ] = useState({})

  useEffect(()=>{
    onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        console.log('user: ', currentUser);
        localStorage.setItem('user', JSON.stringify(currentUser));
    });
},[user])

    const initialState = {
        isFetching: false,
        // authenticated: JSON.parse(sessionStorage.getItem('authenticated')) || false,
        error: ''
      };

      const [ state, dispatch ] = useReducer(AuthReducer, initialState);

      const loginPending = ()=>{
        dispatch({type: LOGIN_PENDING})
      };

      const loginSuccess = user => {
        dispatch({type: LOGIN_SUCCESS, payload: user})
      };

      const loginError = error => {
        dispatch({type: LOGIN_ERROR, payload: error})
      };

      const signupPending = ()=>{
        dispatch({type: SIGNUP_PENDING})
      };

      const signupSuccess = user => {
        dispatch({type: SIGNUP_SUCCESS, payload: user})
      };

      const signupError = error => {
        dispatch({type: SIGNUP_ERROR, payload: error})
      };

      return (
        <AuthContext.Provider value={{
            loginPending,
            isFetching: state.isFetching,
            error: state.error,
            loginSuccess,
            loginError,
            signupPending,
            signupSuccess,
            signupError
        }}>
            {children}
        </AuthContext.Provider>
      )
}