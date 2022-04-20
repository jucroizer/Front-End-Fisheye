    const getPhotographers = async() => {
        return await fetch('http://127.0.0.1:5500/data/photographers.json')
        .then(function(result) { return result.json() })
        .then(function(data){ return data })
        .catch(function(error){ console.log('une erreur fetch' + error)})
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const photographers  = await getPhotographers();
        
        displayData(photographers.photographers);
    };
    
    init();
    