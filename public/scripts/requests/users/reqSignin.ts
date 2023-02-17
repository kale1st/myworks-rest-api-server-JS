export const signin = async () => {
  const email = await document.getElementById('email') as HTMLInputElement;
  const password = await document.getElementById('psw') as HTMLInputElement;

  await fetch('http://localhost:3000/signin', {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      "email": email.value,
      "password": password.value
    })
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('Request succeeded with JSON response', data);
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
}

export const addUser = () => {
  const token = localStorage.getItem('token');
  console.log(token)
  fetch('http://localhost:3000/users/adduser', {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
      "authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      "email": "azizkale@hotmail.com",
      "password": "123456"
    })
  })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
}