export const signin = () => {
  fetch('http://localhost:3000/signin', {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
      "authorization": `Bearer tokentokentoken`,
    }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('Request succeeded with JSON response', data);
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
}