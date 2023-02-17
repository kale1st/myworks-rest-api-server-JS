export const signin = () => {
  fetch('http://localhost:3000/signin', {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
      "authorization": `Bearer tokentokentoken`
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
}

export const send = () => {
  const token = localStorage.getItem('token');
  console.log(token)
  fetch('http://localhost:3000/adduser', {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
}