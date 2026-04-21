const form_contact_button = document.getElementById('form_contact_button');
document.getElementById('form_contact').addEventListener('submit', function (event) {
    event.preventDefault();
    form_contact_button.disabled = true;

    const formData = new FormData(this);
    fetch('/submit_api_endpoint', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        form_contact_button.innerText = "Form submitted";
        form_contact_button.title = "Form submitted";
    }).catch(error => {
        console.error(error);
        form_contact_button.innerText = error;
        form_contact_button.title = error;
    }).finally(_final => {
        form_contact_button.disabled = false;
    });
});