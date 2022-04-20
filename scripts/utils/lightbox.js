/**
 *  Création de la LightBox 
 */

// Fonction de fermeture de la lighbox
function close(e) {
    e.preventDefault();

    let liElements = document.querySelectorAll("#lightbox");
    if (liElements.length > 0) {
        liElements[0].remove();
    }
}

// Ouverture de la ligthbox
document.addEventListener('click', function(e) {
    e = e || window.event; 
    var target = e.target; 
    if(target.tagName == 'IMG'){ 
        lightBox(target.src); 
    } else if(target.tagName == 'VIDEO'){
        lightBox(target.src);
    }
   }, false);

 function lightBox(src){

    const lightbox = document.createElement('div');
    lightbox.setAttribute('id', 'lightbox');

    const close = document.createElement('button');
    close.setAttribute('id', 'close-btn');

    const next = document.createElement('button');
    next.setAttribute('class', 'next-btn');
    next.textContent = 'suivant';

    const previous = document.createElement('button');
    previous.setAttribute('class', 'previous-btn');
    previous.textContent = 'precedent';

    const imgBox = document.createElement('div');
    imgBox.setAttribute('class', 'img-container');

    const image = document.createElement('img');
    image.setAttribute('class', 'image-full-screen');
    image.setAttribute('src', src);

    const video = document.createElement('video');
    video.setAttribute('class', 'video-full-screen');
    video.setAttribute('src', src);
    
    const title = document.createElement('p');
    title.setAttribute('class', 'img-title');
    title.textContent = "Je suis le titre";

    lightbox.appendChild(close);
    lightbox.appendChild(next);
    lightbox.appendChild(previous);
    lightbox.appendChild(imgBox);
    imgBox.appendChild(image);
    imgBox.appendChild(video);
    imgBox.appendChild(title);
    document.body.appendChild(lightbox);
    
    // EventListenner de fermeture de la modale
    document.getElementById('close-btn').addEventListener('click', this.close.bind(this));
}

