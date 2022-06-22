import {photographerFactory} from '../factories/photographer.js';
import {btnEnter} from '../utils/lightbox.js';
// récupére 
let params = new URLSearchParams(window.location.search).get('id');
 
// declaration de la variable price
let price = 0;

// declaration du tableau vide acceuilant les likes 
let tabPop = [];

// declaration du tableau vide acceuilant les titres
let tabTitle = [];

// declaration du tableau vide acceuilant les dates
let tabDate = [];

// declaration du tableau vide acceuilant tous les medias du photographe 
let tabMedia = [];

// declaration de la variable totalLikes
let totLikes = 0;

const getPhotographer = async() => {
    return await fetch('https://jucroizer.github.io/JustineCroizer_6_23022022/data/photographers.json')
    // récupération du fichier json
    .then(function(result) { return result.json() })
    // récupération des données de photographers et media
    .then(function(data){ return data })
    // affiche une erreur si le fichier n'ai pas trouvé
    .catch(function(error){ console.log('une erreur fetch' + error)})
}

async function displayData(photographers) {
   
    // recupere l'element parent
    const photographersMedia = document.querySelector("#photographer_image");

    photographers.forEach((photographer) => {
    //    console.log(photographer);
        if(photographer.id == params){
            //recupere les elements de la factory
            const photographerModel = photographerFactory(photographer);
            
            // Récupére le prix 
            price = photographer.price;

            // recupere les elements a inserer dans le HTML
            photographerModel.getPhotographerMeta();
        }
    });

    photographers.forEach((media) => {

        // Si l'ID du photographe du media est égale à l'ID passer en paramètre de la page alors
        if(media.photographerId == params){
            
            // Communique avec la factorie et passe en argument les éléments json dont la factorie a besoin
            const photographerModel = photographerFactory(media);
            
            // recupere les elements a inserer dans le HTML
            const getPhotographerMedia = photographerModel.getPhotographerMedia();

            // Récupére et additionne tous les likes pour obtenir le total de likes
            totLikes += media.likes;

            // Insertion des données dans les tableaux
            tabPop.push(media);
            tabTitle.push(media);
            tabDate.push(media);
            tabMedia.push(media);

           // insére les éléments dans le DOM
            photographersMedia.appendChild(getPhotographerMedia);
        }

    });
    
}

async function init() {
    // Récupère les datas des photographes et les medias
    const photographers  = await getPhotographer();
    
    displayData(photographers.photographers);
    displayData(photographers.media);
}

init();


/**
 * Affichage des totaux
 */

// Déclenche la fonction au bout d'une seconde
setTimeout(afficherLikes, 1000);

function afficherLikes(){

    const globalMedia = document.createElement('div');
    globalMedia.setAttribute('class', 'totaux');
    
    const likesRecap = document.createElement('div');
    likesRecap.setAttribute('class', 'likes-recap');
    
    const totalLikes = document.createElement('p');
    totalLikes.setAttribute('class', 'totalLikes');
    totalLikes.textContent = totLikes;

    const heartTot = document.createElement('i');
    heartTot.setAttribute('class', 'fas fa-heart heart-tot');
    heartTot.setAttribute('aria-hidden', 'true');
    likesRecap.appendChild(totalLikes);
    likesRecap.appendChild(heartTot);
        
    
    const priceRecap = document.createElement('div');
    priceRecap.setAttribute('class', 'price-recap');

    const photoPrice = document.createElement('p');
    photoPrice.textContent = price + '€ / jour';
       
    priceRecap.appendChild(photoPrice);
       
    globalMedia.appendChild(likesRecap);
    globalMedia.appendChild(priceRecap);
       
    document.getElementById('main').appendChild(globalMedia);
}

/**
*  Compteur de likes
*/

// Déclenche la fonction au bout de deux seconde
setTimeout(countLike, 2000);

function countLike(){
    // Récupére tous les éléments ayant la classe btn-likes
    const btnLike = document.querySelectorAll(".btn-like");
    
    // Boucle sur tous les elemts du tableau btnLike
    for (var i = 0 ; i < btnLike.length; i++) {
        // au clique sur l'un des boutons 
        btnLike[i].addEventListener('click', function(e){
            e = e || window.event; 

            // recupere l'icone heart
            const target = e.target;
            // recupere la div parente soit div-like
            const parentTarget = target.parentNode.parentNode;
            // recupere le premier enfant du parent soit le nombre de likes du media
            let likeCount = parentTarget.firstChild;
            // recupere la valeur de l'enfant
            let value = parseInt(likeCount.innerHTML);
            // recupere la div qui contient le total de likes
            const totCountLike = document.querySelector('.totalLikes');

            // eslint-disable-next-line use-isnan
            if (isNaN(value)){
                const parentTarget = target.parentNode;
                // recupere le premier enfant du parent soit le nombre de likes du media
                let likeCount = parentTarget.firstChild; 
                // recupere la valeur de l'enfant
                let value = parseInt(likeCount.innerHTML);
                // recupere la div qui contient le total de likes
                const totCountLike = document.querySelector('.totalLikes');

                // ajoute +1 à chaque clique
                value += 1;
                // remplace la valeur de l'enfant avec la valeur +1
                likeCount.innerHTML = value;
                // ajoute +1 au nombre de likes
                totCountLike.innerHTML++;

                return;
            }
            
            // ajoute +1 à chaque clique
            value += 1;
            // remplace la valeur de l'enfant avec la valeur +1
            likeCount.innerHTML = value;
            // ajoute +1 au nombre de likes
            totCountLike.innerHTML++;
        }); 
    }
}

/**
 *  Creation des filtres
 */
function filterNav(){

    // container

    const filterBar = document.createElement('div');
    filterBar.setAttribute('id', 'filter-bar');

    const filterP = document.createElement('p');
    filterP.textContent = 'Trier par';
    filterP.setAttribute('class', 'filter-title');

    filterBar.appendChild(filterP);


    // menu deroulant
    const navFilter = document.createElement('div');
    navFilter.setAttribute('class', 'select-box');
    navFilter.setAttribute('tabIndex', '0');

    const container = document.createElement('div');
    container.setAttribute('class', 'options-container options-hide');

    navFilter.appendChild(container);
    

     /**
     * Bouton filtre Popularité
     */

    const optionPop = document.createElement('div');
    optionPop.setAttribute('class', 'option');

    container.appendChild(optionPop);

    const btnFilterPop = document.createElement('input');      
    btnFilterPop.setAttribute('id', 'pop');
    btnFilterPop.setAttribute('type', 'button');
    btnFilterPop.setAttribute('role', 'button');
    btnFilterPop.setAttribute('value', 'Popularité');
    btnFilterPop.innerHTML = "Popularité";

    const labelPop = document.createElement('label');
    labelPop.setAttribute('for', 'pop');
    labelPop.innerHTML = 'Popularité';

    optionPop.appendChild(btnFilterPop);
    optionPop.appendChild(labelPop);
    
    /**
     *  Bouton filtre Date
     */
    const optionDate = document.createElement('div');
    optionDate.setAttribute('class', 'option');

    container.appendChild(optionDate);

    const btnFilterDate = document.createElement('input');
    btnFilterDate.setAttribute('id', 'date');
    btnFilterDate.setAttribute('type', 'button');
    btnFilterDate.setAttribute('role', 'button');
    btnFilterDate.setAttribute('value', 'Date');
    btnFilterDate.innerHTML = "Date";

    const labelDate = document.createElement('label');
    labelDate.setAttribute('for', 'date');
    labelDate.innerHTML = 'Date';

    optionDate.appendChild(btnFilterDate);
    optionDate.appendChild(labelDate);

    /**
     *  Bouton filtre Titre
     */
    const optionTitle = document.createElement('div');
    optionTitle.setAttribute('class', 'option opt-title');

    container.appendChild(optionTitle);

    const btnFilterTit = document.createElement('input');
    btnFilterTit.setAttribute('id', 'title');
    btnFilterTit.setAttribute('type', 'button');
    btnFilterTit.setAttribute('role', 'button');
    btnFilterTit.setAttribute('value', 'Titre');
    btnFilterTit.innerHTML = "Titre";

    const labelTitle = document.createElement('label');
    labelTitle.setAttribute('for', 'title');
    labelTitle.innerHTML = 'Titre';

    optionTitle.appendChild(btnFilterTit);
    optionTitle.appendChild(labelTitle);

    /**
     *  Fléche ouverture du menu deroulant
     */
     const divArrow = document.createElement('div');
     divArrow.setAttribute('class', 'selected');
     
    navFilter.appendChild(divArrow);

    filterBar.appendChild(navFilter);

   

    
    document.getElementById('main').appendChild(filterBar);
    
}

filterNav();
window.location.hash = "#select-box";

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

// Fonction d'affichage des medias en fonctions des filtres
function refreshMedia(mediaSort) {

    let data = 0;
    const removePhoto = document.getElementById('photographer_image');
    // vide la page
    removePhoto.innerHTML = '';

    for(data in mediaSort){
        
        const photoDiv = document.createElement('div');
        photoDiv.setAttribute('class', 'photographer-media');

        let link;

        let media = document.createElement('img');
        if(mediaSort[data].image != undefined){
            link = document.createElement('button');
            link.setAttribute('class', 'enterBtn');
            media = document.createElement('img');
            media.setAttribute("src", `assets/photographers/${mediaSort[data].photographerId}/${mediaSort[data].image}`);
            media.setAttribute("alt", `${mediaSort[data].title}`);
            media.setAttribute("class", 'thumb-img');
        }else{
            link = document.createElement('button');
            link.setAttribute('class', 'enterBtn');
            media = document.createElement('video');
            media.setAttribute("src", `assets/photographers/${mediaSort[data].photographerId}/${mediaSort[data].video}`);
            media.setAttribute("type", "video/mp4");
            media.setAttribute("title", `${mediaSort[data].title}`);
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

        const btnLike = document.createElement('div');
        btnLike.setAttribute('class', 'div-like');

        const heartLike = document.createElement('button');
        heartLike.setAttribute('class', 'btn-like');
        heartLike.innerHTML = '<i class="fas fa-heart" aria-hidden="true"></i>';
        
        photoDiv.appendChild(link);
        link.appendChild(media);
        photoDiv.appendChild(mediaHeader);
        mediaHeader.appendChild(pTitle);
        btnLike.appendChild(pLikes);
        mediaHeader.appendChild(btnLike);
        btnLike.appendChild(heartLike);
        removePhoto.appendChild(photoDiv);
    }

    // rappelle la fonction countLike 2sec après le chargement des medias triés
    setTimeout(countLike, 2000);
    setTimeout(btnEnter, 1000);

}



// ouverture du menu deroulant

const selected = document.querySelector(".selected");
const selectBox = document.querySelector(".select-box");
selected.innerHTML = "Popularité";
const optionsContainer = document.querySelector(".options-container");

const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
});

selectBox.addEventListener('keydown', (event) => {
    if(event.key === "Enter"){
        console.log('je reagis');
        optionsContainer.classList.toggle("active");
    }
});

optionsList.forEach(o => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
  });
});

