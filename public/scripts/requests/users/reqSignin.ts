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
    .then(async (response) => {
      return await response.json();
    })
    .then(async (data) => {
      if (data.token) {
        await localStorage.setItem('token', data.token);
        // window.location.href = "views/accountpage.html";
        window.location.replace('views/accountpage.html');
      }
      else {
        document.getElementById('id_alert_signin').innerHTML = 'email or password incorrect';
        document.getElementById('id_alert_signin').style.display = 'block';

      }
    })
    .catch(function (error) {
      document.getElementById('id_alert_signin').innerHTML = 'oops! connection problem?';
      document.getElementById('id_alert_signin').style.display = 'block';

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