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

function fetchAPI () {
    const searchValue = refs.searchElem.value.trim();
    const thisAPI = getAPI(searchValue, currPage);
  thisAPI.then(image => addCards(image));
}

function addCards(image) {
  refs.cardContainer.insertAdjacentHTML('beforeend', cardTemplates(image.hits));
  
  if (image.total > 12) {
    refs.loadMoreBtn.classList.remove('is-hidden')
  }
} 

async function loadMore() {
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

refs.showBtn.addEventListener('click', fetchAPI)
refs.loadMoreBtn.addEventListener('click', loadMore)