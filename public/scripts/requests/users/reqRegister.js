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
            console.log(response)
            if (response.status === 200) {
                await signin(email, password, 'accountpage.html');
            } else if (response.status === 409) {
                document.getElementById('id_alert_signin').innerHTML = 'This email is already in use!';
                document.getElementById('id_alert_signin').style.display = 'block';
            }
        })
        .catch(function(error) {
            document.getElementById('id_alert_signin').innerHTML = 'oops! connection problem?';
            document.getElementById('id_alert_signin').style.display = 'block';
        });
}