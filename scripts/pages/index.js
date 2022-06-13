import {photographerFactory} from '../factories/photographer.js';
    
    const getPhotographers = async() => {
        return await fetch('https://jucroizer.github.io/JustineCroizer_6_23022022/data/photographers.json')
        .then(function(result) { return result.json() })
        .then(function(data){ return data })
        .catch(function(error){ console.log('une erreur fetch' + error)})
    }

    async function displayData(photographers) {
        // récupére l'élément ayant la classe photographer_section
        const photographersSection = document.querySelector(".photographer_section");

        // Pour chaque photographe...
        photographers.forEach((photographer) => {
            // Communique avec la factorie et passe en argument les éléments json dont la factorie a besoin
            const photographerModel = photographerFactory(photographer);

            // récupére les éléments de chaque photographe et crée les éléments
            const userCardDOM = photographerModel.getUserCardDOM();
            
            // insére les éléments dans le DOM
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const photographers  = await getPhotographers();
        // appel la fonction display data en lui donnant en paramètres les informations du json
        displayData(photographers.photographers);
    }
    
    init(); 
    
