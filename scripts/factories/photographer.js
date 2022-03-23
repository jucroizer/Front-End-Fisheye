function photographerFactory(data) {
    console.log(data);
    const { name, id, city, country,  tagline, price, portrait, photographerId, 
        title, image, likes, date } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;
    const media = `assets/photographers/${photographerId}/${image}`;
    console.log(media);
    
    

    function getUserCardDOM() {

        const article = document.createElement('article');
        article.setAttribute('id', id);
        
       
        const a = document.createElement('a');
        a.setAttribute('href', 'http://127.0.0.1:5501/photographer.html?id=' + id);

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        
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

    function getPhotographerMeta() {

        const mainDiv = document.createElement('div');
        mainDiv.setAttribute('class', 'photograph-meta');

        const divProfile = document.createElement('div');
        divProfile.setAttribute("class", 'photographer-profile');

        const divPortrait = document.createElement('div');
        divPortrait.setAttribute("class", "user");

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("class", "user-img");

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const pLocation = document.createElement('p');
        pLocation.textContent = city + ', ' + country;

        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;

        mainDiv.appendChild(divProfile);
        mainDiv.appendChild(divPortrait);
        
        divPortrait.appendChild(img);
        divProfile.appendChild(h2);
        divProfile.appendChild(pLocation);
        divProfile.appendChild(pTagline);
        // mainDiv.innerHTML = div;
        return(mainDiv);
    }

    function getPhotographerMedia() {

        const photoDiv = document.createElement('div');
        photoDiv.setAttribute('class', 'photographer-media');
        // .innerHTML = data.map((image) => 
        //     <img class="photographer-image" src="assets/photographers/${}"></img>
        // );
        

        
        const img = document.createElement('img');
        img.setAttribute("src", media);
        img.setAttribute("class", 'thumb-img');
       
        photoDiv.appendChild(img);
        return(photoDiv);
    }

    return { name, picture, getUserCardDOM, getPhotographerMeta, getPhotographerMedia }
}