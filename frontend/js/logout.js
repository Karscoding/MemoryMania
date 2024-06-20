function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.setItem('color_found', "#ffaeff");
    localStorage.setItem('color_closed', "#99c6ff");
    window.location.reload();
}