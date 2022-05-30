function displayModal() {
    const modal = document.getElementById("contact_modal");
    const name = document.getElementById("photographer-name").innerHTML;
    modal.setAttribute('aria-labelledby', 'Contact me ' + name);
    modal.setAttribute('role', 'dialog');
    contactForm();
	modal.style.display = "block";
    
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.setAttribute('aria-label', 'Close Contact Form');
    modal.style.display = "none";
    window.location.reload();
}

function contactForm(){
    const headerName = document.getElementById("photographer-name");
    const recupHeaderName = ' ' + headerName.textContent;

    const form = document.getElementById('contact-form');

    const header = document.querySelector('h2');
    header.insertAdjacentText('beforeend', recupHeaderName);

    const divFirst = document.createElement('div');
    const first = document.createElement('label');
    first.setAttribute('for', 'firstname');
    first.textContent = 'Prénom';

    const firstInput = document.createElement('input');
    firstInput.setAttribute('id', 'firstname');
    firstInput.setAttribute('type', 'text');
    firstInput.setAttribute('name', 'firstname');
    firstInput.setAttribute('aria-labelledby', 'First Name');


    const divName = document.createElement('div');
    const name = document.createElement('label');
    name.setAttribute('for', 'name');
    name.textContent = 'Nom';

    const nameInput = document.createElement('input');
    nameInput.setAttribute('id', 'name');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'name');
    nameInput.setAttribute('aria-labelledby', 'Last Name');


    const divMail = document.createElement('div');
    const mail= document.createElement('label');
    mail.setAttribute('for', 'mail');
    mail.textContent = 'Email';

    const mailInput = document.createElement('input');
    mailInput.setAttribute('id', 'mail');
    mailInput.setAttribute('name', 'mail');
    mailInput.setAttribute('type', 'text');
    mailInput.setAttribute('aria-labelledby', 'Email');


    const divMessage = document.createElement('div');
    const message= document.createElement('label');
    message.setAttribute('for', 'message')
    message.textContent = 'Votre Message';

    const messageInput = document.createElement('textarea');
    messageInput.setAttribute('type', 'text');
    messageInput.setAttribute('name', 'message');
    messageInput.setAttribute('aria-labelledby', 'Your Message');

    divFirst.appendChild(first);
    divFirst.appendChild(firstInput);

    divName.appendChild(name);
    divName.appendChild(nameInput);

    divMail.appendChild(mail);
    divMail.appendChild(mailInput);

    divMessage.appendChild(message);
    divMessage.appendChild(messageInput);

    form.appendChild(divFirst);
    form.appendChild(divName);
    form.appendChild(divMail);
    form.appendChild(divMessage); 
}
