import { AuthState } from './AuthState';
import { auth } from '../../firebase/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const signUp = (email, password) => {

    const { signupPending, signupSuccess, signupError } = AuthState();

  return (dispatch) => {
    dispatch(signupPending());
    return createUserWithEmailAndPassword(auth, email, password)
        .then(async (response) => {
            dispatch(signupSuccess());
            console.log(' signup entro');
        })
        .catch((error) => {
            console.log('signup no entro');
            return dispatch(signupError(error.toString()))
        });
    };
};

export const logIn = (email, password) => {

    const { loginPending, loginSuccess, loginError } = AuthState();

    return (dispatch) => {
        dispatch(loginPending());
        return signInWithEmailAndPassword(auth, email, password)
          .then(async (response) => {
            console.log('login entro')
            dispatch(loginSuccess());
          })
          .catch((error) => {
            console.log('login no entro')
            return dispatch(loginError(error.toString()))
          })
    };
};

export const logout = () => {
    signOut(auth);
    localStorage.clear();
};