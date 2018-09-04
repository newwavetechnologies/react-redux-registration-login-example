import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getUser,
    getById,
    update
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.apiUrl}/user/sign_in`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.token) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            getUser();

            return user;
        });
}

function logout() {
    //localStorage.removeItem('user');
    localStorage.clear();
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}


function getUser() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/user/profile`, requestOptions).then(handleResponse) 
    .then(loggedInUser => { 
        if (loggedInUser) {
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        }
        loggedInUser =  JSON.parse(localStorage.getItem('loggedInUser'));
        return loggedInUser;
    });
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/user`, requestOptions).then(handleResponse).then( registeredUser => {
       
     
        if (registeredUser.regCode) {
           
            localStorage.setItem('registeredUser', JSON.stringify(registeredUser));

            let users = JSON.parse(localStorage.getItem('users')) || [];

            var tempUser ={
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                regCode:registeredUser.regCode,
                registered : "TEMP"
            };
            users.push(tempUser);
            localStorage.setItem('users', JSON.stringify(users));

            //let regUser = JSON.parse(localStorage.getItem('registeredUser'));
        }else if(registeredUser.message){

            //localStorage.setItem('message', JSON.stringify(registeredUser.message));
            const error = registeredUser.message;
            return Promise.reject(error);
        }

        return registeredUser;
    });
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}