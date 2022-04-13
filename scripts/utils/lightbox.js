/**
 *  Création de la LightBox 
 */

// let photographerImg = document.getElementById('photographer_image');
// console.log(photographerImg);

// let photographerMedia = photographerImg.childNodes;
// console.log(photographerMedia);

// for(let i = 0; i > photographerMedia.length; )
// let links = photographerMedia.innerHTML;
// console.log(links);

// function init(){

//     links.forEach(link => {
//         link.addEventListener('click', lightboxAffiche);
//     });

// }



// class LightBox {

//     static init(){
        
//     }

//     constructor(url){
//         const element = this.buildLightBox(url);
//         document.body.appendChild(element);
//     }

//     buildLightBox(url){
        
//         const lightbox = document.createElement('div');
//         lightbox.setAttribute('class', 'lightbox');

//         const close = document.createElement('button');
//         close.setAttribute('class', 'close-btn');

//         const next = document.createElement('button');
//         next.setAttribute('class', 'next-btn');
//         next.textContent = 'suivant';

//         const previous = document.createElement('button');
//         previous.setAttribute('class', 'previous-btn');
//         previous.textContent = 'precedent';

//         const imgBox = document.createElement('div');
//         imgBox.setAttribute('class', 'img-container');

//         const image = document.createElement('img');
//         image.setAttribute('class', 'image-full-screen');
//         image.setAttribute('src', '${url}');

//         const title = document.createElement('p');
//         title.setAttribute('class', 'img-title');
//         title.textContent = "Je suis le titre";

//         lightbox.appendChild(close);
//         lightbox.appendChild(next);
//         lightbox.appendChild(previous);
//         lightbox.appendChild(imgBox);
//         imgBox.appendChild(image);
//         imgBox.appendChild(title);
//         return lightbox;
//     }
// }

// LightBox.init();









 function lightBox(){

    const lightbox = document.createElement('div');
    lightbox.setAttribute('class', 'lightbox');

    const close = document.createElement('button');
    close.setAttribute('class', 'close-btn');

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

    const title = document.createElement('p');
    title.setAttribute('class', 'img-title');
    title.textContent = "Je suis le titre";

    lightbox.appendChild(close);
    lightbox.appendChild(next);
    lightbox.appendChild(previous);
    lightbox.appendChild(imgBox);
    imgBox.appendChild(image);
    imgBox.appendChild(title);
    document.body.appendChild(lightbox);
}

// lightBox();
