import {
    LOGIN_USER,
    DO_SEARCH,
    DO_REC,
    REGISTER_USER,
    LOGOUT_USER,
    AUTH_USER,
    DO_USERARTLIST,
    DO_USERREC
} from '../actions/types';
 

export default function(state={},action){
    switch(action.type){
        case DO_USERARTLIST:
            return {...state, artlist: action.payload}
        case DO_USERREC:
            return {...state, usrRec: action.payload}
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case REGISTER_USER:
            return {...state, register: action.payload }
        case DO_REC:
            return {...state, rec: action.payload } //object spread operator
        case DO_SEARCH:
            return { ...state, searchResult: action.payload }
        default:
            return state;
    }
}