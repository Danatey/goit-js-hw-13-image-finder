import 'regenerator-runtime/runtime'
import './sass/main.scss';
import getAPI from './js/apiService.js'
import cardTemplates from './template/image-list.hbs'

const refs = {
  cardContainer: document.querySelector('.observer-container'),
  searchElem: document.querySelector('input'),
  loadMoreBtn: document.querySelector('.button-load'),
  showBtn: document.querySelector('.button-submit'),
}

let currPage = 1;
const searchValue = refs.searchElem.value;

function fetchAPI() {
  if (refs.searchElem.value !== localStorage.getItem('value')) {
    refs.cardContainer.innerHTML = '';
  };
  if (refs.searchElem.value < 1) {
    refs.loadMoreBtn.classList.add('is-hidden');
    return
  };
  localStorage.setItem('value', refs.searchElem.value);
  const thisAPI = getAPI(searchValue.trim(), currPage);
  thisAPI.then(image => addCards(image));
}

function addCards(image) {
  refs.cardContainer.insertAdjacentHTML('beforeend', cardTemplates(image.hits));
  if (image.total > 12) {
    refs.loadMoreBtn.classList.remove('is-hidden')
  }
} 

function loadMore() {
  ++currPage;
  fetchAPI();
  setTimeout(() => {seeBtn()}, 500);
}

function seeBtn() {
  refs.loadMoreBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
  
refs.showBtn.addEventListener('click', fetchAPI);
refs.loadMoreBtn.addEventListener('click', loadMore);