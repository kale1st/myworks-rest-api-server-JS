"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.signin = void 0;
var signin = function () {
    fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            "email": "azizkale@hotmail.com",
            "password": "123456"
        })
    })
        .then(function (response) {
        return response.json();
    })
        .then(function (data) {
        console.log('Request succeeded with JSON response', data);
        localStorage.setItem('token', data.token);
    })
        .catch(function (error) {
        console.log('Request failed', error);
    });
};
exports.signin = signin;
var addUser = function () {
    var token = localStorage.getItem('token');
    fetch('http://localhost:3000/users/adduser', {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "authorization": "Bearer ".concat(token)
        },
        body: JSON.stringify({
            "email": "azizkale@hotmail.com",
            "password": "123456"
        })
    })
        .then(function (response) {
        console.log(response);
    })
        .catch(function (error) {
        console.log('Request failed', error);
    });
};
exports.addUser = addUser;
