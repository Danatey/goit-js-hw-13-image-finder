export default function getEl() {
  return {
    searchForm: document.getElementById('search-form'),
    gallery: document.querySelector('.gallery-js'),
    loader: document.querySelector('.loader'),
  };
}