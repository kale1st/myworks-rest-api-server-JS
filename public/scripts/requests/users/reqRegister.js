const createUser = async() => {
    const email = await document.getElementById('email');
    const password = await document.getElementById('psw');

    fetch(reqJSONData.req_register, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "email": email.value,
                "password": password.value
            })
        })
        .then(async(response) => {
            return [response, response.json()]

        })
        .then(async(data) => {
            console.log(data.status)

            if (data.status === 200) {
                await signin(email, password)
                    // await localStorage.setItem('token', data.token);
                    // window.location.replace('views/accountpage.html');
            } else {
                document.getElementById('id_alert_signin').innerHTML = 'email or password incorrect';
                document.getElementById('id_alert_signin').style.display = 'block';

            }
        })
        .catch(function(error) {
            document.getElementById('id_alert_signin').innerHTML = 'oops! connection problem?';
            document.getElementById('id_alert_signin').style.display = 'block';
        });
}