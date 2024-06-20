document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    const response = await fetch('http://localhost:8000/api/login_check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    });

    const messageDiv = document.getElementById('message');
    if (response.status === 200) {
        const data = await response.json();
        const token = data.token;

        const arrayToken = token.split('.');

        const tokenPayload = JSON.parse(atob(arrayToken[1]))

        // Save token to local storage or a cookie
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', tokenPayload['sub']);
        localStorage.setItem('exp', tokenPayload['exp'].toString());

        window.location.href = '/';
    } else if (response.status === 401) {
        messageDiv.innerHTML = 'Invalid username or password.';
    } else {
        messageDiv.innerHTML = 'Error';
    }
});