/**
 * Création de la lightbox
 */ 


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

const openInPhoto = document.getElementById('photographer_image');

// Ouverture de la ligthbox
openInPhoto.addEventListener('click', function(e) {
    e = e || window.event; 
    var target = e.target; 
    if(target.tagName == 'IMG'){ 
        lightBox(target.src); 
    } else if(target.tagName == 'VIDEO'){
        lightBox(target.src);
    }
   }, false);

 function lightBox(src){
     //################################################################################################################
    console.log(src);
    let mediaFormat = src.split('.');
     console.log(mediaFormat.at(-1)); // on recupère le dernière element du tableau soit jpg soit mp4
      //################################################################################################################
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
    // DEBUT VERIFICATION IMAGE OU VIDEO ##############################################################################################
    let med = null;

    if(mediaFormat.at(-1) == 'mp4'){ 
      med = document.createElement('video');
     med.setAttribute('class', 'video-full-screen reload');
     med.setAttribute('src', src);
    } else{
     med = document.createElement('img');
    med.setAttribute('class', 'image-full-screen reload');
    med.setAttribute('src', src);
    }
    // FIN VERIFICATION IMAGE OU VIDEO####################################################################################################
    const title = document.createElement('p');
    title.setAttribute('class', 'img-title');
    title.textContent = "Je suis le titre";

    imgBox.appendChild(med);
    imgBox.appendChild(title);
    lightbox.appendChild(close);
    lightbox.appendChild(next);
    lightbox.appendChild(previous);
    lightbox.appendChild(imgBox);
    
    document.body.appendChild(lightbox);

    this.src = src;

    // EventListenner de fermeture de la modale
    this.onKeyUp = this.onKeyUp.bind(this);
    document.getElementById('close-btn').addEventListener('click', this.close.bind(this));
    document.addEventListener('keyup', this.onKeyUp);


//################################################################################################################################
let medias = Array.from(document.querySelectorAll('.thumb-vid,.thumb-img'));
console.log(medias);

const nextMediaBtn = document.getElementById('next-btn');
const prevMedia = document.getElementById('previous-btn');

nextMediaBtn.addEventListener('click', function(e){
    e.preventDefault();
    console.log(e);
    let currentMedia = imgBox.firstChild.src;
    console.log(currentMedia);
    let nextMedia;
    
    for(let i = 0; i <= medias.length; i++) {
        if(i==medias.length-1){
            i=0;
            nextMedia = medias[i];
            break;
        }
        if(medias[i].src == currentMedia){
            nextMedia = medias[i+1];
            break;
        }
       
    }

    imgBox.innerHTML = '';
    imgBox.appendChild(nextMedia);
});

prevMedia.addEventListener('click', function(e){
    e.preventDefault();
    let currentMedia = imgBox.firstChild.src;
    let prevMedia;
    
    for(let i = 0; i <= medias.length; i++) {
        if(medias[i].src == currentMedia){

            if(i == 0){
                i = medias.length - 1;
                prevMedia = medias[i];
                break;
            }

            prevMedia = medias[i - 1];
            break;
        }
    }

    imgBox.replaceChild(prevMedia, imgBox.firstChild);
});

//################################################################################################################################
}