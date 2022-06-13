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
    // recupere au clique le media  
    var target = e.target; 
    
    // si le media a pour tag IMG alors..
    if(target.tagName == 'IMG'){ 
        // appel de la fonciton lightbox avec pour argument l'URL du media
        lightBox(target.src); 
    } else if(target.tagName == 'VIDEO'){
        lightBox(target.src);
    }
}, false);

function lightBox(src){

    let alts = Array.from(document.querySelectorAll('.thumb-vid,.thumb-img'));

    // permet de savoir si le media est au format jpg ou mp4
    let mediaFormat = src.split('.');
    
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
    
    const title = document.createElement('p');
    title.setAttribute('class', 'lgtb-img-title');

    // Boucle sur chaque element du tableau de media
    for(let i = 0; i < alts.length; i++){
        // si la source en parametre est egale a la source trouvé dans le tableau..
        if(src == alts[i].src){
            // insere l'alt de l'image du media dans le titre
            title.textContent = alts[i].alt;
            if(mediaFormat.at(-1) == 'mp4'){ 
                title.textContent = alts[i].title;
            }
            
        }
    }

    const imgBox = document.createElement('div');
    imgBox.setAttribute('class', 'img-container');
    
    let med = null;

    // si le media est un mp4
    if(mediaFormat.at(-1) == 'mp4'){ 
        // crée un élément video
        med = document.createElement('video');
        med.setAttribute('class', 'video-full-screen');
        med.setAttribute('controls', 'controls');
        med.setAttribute('title', src.title);
        med.setAttribute('src', src);
    } else{
        // sinon crée un élément image
        med = document.createElement('img');
        med.setAttribute('class', 'image-full-screen');
        med.setAttribute("alt", `${src.alt}`)
        med.setAttribute('src', src);
    }
    
    imgBox.appendChild(med);
    imgBox.appendChild(title);
    lightboxContainer.appendChild(imgBox);
    lightboxContainer.appendChild(close);
    lightboxContainer.appendChild(next);
    lightboxContainer.appendChild(previous);
    lightbox.appendChild(lightboxContainer);
    
    // insertion de la lightbox dans le DOM
    document.body.appendChild(lightbox);

    // au clique sur la croix déclenche la fonction closeLightbox
    document.getElementById('close-btn').addEventListener('click', closeLightbox);


//################################################################################################################################

const nextMediaBtn = document.getElementById('next-btn');
const prevMediaBtn = document.getElementById('previous-btn');

// au clique sur l'un des boutons prev ou next déclenchement de la fonction prevMed ou nextMed
prevMediaBtn.addEventListener('click', prevMed);
nextMediaBtn.addEventListener('click', nextMed);

// Fonction de passage au média suivant
function nextMed(){

    let medias = Array.from(document.querySelectorAll('.thumb-vid,.thumb-img'));
    // récupére le media actuel
    let currentMedia = imgBox.firstChild.src;
    let nextMedia;

    // Pour chaque éléments du tableau médias 
    medias.forEach(media => {   
        // Si la source du media est egale au media actuel
        if(media.src == currentMedia){
            // recupere le media suivant au media actuel dans le tableau
            nextMedia = medias[medias.indexOf(media) + 1];

            if(nextMedia){
                // recupere le format du media (jpg ou mp4)
                let formatNextMedia = nextMedia.src.split('.');
                
                // si le format est égale à mp4
                if(formatNextMedia.at(-1) == 'mp4'){ 
                    // alors crée un élément vidéo
                    med = document.createElement('video');
                    med.setAttribute('class', 'video-full-screen');
                    med.setAttribute('controls', 'controls');
                    med.setAttribute('title', nextMedia.title);
                    med.setAttribute('src', nextMedia.src);
                    title.textContent = nextMedia.title;
                } else{
                    // sinon crée un élément image
                    med = document.createElement('img');
                    med.setAttribute('class', 'image-full-screen');
                    med.setAttribute('alt', nextMedia.alt);
                    med.setAttribute('src', nextMedia.src);
                    title.textContent = nextMedia.alt;
                }

                // remplace l'image actuel par l'image suivante
                imgBox.replaceChild(med, imgBox.firstChild);

            }else{
                // lorsqu'on est au bout du tableau on repare au debut du tableau
                let format = medias[0].src.split('.');
                
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
                
                // remplace l'image actuel par la première image du tableau
                imgBox.replaceChild(med, imgBox.firstChild);
            }
        }
    });
}

// Fonction de passage au média précédent
function prevMed(){
    let medias = Array.from(document.querySelectorAll('.thumb-vid,.thumb-img'));
    let currentMedia = imgBox.firstChild.src;
    let prevMedia;

    // Pour chaque éléments du tableau médias 
    medias.forEach(media => {   
        // Si la source du media est egale au media actuel
        if(media.src == currentMedia){
            // recupere le media precedent au media actuel dans le tableau
            prevMedia = medias[medias.indexOf(media) - 1];

            if(prevMedia){
                // recupere le format du media (jpg ou mp4)
                let formatPrevMedia = prevMedia.src.split('.');
                 // si le format est égale à mp4
                if(formatPrevMedia.at(-1) == 'mp4'){ 
                    // alors crée un élément vidéo
                    med = document.createElement('video');
                    med.setAttribute('class', 'video-full-screen');
                    med.setAttribute('controls', 'controls');
                    med.setAttribute('title', prevMedia.title);
                    med.setAttribute('src', prevMedia.src);
                    title.textContent = prevMedia.title;
                } else{
                    // sinon crée un élément image
                    med = document.createElement('img');
                    med.setAttribute('class', 'image-full-screen');
                    med.setAttribute("alt", prevMedia.alt)
                    med.setAttribute('src', prevMedia.src);
                    title.textContent = prevMedia.alt;
                }

                // remplace l'image actuel par l'image précédente
                imgBox.replaceChild(med, imgBox.firstChild);

            }else{
                // lorsqu'on est au bout du tableau on repare à la fin du tableau
                let index = medias.length - 1;
                let format = medias[index].src.split('.');
                
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
                
                // remplace l'image actuel par la dernière image du tableau
                imgBox.replaceChild(med, imgBox.firstChild);
            }
        }
    });
}

window.addEventListener('keydown', function (event) {

    switch (event.key) {
        case "ArrowLeft":
          // Déclenche la fonction prevMed lorsque la touche "left arrow" est pressée.
          prevMed(event);
          break;
        case "ArrowRight":
          // Déclenche la fonction nextMed lorsque la touche "right arrow" est pressée.
          nextMed(event);
          break;
        case "Escape":
            // Déclenche la fonction closeLightbox lorsque la touche "escape" est pressée.
            closeLightbox(event);
            break;

        default:
          return; // Quitter lorsque cela ne gère pas l'événement touche.
      }
      event.preventDefault();

}, true);

//################################################################################################################################
}
