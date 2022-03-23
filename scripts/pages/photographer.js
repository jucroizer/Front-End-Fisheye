//Mettre le code JavaScript lié à la page photographer.html

let params = new URLSearchParams(window.location.search).get('id');



const getPhotographer = async() => {
    return await fetch('http://127.0.0.1:5501/data/photographers.json')

    // récupération du fichier json
    .then(function(result) { return result.json() })
    // récupération des données de photographers et media
    .then(function(data){ return data })
    // affiche une erreur si le fichier n'ai pas trouvé
    .catch(function(error){ console.log('une erreur fetch' + error)})
}

async function displayData(photographers, media) {
    // console.log(photographers);
    // console.log(media);

    // recupere l'element parent
    const photographersSection = document.querySelector("#photograph-header");
    const photographersMedia = document.querySelector(".photographer_image");


    photographers.forEach((photographer) => {
    //    console.log(photographer);
        if(photographer.id == params){
            //recupere les elements de la factory
            const photographerModel = photographerFactory(photographer);

            // recupere les elements a inserer dans le HTML
            const getPhotographerMeta = photographerModel.getPhotographerMeta();

            // insere les elements a inserer de la factory dans l'element parent
            photographersSection.appendChild(getPhotographerMeta);
        }
    });

    photographers.forEach((media) => {
        // console.log(media.photographerId);
        // console.log(photographer.id);

        if(media.photographerId == params){
            // console.log(media);
            const photographerModel = photographerFactory(media);
            // console.log(photographerModel);

            // recupere les elements a inserer dans le HTML
            const getPhotographerMedia = photographerModel.getPhotographerMedia();

            // insere les elements a inserer de la factory dans l'element parent
            photographersMedia.appendChild(getPhotographerMedia);
        }
    });
    
};

async function init() {
    // Récupère les datas des photographes et les medias
    const photographers  = await getPhotographer();
    // console.log(photographers);
    displayData(photographers.photographers);
    displayData(photographers.media);
    
};

init();