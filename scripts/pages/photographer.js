// export let MEDIA = tabPop;

//Mettre le code JavaScript lié à la page photographer.html

let params = new URLSearchParams(window.location.search).get('id');

let price = 0;
let tabPop = [];
let tabLikes = [];
let tabTitle = [];
let tabDate = [];
let like = 0;
let tabMedia = [];
console.log(tabMedia);
let totLikes = 0;

const getPhotographer = async() => {
    return await fetch('http://127.0.0.1:5501/data/photographers.json')

    // récupération du fichier json
    .then(function(result) { return result.json() })
    // récupération des données de photographers et media
    .then(function(data){ return data })
    // affiche une erreur si le fichier n'ai pas trouvé
    .catch(function(error){ console.log('une erreur fetch' + error)})
}

async function displayData(photographers, test) {
    // console.log(photographers);
    // console.log(media);

    // recupere l'element parent
    const photographersSection = document.querySelector("#photograph-header");
    const photographersMedia = document.querySelector("#photographer_image");


    photographers.forEach((photographer) => {
    //    console.log(photographer);
        if(photographer.id == params){
            //recupere les elements de la factory
            const photographerModel = photographerFactory(photographer);

            price = photographer.price;
            // console.log(price);

            // recupere les elements a inserer dans le HTML
            const getPhotographerMeta = photographerModel.getPhotographerMeta();

            // insere les elements a inserer de la factory dans l'element parent
            // photographersSection.appendChild(getPhotographerMeta);
        }
    });

    
  

    photographers.forEach((media) => {
        // console.log(media.photographerId);
        // console.log(photographer.id);

        // let i = 0;
        if(media.photographerId == params && test == false){
            // console.log(media);
            const photographerModel = photographerFactory(media);
            // console.log(photographerModel);

            // recupere les elements a inserer dans le HTML
            const getPhotographerMedia = photographerModel.getPhotographerMedia();
            
            totLikes += media.likes;
            

            tabPop.push(media);
            tabTitle.push(media);
            tabDate.push(media);
            tabMedia.push(media);
            tabLikes.push(media.likes);

            
            // insere les elements a inserer de la factory dans l'element parent
            photographersMedia.appendChild(getPhotographerMedia);
        }

    });
    
    function afficherLikes(){

        
        const globalMedia = document.createElement('div');
        globalMedia.setAttribute('class', 'totaux');
        
        const mediaRecap = document.createElement('div');
        
            if(!test){
                const totalLikes = document.createElement('p');
                totalLikes.setAttribute('class', 'totalLikes');
                totalLikes.textContent = totLikes;
                // console.log(totLikes);
                mediaRecap.appendChild(totalLikes);
            }

        
            if(test){
                const photoPrice = document.createElement('p');
                photoPrice.textContent = price + '€ / jour';
                // console.log(photoPrice);
                mediaRecap.appendChild(photoPrice);
            }
            
            globalMedia.appendChild(mediaRecap)
            // console.log(globalMedia);
            document.getElementById('main').appendChild(globalMedia);

    }
    
    afficherLikes();
    countLikes();
    console.log(like);
    
};

async function init() {
    // Récupère les datas des photographes et les medias
    const photographers  = await getPhotographer();
    // console.log(photographers);
    displayData(photographers.photographers, true);
    displayData(photographers.media, false);
};


init();

console.log(tabLikes);

/**
*  Compteur de likes
*/

let nbClick = like;
let clickLike = document.getElementsByClassName("btn-like");
console.log(clickLike);

// clickLike.addEventListener("click", nbLike);

// function nbLike(){

// }

function countLikes(){
    for(let i = 0; i < tabLikes.length; i++){
        like += tabLikes[i];
    }
}


/**
 *  Creation des filtres
 */
function filterNav(){

    const filterBar = document.createElement('div');
    filterBar.setAttribute('id', 'filter-bar');

    const filterP = document.createElement('p');
    filterP.textContent = 'Trier par';
    filterP.setAttribute('class', 'filter-title');

    filterBar.appendChild(filterP);

    const navFilter = document.createElement('div');
    navFilter.setAttribute('class', 'select-box');

    filterBar.appendChild(navFilter);

    const container = document.createElement('div');
    container.setAttribute('class', 'options-container');

    navFilter.appendChild(container);

    const optionPop = document.createElement('div');
    optionPop.setAttribute('class', 'option');

    container.appendChild(optionPop);

    const btnFilterPop = document.createElement('input');
    btnFilterPop.setAttribute('id', 'pop');
    btnFilterPop.setAttribute('class', 'filter-li pop-filtre');
    btnFilterPop.setAttribute('type', 'button');
    btnFilterPop.setAttribute('name', 'popularite');
    // btnFilterPop.setAttribute('value', 'Popularité');

    const labelPop = document.createElement('label');
    labelPop.setAttribute('for', 'popularite');
    labelPop.innerHTML = 'Popularité';

    optionPop.appendChild(btnFilterPop);
    optionPop.appendChild(labelPop);

    const spanLine1 = document.createElement('span');
    btnFilterPop.appendChild(spanLine1);

    // const btnFilterTit = document.createElement('option');
    // btnFilterTit.setAttribute('id', 'title');
    // btnFilterTit.setAttribute('class', 'filter-li tit-filtres');
    // btnFilterTit.textContent = 'Titre';

    const optionDate = document.createElement('div');
    optionDate.setAttribute('class', 'option');

    container.appendChild(optionDate);

    const btnFilterDate = document.createElement('input');
    btnFilterDate.setAttribute('id', 'date');
    btnFilterDate.setAttribute('class', 'filter-li date-filtre');
    btnFilterDate.setAttribute('type', 'button');
    btnFilterDate.setAttribute('name', 'date');
    btnFilterDate.setAttribute('value', 'Date');

    optionDate.appendChild(btnFilterDate);

    const spanLine2 = document.createElement('span');
    btnFilterDate.appendChild(spanLine2);

    // const btnFilterDate = document.createElement('option');
    // btnFilterDate.setAttribute('id', 'date');
    // btnFilterDate.setAttribute('class', 'filter-li');
    // btnFilterDate.textContent = 'Date';
    const optionTitle = document.createElement('div');
    optionTitle.setAttribute('class', 'option');

    container.appendChild(optionTitle);

    const btnFilterTit = document.createElement('input');
    btnFilterTit.setAttribute('id', 'title');
    btnFilterTit.setAttribute('class', 'filter-li');
    btnFilterTit.setAttribute('type', 'button');
    btnFilterTit.setAttribute('name', 'title');
    btnFilterTit.setAttribute('value', 'Title');

    optionTitle.appendChild(btnFilterTit);

    const divArrow = document.createElement('div');
    divArrow.setAttribute('class', 'selected');

    navFilter.appendChild(divArrow);

    document.getElementById('main').appendChild(filterBar);
    
}

filterNav();

/**
 * Insertion du selecteur de filtre avant les images du photgraphe
 */

const images = document.getElementById('photographer_image');
const filter = document.getElementById('filter-bar');
let parentDiv = images.parentNode;

parentDiv.insertBefore(filter, images);

/**
 *  Tri des différents filtres
 */

// Fonction de tri par nombre de likes
let sortPop = document.getElementById("pop");
sortPop.addEventListener("click", filterPop);

function filterPop(){

        tabPop.sort(function(a, b){
            return a.likes - b.likes;
        });
        
        refreshMedia(tabPop);
}

// Fonction de tri par titre
let sortTitle = document.getElementById("title");
sortTitle.addEventListener("click", filterTitle);
    
function filterTitle(){
        
        tabTitle.sort(function(a, b){
            if(a.title > b.title){
                return 1;
            }else if(b.title > a.title){
                return -1;
            }else{
                return 0;
            }
        });

        refreshMedia(tabTitle);
}

// Fonction de tri par date
let sortDate = document.getElementById("date");
sortDate.addEventListener("click", filterDate);

function filterDate(){
            
    tabDate.sort(function(a, b){
        return new Date(a.date).valueOf() - new Date(b.date).valueOf();
    });

    refreshMedia(tabDate);
}

function refreshMedia(mediaSort) {

    // console.log('mon log ' + mediaSort);
    const removePhoto = document.getElementById('photographer_image');
    removePhoto.innerHTML = ' ';

    for(data in mediaSort){

        // console.log(data);
        
        const photoDiv = document.createElement('div');
        photoDiv.setAttribute('class', 'photographer-media');

        // console.log(mediaImg);
        // console.log(mediaVid);
        let media = document.createElement('img');
        if(mediaSort[data].image != undefined){
            media = document.createElement('img');
            media.setAttribute("src", `assets/photographers/${mediaSort[data].photographerId}/${mediaSort[data].image}`);
            media.setAttribute("class", 'thumb-img');
        }else{
            media = document.createElement('video');
            media.setAttribute("src", `assets/photographers/${mediaSort[data].photographerId}/${mediaSort[data].video}`);
            media.setAttribute("type", "video/mp4");
            media.setAttribute("class", 'thumb-vid');
        }
    

        const mediaHeader = document.createElement('div');
        mediaHeader.setAttribute('class', 'media-header');

        const pTitle = document.createElement('p');
        pTitle.textContent = mediaSort[data].title;
        pTitle.setAttribute('class', 'img-title');

        const pLikes = document.createElement('p');
        pLikes.textContent = mediaSort[data].likes;
        pLikes.setAttribute('class', 'numb-likes');

        const btnLike = document.createElement('button');
        btnLike.setAttribute('id', 'btn-like');

        const heartLike = document.createElement('i');
        heartLike.setAttribute('class', 'fas fa-heart');

        photoDiv.appendChild(mediaHeader);
        photoDiv.appendChild(media);
        mediaHeader.appendChild(pTitle);
        mediaHeader.appendChild(pLikes);
        mediaHeader.appendChild(btnLike);
        btnLike.appendChild(heartLike);
        removePhoto.appendChild(photoDiv);
    }
    
}



// ouverture du menu deroulant

const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");

const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");
});

optionsList.forEach(o => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
  });
});



