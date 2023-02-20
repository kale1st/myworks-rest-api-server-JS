const signin = async(email = '', password = '', path = 'views/accountpage.html') => {
    email = await document.getElementById('email');
    password = await document.getElementById('psw');

    await fetch(reqJSONData.req_signin, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                "email": email.value,
                "password": password.value
            })
        })
        .then(async(response) => {
            console.log(response)
            if (response.status === 200) {
                // If the response status is 200 OK, extract the token from the response
                return response.json().then(async data => {
                    const token = data.token;
                    const status = response.status;
                    // 
                    await localStorage.setItem('token', token);

                    await window.location.replace(path);
                });
            } else if (response.status === 404) {
                // If the response status is not 200 OK, throw an error
                document.getElementById('id_alert_signin').innerHTML = "email or password incorrect";
                document.getElementById('id_alert_signin').style.display = 'block';
                // throw new Error('Invalid credentials');
            }
        })
        .catch(function(error) {
            document.getElementById('id_alert_signin').innerHTML = 'oops! connection problem?';
            document.getElementById('id_alert_signin').style.display = 'block';

        });
}