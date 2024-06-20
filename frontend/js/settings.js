const closedCardColor = document.getElementById("closed-card-color");
const openedCardColor = document.getElementById("opened-card-color");
const foundCardColor = document.getElementById("found-card-color");
const apiChoice = document.getElementById("api-dropdown");
const emailInput = document.getElementById("email-field");

closedCardColor.addEventListener("change", sendPreferences);
openedCardColor.addEventListener("change", sendPreferences);
foundCardColor.addEventListener("change", sendPreferences);
apiChoice.addEventListener('change', sendPreferences);

async function sendPreferences() {
    const id = localStorage.getItem('user_id');
    const color_found = foundCardColor.value;
    const color_closed = closedCardColor.value;
    const api_choice = apiChoice.value;
    const response = await fetch('http://localhost:8000/api/player/' + id + '/preferences', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({"id":id,"api":api_choice,"color_found":color_found,"color_closed":color_closed})
    });

    localStorage.setItem('color_found', color_found);
    localStorage.setItem('color_closed', color_closed);
    localStorage.setItem('api_choice', api_choice);
}

async function submitEmail() {
    const id = localStorage.getItem('user_id');
    const email = emailInput.value;
    const response = await fetch('http://localhost:8000/api/player/'+ id +'/email', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({"email": email})
    });
}