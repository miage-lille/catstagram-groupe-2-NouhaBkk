const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
 

const API_KEY = "48864358-0e01e135902ced1ad064c4598";
const API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=cat&per_page=10`;


fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    const formattedData = data.hits.map((hit) => ({
      previewFormat: hit.previewURL,
      webFormat: hit.webformatURL,
      largeFormat: hit.largeImageURL,
      author: hit.user,
    }));

    console.log(JSON.stringify(formattedData, null, 2)); 
  })
  .catch((error) => console.error("Erreur lors de l'appel API :", error));
