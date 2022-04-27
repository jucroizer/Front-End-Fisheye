/**
 * Création de la lightbox
 */ 


 setTimeout(mediaTab, 1000);
 
  
 function mediaTab(){
    
    const collection = document.getElementsByClassName("media");
    let tab = [].concat(...collection);

      
     for(let i = 0; i < tab.length; i++){
         tab[i].addEventListener('click', targetSrc);
     }
 }

 
 function targetSrc(e){
     console.log(e);
     e = e || window.event; 
     var target = e.target;
 
     if(target.tagName == 'IMG'){ 
         lightBox(target.src); 
     } else if(target.tagName == 'VIDEO'){
         lightBox(target.src);
     }
 } 
 
 function lightBox(src){
     console.log(src);
 
    //A changer une fois sur gitPages
    console.log(src.split('.')[4]);
    // Faire un if pour l'image et la video
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
    imgBox.setAttribute('id', 'img-container');
 
    let media = document.createElement('img');
    media.setAttribute("src", src);
    media.setAttribute("class", 'media-full-screen');
     // if(src.split('.')[4] == 'png'){
     //     media = document.createElement('img');
         
     //     media.setAttribute("class", 'media-full-screen');
     // }else if(src.split('.')[4] == 'mp4'){
     //     media = document.createElement('video');
     //     media.setAttribute("src", src);
     //     media.setAttribute("type", "video/mp4");
     //     media.setAttribute("class", 'media-full-screen');
     // }
    
    const title = document.createElement('p');
    title.setAttribute('class', 'img-title');
    title.textContent = src.title;
 
    lightbox.appendChild(close);
    lightbox.appendChild(next);
    lightbox.appendChild(previous);
    lightbox.appendChild(imgBox);
    imgBox.appendChild(media);
    // imgBox.appendChild(video);
    imgBox.appendChild(title);
    document.body.appendChild(lightbox);
 
    this.src = src;
 
    // EventListenner de fermeture de la modale
    this.onKeyUp = this.onKeyUp.bind(this);
    document.getElementById('close-btn').addEventListener('click', this.close.bind(this));
    document.addEventListener('keyup', this.onKeyUp);
 
    // Appel aux fonctions de navigation
    const nextBtn = document.getElementById('next-btn');
    nextBtn.addEventListener('click', nextImg);
    document.addEventListener('keyup', navRight);
 
    const prevBtn = document.getElementById('previous-btn');
    prevBtn.addEventListener('click', prevImg);
    document.addEventListener('keyup', navLeft);
 }
 
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
 
 // Passage aux elements suivant
 function nextImg(){
     // Mon tableau de media
     let medias = document.querySelectorAll('.media');
     let mediasTab = Array.from(medias);
 
     console.log(mediasTab)
 
     let container = document.getElementById('lightbox');
 
     for(let i = 0; i < mediasTab.length; i++){
         // console.log(mediasTab[i].currentSrc[i + 1]);
         if(mediasTab[i].currentSrc == src){
             // console.log(typeof(mediasTab[i].currentSrc));
             container.remove();
             lightBox(mediasTab[i + 1].currentSrc);
             if(i == mediasTab[i].length - 1){
                 i = -1;
                 lightBox(mediasTab[i + 1].currentSrc);
             }
             break;
         }
     }
 }
 
 function navRight(e){
    if(e.key == 'ArrowRight'){
        nextImg();
    }
 }

 // Passage aux elements précédents
 function prevImg(){
     // Mon tableau de media
     let medias = document.querySelectorAll('.media');
     let mediasTab = Array.from(medias);
 
     console.log(mediasTab)
 
     let container = document.getElementById('lightbox');
 
     for(let i = 0; i < mediasTab.length; i++){
         // console.log(mediasTab[i].currentSrc[i + 1]);
         if(mediasTab[i].currentSrc == src){
             // console.log(typeof(mediasTab[i].currentSrc));
             container.remove();
             lightBox(mediasTab[i - 1].currentSrc);
             // if(i == mediasTab[i].length - 1){
             //     i = -1;
             // }
             break;
         }
     }
 }
 
 function navLeft(e){
    if(e.key == 'ArrowLeft'){
        prevImg();
    }
 }