// import MEDIA from '/pages/photographer.js';
// console.log(MEDIA);
/**
 *  Création de la LightBox 
 */

// Mon tableau de media
let medias = Array.from(document.getElementsByClassName('img-container'));
console.log(medias)

// Fonction de fermeture de la lighbox
function close(e) {
    e.preventDefault();

    let liElements = document.querySelectorAll("#lightbox");
    if (liElements.length > 0) {
        liElements[0].remove();
    }
    document.removeEventListener('keyup', this.onKeyUp);
}

// Fermeture avec la touche Echap
function onKeyUp(e){
    if(e.key == 'Escape'){
        this.close(e);
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
    
    this.src = null;
    
    const lightbox = document.createElement('div');
    lightbox.setAttribute('id', 'lightbox');

    const close = document.createElement('button');
    close.setAttribute('id', 'close-btn');

    const next = document.createElement('button');
    next.setAttribute('id', 'next-btn');
    next.textContent = 'suivant';

    const previous = document.createElement('button');
    previous.setAttribute('id', 'previous-btn');
    previous.textContent = 'precedent';

    const imgBox = document.createElement('div');
    imgBox.setAttribute('class', 'img-container');

    const image = document.createElement('img');
    image.setAttribute('class', 'image-full-screen');
    image.setAttribute('src', src);

    // const video = document.createElement('video');
    // video.setAttribute('class', 'video-full-screen');
    // video.setAttribute('src', src);
    
    const title = document.createElement('p');
    title.setAttribute('class', 'img-title');
    title.textContent = "Je suis le titre";

    lightbox.appendChild(close);
    lightbox.appendChild(next);
    lightbox.appendChild(previous);
    lightbox.appendChild(imgBox);
    imgBox.appendChild(image);
    // imgBox.appendChild(video);
    imgBox.appendChild(title);
    document.body.appendChild(lightbox);

    this.src = src;

    // EventListenner de fermeture de la modale
    this.onKeyUp = this.onKeyUp.bind(this);
    document.getElementById('close-btn').addEventListener('click', this.close.bind(this));
    document.addEventListener('keyup', this.onKeyUp);

    // document.getElementById('previous-btn').addEventListener('click', this.next.bind(this));
    // document.getElementById('next-btn').addEventListener('click', this.prev.bind(this));
}

