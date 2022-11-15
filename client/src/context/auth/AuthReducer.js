import { LOGIN_ERROR, LOGIN_PENDING, LOGIN_SUCCESS, SIGNUP_ERROR, SIGNUP_PENDING, SIGNUP_SUCCESS } from '../Types';

const AuthReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_PENDING: {
          return {
            ...state,
            isFetching: true,
            error: state.error
          };
        }
        case LOGIN_SUCCESS: {
          return {
            ...state,
            isFetching: false,
          };
        }
        case LOGIN_ERROR: {
          return {
            ...state,
            isFetching: false,
            error: action.payload
          };
        }
        case SIGNUP_PENDING: {
            return {
              ...state,
              isFetching: true,
              error: state.error
            };
          }
          case SIGNUP_SUCCESS: {
            return {
              ...state,
              isFetching: false,
            //   authenticated: action.payload
            };
          }
          case SIGNUP_ERROR: {
            return {
              ...state,
              isFetching: false,
              error: action.payload
            };
          }
        default:
            return state
    }
}

export default AuthReducer;