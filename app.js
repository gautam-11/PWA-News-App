const apiKey = '1a470f46dc2641c884fef9b90c694d4d';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'the-washington-post';

window.addEventListener('load'  , async e => {
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSource;

    sourceSelector.addEventListener('change' , e => {
    updateNews(e.target.value);
    });

    if ( 'serviceWorker' in navigator){
      try {
        navigator.serviceWorker.register('sw.js'); //Make sure sw.js is in root folder
        console.log( `Service Worker registered`);
      } catch (error) {
        console.log( `Service Worker registration failed!!`);
      }
    }

});

async function updateSources(){

    const res = await fetch(`https://newsapi.org/v1/sources`);
    const json = await res.json();
    
    sourceSelector.innerHTML = json.sources.map(source => `<option value="${source.id}">${source.name}</option>`)
    .join('\n');


}

async function updateNews(source = defaultSource){

    const res = await fetch(`https://newsapi.org/v1/articles?source=${source}&apiKey=${apiKey}`);
    const json = await res.json();

    main.innerHTML = json.articles.map(createArticle).join('\n');

}

function createArticle(article) {
    return `
      <div class="article">
        <a href="${article.url}">
          <h2>${article.title}</h2>
          <img src="${article.urlToImage}" alt="${article.title}">
          <p>${article.description}</p>
        </a>
      </div>
    `;
  }