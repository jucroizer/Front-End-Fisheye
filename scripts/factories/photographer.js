export {photographerFactory};

    function photographerFactory(data) {
        
    const { name, id, city, country,  tagline, price, portrait, photographerId, 
        title, likes } = data;

    // Récupération de la photo du photographe
    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;
    
    // Création des éléments HTML de la page d'acceuil
    function getUserCardDOM() {

        const article = document.createElement('article');
        article.setAttribute('id', id);
        
        const a = document.createElement('a');
        a.setAttribute('href', 'photographer.html?id=' + id);

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        
        const h2 = document.createElement('h2');
        h2.textContent = name;
        

        const h3 = document.createElement('h3');
        h3.textContent = city + ', ' + country;
        h3.style.color = "#901C1C";
        h3.style.fontWeight = 400;
        h3.style.fontSize = '13px';
        h3.style.marginTop = '-10%';

        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;
        pTagline.style.fontSize = '10px';
        pTagline.style.marginTop = '-3%';

        const pPrice = document.createElement('p');
        pPrice.textContent = price + '€/jour';
        pPrice.style.fontSize = '9px';
        pPrice.style.color = '#757575';
        pPrice.style.marginTop = '-1%';

        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        return (article);
    }

    // Création des éléments HTML du bandeau de la page du photographe
    function getPhotographerMeta() {

        const header = document.getElementById('photograph-header');

        const divProfile = document.createElement('div');
        divProfile.setAttribute("class", 'photographer-profile');

        const divPortrait = document.createElement('div');
        divPortrait.setAttribute("class", "user");

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("class", "user-img");
        img.setAttribute('aria-label', name);

        const h1 = document.createElement('h1');
        h1.textContent = name;
        h1.setAttribute("id", "photographer-name");

        const pLocation = document.createElement('p');
        pLocation.textContent = city + ', ' + country;
        pLocation.setAttribute('class', 'photographer-location');

        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;
        pTagline.setAttribute('class', 'photographer-tagline');

        
        header.appendChild(divProfile);
        header.appendChild(divPortrait);
        
        divPortrait.appendChild(img);
        divProfile.appendChild(h1);
        divProfile.appendChild(pLocation);
        divProfile.appendChild(pTagline);
        return(header);
    }

    // Création des éléments HTML de la page photographe
    function getPhotographerMedia() {

        const photoDiv = document.createElement('div');
        photoDiv.setAttribute('class', 'photographer-media');

        let link;

        let media = document.createElement('img');
        if(data.image != undefined){
            link = document.createElement('button');
            link.setAttribute('class', 'enterBtn');
            media = document.createElement('img');
            media.setAttribute("src", `assets/photographers/${photographerId}/${data.image}`);
            media.setAttribute("alt", `${data.title}`);
            media.setAttribute("class", 'media thumb-img');
        }else{
            link = document.createElement('button');
            link.setAttribute('class', 'enterBtn');
            media = document.createElement('video');
            media.setAttribute("src", `assets/photographers/${photographerId}/${data.video}`);
            media.setAttribute("type", "video/mp4");
            media.setAttribute("title", `${data.title}`);
            media.setAttribute("class", 'media thumb-vid');
        }

        const mediaHeader = document.createElement('div');
        mediaHeader.setAttribute('class', 'media-header');

        const pTitle = document.createElement('p');
        pTitle.textContent = title;
        pTitle.setAttribute('class', 'img-title');

        const pLikes = document.createElement('p');
        pLikes.textContent = likes;
        pLikes.setAttribute('class', 'numb-likes');

        const btnLike = document.createElement('div');
        btnLike.setAttribute('class', 'div-like');

        const heartLike = document.createElement('button');
        heartLike.setAttribute('class', 'btn-like');
        heartLike.setAttribute('aria-label', 'likes');
        heartLike.innerHTML = '<i class="fas fa-heart" aria-hidden="true"></i>';

        
        photoDiv.appendChild(link);
        link.appendChild(media);
        photoDiv.appendChild(mediaHeader);
        mediaHeader.appendChild(pTitle);
        btnLike.appendChild(pLikes);
        mediaHeader.appendChild(btnLike);
        btnLike.appendChild(heartLike);
        return(photoDiv);
    }

    // renvoi les éléments créer dans la factorie
    return { name, picture, getUserCardDOM, getPhotographerMeta, getPhotographerMedia }
}