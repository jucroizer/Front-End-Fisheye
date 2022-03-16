function photographerFactory(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement('article');
        article.setAttribute('id', id);
        
       
        const a = document.createElement('a');
        a.setAttribute('href', 'http://127.0.0.1:5501/photographer.html#`${id}`');

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        
        const h2 = document.createElement('h2');
        h2.textContent = name;
        

        const h3 = document.createElement('h3');
        h3.textContent = city + ', ' + country;
        h3.style.color = "#901C1C";

        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;

        const pPrice = document.createElement('p');
        pPrice.textContent = price + '€/jour';

        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}