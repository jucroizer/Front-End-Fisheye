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

// Passage a l'iamge suivante avec Next
// function keyNext(){
//     if(e.key == 'arrow-left'){
//         nextMedia();
//     }
// }

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

    //################################################################################################################
    console.log(src);
    let mediaFormat = src.split('.');
    console.log(mediaFormat.at(-1)); // on recupère le dernière element du tableau soit jpg soit mp4
    //################################################################################################################
    
    this.src = null;
    
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

    const imgBox = document.createElement('div');
    imgBox.setAttribute('class', 'img-container');
    // DEBUT VERIFICATION IMAGE OU VIDEO ##############################################################################################
    let med = null;

    if(mediaFormat.at(-1) == 'mp4'){ 
        med = document.createElement('video');
        med.setAttribute('class', 'video-full-screen');
        med.setAttribute('controls', 'controls');
        med.setAttribute('src', src);
    } else{
        med = document.createElement('img');
        med.setAttribute('class', 'image-full-screen');
        med.setAttribute("alt", `${src.alt}`)
        med.setAttribute('src', src);
    }
    // FIN VERIFICATION IMAGE OU VIDEO####################################################################################################
    
    const title = document.createElement('p');
    title.setAttribute('class', 'lgtb-img-title');

    for(let i = 0; i < alts.length; i++){
        if(src == alts[i].src){
            title.textContent = alts[i].alt;
            
            if(mediaFormat.at(-1) != 'mp4'){ 
                med.setAttribute("alt", alts[i].alt + ', closeup view');
            }
            
        }
    }
    
    imgBox.appendChild(med);
    imgBox.appendChild(title);
    lightboxContainer.appendChild(imgBox);
    lightboxContainer.appendChild(close);
    lightboxContainer.appendChild(next);
    lightboxContainer.appendChild(previous);
    lightbox.appendChild(lightboxContainer);
    
    document.body.appendChild(lightbox);

    this.src = src;

    // EventListenner de fermeture de la modale
    this.onKeyUp = this.onKeyUp.bind(this);
    document.getElementById('close-btn').addEventListener('click', this.close.bind(this));
    document.addEventListener('keyup', this.onKeyUp);

//################################################################################################################################

let medias = Array.from(document.querySelectorAll('.thumb-vid,.thumb-img'));

const nextMediaBtn = document.getElementById('next-btn');
const prevMediaBtn = document.getElementById('previous-btn');

// setTimeout(arrowNav, 1000);

prevMediaBtn.addEventListener('click', prevMed);
nextMediaBtn.addEventListener('click', nextMed);


// prevMediaBtn.addEventListener('keyup', arrowNav);


function nextMed(e){
    let currentMedia = imgBox.firstChild.src;
    let nextMedia;

    medias.forEach(media => {   
        if(media.src == currentMedia){
            nextMedia = medias[medias.indexOf(media) + 1];
            console.log(nextMedia);

            if(nextMedia){
                let formatNextMedia = nextMedia.src.split('.');
                if(formatNextMedia.at(-1) == 'mp4'){ 
                    console.log(nextMedia.src.at(-1));
                    med = document.createElement('video');
                    med.setAttribute('class', 'video-full-screen');
                    med.setAttribute('controls', 'controls');
                    med.setAttribute('src', nextMedia.src);
                } else{
                    med = document.createElement('img');
                    med.setAttribute('class', 'image-full-screen');
                    med.setAttribute("alt", nextMedia.alt);
                    med.setAttribute('src', nextMedia.src);
                }

                imgBox.replaceChild(med, imgBox.firstChild);

            }else{
                imgBox.firstChild.src = medias[0].src;
                title.textContent = nextMedia.alt;
            }
        }
    });
}

nextMediaBtn.addEventListener('keyup', e => {
    if(e.isComposing || e.key === 'ArrowRight'){
        let currentMedia = imgBox.firstChild.src;
        let nextMedia;
    
        medias.forEach(media => {   
            if(media.src == currentMedia){
                nextMedia = medias[medias.indexOf(media) + 1];
                console.log(nextMedia);
    
                if(nextMedia){
                    let formatNextMedia = nextMedia.src.split('.');
                    if(formatNextMedia.at(-1) == 'mp4'){ 
                        console.log(nextMedia.src.at(-1));
                        med = document.createElement('video');
                        med.setAttribute('class', 'video-full-screen');
                        med.setAttribute('controls', 'controls');
                        med.setAttribute('src', nextMedia.src);
                    } else{
                        med = document.createElement('img');
                        med.setAttribute('class', 'image-full-screen');
                        med.setAttribute("alt", nextMedia.alt);
                        med.setAttribute('src', nextMedia.src);
                    }
    
                    imgBox.replaceChild(med, imgBox.firstChild);
    
                }else{
                    imgBox.firstChild.src = medias[0].src;
                    title.textContent = nextMedia.alt;
                }
            }
        });
    }
});

function prevMed(e){
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
                    med.setAttribute('src', prevMedia.src);
                } else{
                    med = document.createElement('img');
                    med.setAttribute('class', 'image-full-screen');
                    med.setAttribute("alt", prevMedia.alt)
                    med.setAttribute('src', prevMedia.src);
                }

                imgBox.replaceChild(med, imgBox.firstChild);

            }else{
                imgBox.firstChild.src = medias[medias.length - 1].src;
                title.textContent = prevMedia.alt;
            }
        }
    });
}

// function arrowNav(e){

//     // if(e === undefined){
//     //     nextMed(e);
//     // }

//     if(e.key === 'ArrowRight'){
//         nextMed(e);
//         console.log(e);
//     }
//     else if(e.key === 'ArrowLeft'){
//         prevMed(e);
//     }
// }

//################################################################################################################################
}
