/**
 * Création de la lightbox
 */ 

function closeLightbox(e) {
    e.preventDefault();

    let liElements = document.querySelectorAll("#lightbox");
    if (liElements.length > 0) {
        liElements[0].remove();
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

    let alts = Array.from(document.querySelectorAll('.thumb-vid,.thumb-img'));
    console.log(alts);

    //################################################################################################################
    console.log(src);
    let mediaFormat = src.split('.');
    console.log(mediaFormat.at(-1)); // on recupère le dernière element du tableau soit jpg soit mp4
    //################################################################################################################
    
    const lightbox = document.createElement('div');
    lightbox.setAttribute('id', 'lightbox');

    const lightboxContainer = document.createElement('div');
    lightboxContainer.setAttribute('class', 'ligthbox-container');

    const close = document.createElement('button');
    close.setAttribute('id', 'close-btn');

    const next = document.createElement('button');
    next.setAttribute('id', 'next-btn');

    const previous = document.createElement('button');
    previous.setAttribute('id', 'previous-btn');
    // previous.textContent = 'precedent';
    
    const title = document.createElement('p');
    title.setAttribute('class', 'lgtb-img-title');

    for(let i = 0; i < alts.length; i++){
        if(src == alts[i].src){
            title.textContent = alts[i].alt;
            
            if(mediaFormat.at(-1) == 'mp4'){ 
                title.textContent = alts[i].title;
            }
            
        }
    }

    const imgBox = document.createElement('div');
    imgBox.setAttribute('class', 'img-container');
    // DEBUT VERIFICATION IMAGE OU VIDEO ##############################################################################################
    let med = null;

    if(mediaFormat.at(-1) == 'mp4'){ 
        med = document.createElement('video');
        med.setAttribute('class', 'video-full-screen');
        med.setAttribute('controls', 'controls');
        med.setAttribute('title', src.title);
        med.setAttribute('src', src);
    } else{
        med = document.createElement('img');
        med.setAttribute('class', 'image-full-screen');
        med.setAttribute("alt", `${src.alt}`)
        med.setAttribute('src', src);
    }
    // FIN VERIFICATION IMAGE OU VIDEO####################################################################################################
    
    imgBox.appendChild(med);
    imgBox.appendChild(title);
    lightboxContainer.appendChild(imgBox);
    lightboxContainer.appendChild(close);
    lightboxContainer.appendChild(next);
    lightboxContainer.appendChild(previous);
    lightbox.appendChild(lightboxContainer);
    
    document.body.appendChild(lightbox);

    document.getElementById('close-btn').addEventListener('click', closeLightbox);


//################################################################################################################################

const nextMediaBtn = document.getElementById('next-btn');
const prevMediaBtn = document.getElementById('previous-btn');

prevMediaBtn.addEventListener('click', prevMed);
nextMediaBtn.addEventListener('click', nextMed);


function nextMed(){
    let medias = Array.from(document.querySelectorAll('.thumb-vid,.thumb-img'));
    let currentMedia = imgBox.firstChild.src;
    let nextMedia;

    console.log(currentMedia);

    medias.forEach(media => {   
        if(media.src == currentMedia){
            nextMedia = medias[medias.indexOf(media) + 1];

            console.log(nextMedia);
            if(nextMedia){
                let formatNextMedia = nextMedia.src.split('.');
                if(formatNextMedia.at(-1) == 'mp4'){ 
                    med = document.createElement('video');
                    med.setAttribute('class', 'video-full-screen');
                    med.setAttribute('controls', 'controls');
                    med.setAttribute('title', nextMedia.title);
                    med.setAttribute('src', nextMedia.src);
                    title.textContent = nextMedia.title;
                } else{
                    med = document.createElement('img');
                    med.setAttribute('class', 'image-full-screen');
                    med.setAttribute('alt', nextMedia.alt);
                    med.setAttribute('src', nextMedia.src);
                    title.textContent = nextMedia.alt;
                }

                imgBox.replaceChild(med, imgBox.firstChild);

            }else{
                let format = medias[0].src.split('.');
                console.log(format);
                
                if(format.at(-1) == 'mp4'){
                    med = document.createElement('video');
                    med.setAttribute('class', 'video-full-screen');
                    med.setAttribute('controls', 'controls');
                    med.setAttribute('title', medias[0].title);
                    med.setAttribute('src', medias[0].src);
                    title.textContent = medias[0].src;
                }else{
                    med = document.createElement('img');
                    med.setAttribute('class', 'image-full-screen');
                    med.setAttribute('alt', medias[0].alt);
                    med.setAttribute('src', medias[0].src);
                    title.textContent = medias[0].alt;
                }

                imgBox.replaceChild(med, imgBox.firstChild);

                // imgBox.firstChild.src = medias[0].src;
                // title.firstChild.textContent = medias[0].alt;
            }
        }
    });
}

function prevMed(){
    let medias = Array.from(document.querySelectorAll('.thumb-vid,.thumb-img'));
    let currentMedia = imgBox.firstChild.src;
    let prevMedia;

    medias.forEach(media => {   
        if(media.src == currentMedia){
            prevMedia = medias[medias.indexOf(media) - 1];

            if(prevMedia){
                let formatPrevMedia = prevMedia.src.split('.');
                if(formatPrevMedia.at(-1) == 'mp4'){ 
                    med = document.createElement('video');
                    med.setAttribute('class', 'video-full-screen');
                    med.setAttribute('controls', 'controls');
                    med.setAttribute('title', prevMedia.title);
                    med.setAttribute('src', prevMedia.src);
                    title.textContent = prevMedia.title;
                } else{
                    med = document.createElement('img');
                    med.setAttribute('class', 'image-full-screen');
                    med.setAttribute("alt", prevMedia.alt)
                    med.setAttribute('src', prevMedia.src);
                    title.textContent = prevMedia.alt;
                }

                imgBox.replaceChild(med, imgBox.firstChild);

            }else{
                let index = medias.length - 1;
                let format = medias[index].src.split('.');
                console.log(format);
                
                if(format.at(-1) == 'mp4'){
                    med = document.createElement('video');
                    med.setAttribute('class', 'video-full-screen');
                    med.setAttribute('controls', 'controls');
                    med.setAttribute('title', medias[index].title);
                    med.setAttribute('src', medias[index].src);
                    title.textContent = medias[index].title;
                }else{
                    med = document.createElement('img');
                    med.setAttribute('class', 'image-full-screen');
                    med.setAttribute('alt',medias[index].alt);
                    med.setAttribute('src', medias[index].src);
                    title.textContent = medias[index].alt;
                }

                imgBox.replaceChild(med, imgBox.firstChild);
            }
        }
    });
}

window.addEventListener('keydown', function (event) {

    switch (event.key) {
        case "ArrowLeft":
          // Faire quelque chose pour la touche "left arrow" pressée.
          prevMed(event);
          break;
        case "ArrowRight":
          // Faire quelque chose pour la touche "right arrow" pressée.
          nextMed(event);
          break;
        case "Escape":
            closeLightbox(event);
            break;

        default:
          return; // Quitter lorsque cela ne gère pas l'événement touche.
      }
      event.preventDefault();

}, true);

//################################################################################################################################
}
