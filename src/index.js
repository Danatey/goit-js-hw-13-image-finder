import 'regenerator-runtime/runtime'
import './sass/main.scss';
import query from './js/apiService.js'
import cardTemplates from './template/image-list.hbs'

const refs = {
  cardContainer: document.querySelector('.container')
}
const searchElem = document.querySelector('input');
const loadMoreBtn = document.querySelector('.button-load');

function fetchQuery () {
    const search = searchElem.value.trim();
    const promise = query(search);
    const q = promise.then(picture => draw(picture))
}

let markup;

function draw(picture) {
  markup = cardTemplates(picture.hits);
  refs.cardContainer.insertAdjacentHTML('beforeend', markup);
  
  if (picture.total > 12) {
    loadMoreBtn.classList.remove('hidden')
  }
} 

const showBtn = document.querySelector('.button-submit')
showBtn.addEventListener('click', fetchQuery)


// refs.cardContainer.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });