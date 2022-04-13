//Mettre le code JavaScript lié à la page photographer.html

let params = new URLSearchParams(window.location.search).get('id');

let price = 0;
let tabPop = [];
let tabTitle = [];
let tabDate = [];
let like = 0;

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

    
    let totLikes = 0;

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
            like = media.likes;

            tabPop.push(media);
            tabTitle.push(media);
            tabDate.push(media);

            
            // insere les elements a inserer de la factory dans l'element parent
            photographersMedia.appendChild(getPhotographerMedia);
        }

    });
    
    function afficherLikes(){

        
        const globalMedia = document.createElement('div');
        globalMedia.setAttribute('class', 'totaux');
        
        
        
            if(!test){
                const totalLikes = document.createElement('p');
                totalLikes.setAttribute('class', 'totalLikes');
                totalLikes.textContent = totLikes;
                // console.log(totLikes);
                globalMedia.appendChild(totalLikes);
            }

        
            if(test){
                const photoPrice = document.createElement('p');
                photoPrice.textContent = price + '€ / jour';
                // console.log(photoPrice);
                globalMedia.appendChild(photoPrice);
            }
            
            // console.log(globalMedia);
            document.getElementById('main').appendChild(globalMedia);

    }
    
    afficherLikes();
    
    
};

async function init() {
    // Récupère les datas des photographes et les medias
    const photographers  = await getPhotographer();
    // console.log(photographers);
    displayData(photographers.photographers, true);
    displayData(photographers.media, false);
};


init();


/**
*  Compteur de likes
*/

// let nbClick = like;
// let clicLike = document.getElementById("btn-like");
// clicLike.addEventListener("click", nbLike);


// function nbLike() {
//     nbClick++;
//     document.getElementsByClassName("numb-likes").textContent = nbClick;
// }




/**
 *  Creation des filtres
 */
function filterNav(){

    const filterBar = document.createElement('div');

    const filterP = document.createElement('p');
    filterP.textContent = 'Trier par';

    const navFilter = document.createElement('div');

    const btnFilterPop = document.createElement('a');
    btnFilterPop.setAttribute('id', 'pop');
    btnFilterPop.textContent = 'Popularité';

    const btnFilterTit = document.createElement('a');
    btnFilterTit.setAttribute('id', 'title');
    btnFilterTit.textContent = 'Titre';

    const btnFilterDate = document.createElement('a');
    btnFilterDate.setAttribute('id', 'date');
    btnFilterDate.textContent = 'Date';


    filterBar.appendChild(filterP);
    filterBar.appendChild(navFilter);
    navFilter.appendChild(btnFilterPop);
    navFilter.appendChild(btnFilterTit);
    navFilter.appendChild(btnFilterDate);
    document.getElementById('main').appendChild(filterBar);
    
}

filterNav();

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


