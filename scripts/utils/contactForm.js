function displayModal() {
    const modal = document.getElementById("contact_modal");
    contactForm();
	modal.style.display = "block";
    
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    window.location.reload();
}

function contactForm(){
    const headerName = document.getElementById("photographer-name");
    const recupHeaderName = ' ' + headerName.textContent;

    const form = document.getElementById('contact-form');
    // const header = document.getElementsByTagName('header');
    // const headerH2 = document.getElementById('contact-header');

    const header = document.querySelector('h2');
    header.insertAdjacentText('beforeend', recupHeaderName);

    // const namePhotographer = document.createElement('h2')
    // namePhotographer.innerHTML = recupHeaderName;

    const divName = document.createElement('div');
    const name = document.createElement('label');
    name.textContent = 'Nom';
    const nameInput = document.createElement('input');
    console.log(name)
    console.log(nameInput)

    const divMail = document.createElement('div');
    const mail= document.createElement('label');
    mail.textContent = 'Email';
    const mailInput = document.createElement('input');

    const divMessage = document.createElement('div');
    const message= document.createElement('label');
    message.textContent = 'Votre Message';
    const messageInput = document.createElement('input');
    messageInput.getAttribute('id', 'message-input');

    // headerH2.appendChild(namePhotographer);

    divName.appendChild(name);
    divName.appendChild(nameInput);

    divMail.appendChild(mail);
    divMail.appendChild(mailInput);

    divMessage.appendChild(message);
    divMessage.appendChild(messageInput);

    form.appendChild(divName);
    form.appendChild(divMail);
    form.appendChild(divMessage);
    // form.appendChild(send);
    
}
