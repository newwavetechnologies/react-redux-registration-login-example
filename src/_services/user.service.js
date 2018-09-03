import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getUser,
    getById,
    update,
    delete: _delete
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
            // login successful if there's a jwt token in the response
            console.log("I am here");
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                console.log(user.token);
                localStorage.setItem('user', JSON.stringify(user));
            }

            getUser();

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
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
    console.log("I am in Userservice getUser before fetch");
    return fetch(`${config.apiUrl}/user/profile`, requestOptions).then(handleResponse) 
    .then(loggedInUser => {
        // login successful if there's a jwt token in the response
        console.log("I am in UserService getUser after fetch");
        
        if (loggedInUser) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log(loggedInUser.firstName);
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
    console.log(requestOptions);
    console.log(JSON.stringify(user));
    return fetch(`${config.apiUrl}/user`, requestOptions).then(handleResponse).then( registeredUser => {
        // login successful if there's a jwt token in the response
        console.log("I am here");
        if (registeredUser.regCode) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log(registeredUser.regCode);
            localStorage.setItem('registeredUser', JSON.stringify(registeredUser));
            let regUser = JSON.parse(localStorage.getItem('registeredUser'));
            console.log(regUser.regCode);
        }

        return user;
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

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
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