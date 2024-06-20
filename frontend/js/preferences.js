async function getPreferences() {
    const id = localStorage.getItem('user_id');
    const response = await fetch('http://localhost:8000/api/player/' + id + '/preferences', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
    return await response.json();
}