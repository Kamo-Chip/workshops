const API_KEY = "32ryWNgR3urVCwpdNTZ7FxmLFtIZyFKo";
const SEARCH_TERM = "cats";

const img = document.querySelector("img");

// Explain Asynchhronous JavaScript

// Explain Promises
function fetchData() {
  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=${API_KEY}&s=${SEARCH_TERM}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function ({ data }) {
      img.src = data.images.original.url;
    });
}
fetchData();

// -----------------------------------------------------

// To illustrate that it takes time to fetch data, if we don't wait, we get a promise
// const data = fetch(
//   `https://api.giphy.com/v1/gifs/translate?api_key=${API_KEY}&s=${SEARCH_TERM}`
// );

// console.log(data);

// -----------------------------------------------------

// Explain Async/Await
const fetchData = async () => {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=${API_KEY}&s=${SEARCH_TERM}`
  );
  const { data } = await response.json();
  img.src = data.images.original.url;
};

fetchData();