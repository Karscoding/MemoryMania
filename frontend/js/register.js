document.getElementById('register-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, email, password})
    });
    console.log(response);

    const messageDiv = document.getElementById('message');
    if (response.status === 201) {
        window.location.href = '/login.html';
    } else if (response.status === 400) {
        messageDiv.innerHTML = 'Invalid request. Check your input';
    } else {
        messageDiv.innerHTML = 'error';
    }
});