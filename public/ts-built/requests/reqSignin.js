"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = exports.signin = void 0;
var signin = function () {
    fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "authorization": "Bearer tokentokentoken"
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
var send = function () {
    var token = localStorage.getItem('token');
    console.log(token);
    fetch('http://localhost:3000/adduser', {
        method: 'GET',
        headers: {
            "Authorization": "Bearer ".concat(token)
        }
    })
        .then(function (response) {
        console.log(response);
    })
        .catch(function (error) {
        console.log('Request failed', error);
    });
};
exports.send = send;
