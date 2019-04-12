import axios from 'axios';
import {
    DO_SEARCH,
    DO_REC,
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    DO_USERARTLIST,
    DO_USERREC
} from './types';

export function auth(){
    const request = axios.get('api/auth')
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }

}

export function registerUser(dataToSubmit){
    const request = axios.post('api/register', dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get('api/logout')
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post('api/login',dataToSubmit)
                .then(response => response.data);
    return {
        type: LOGIN_USER,
        payload: request
    }
}


export function doSearch(dataToSubmit){
    const request = axios.post('/api/articles', dataToSubmit)
                .then(response => response.data);
    return {
        type: DO_SEARCH,
        payload: request
    }
}

export function doUserrec(){
    const request = axios.post('/api/userrec')
                .then(response => response.data);
    return {
        type: DO_USERREC,
        payload: request
    }
}

export function doUserartlist(dataToSubmit){
    const request = axios.post('/api/userartlist', dataToSubmit)
                .then(response => response.data);
    return {
        type: DO_USERARTLIST,
        payload: request
    }
}

export function doRec(dataToSubmit){
    const request = axios.post('/api/rec', dataToSubmit)
                .then(response => response.data);
    return {
        type: DO_REC,
        payload: request
    }
}