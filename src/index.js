//Import CSS
import './sass/main.scss';
//Import JS
import ImagesApiService from './js/add-card';
import getEl from './js/elements';
import setLightbox from './js/lightbox';
//Import Templates
import cardTemplate from './template/image-list';

const elements = getEl();

const observer = new IntersectionObserver(intersectionHandler);

const imagesApiService = new ImagesApiService();
elements.searchForm.addEventListener('submit', onSearch);
elements.gallery.addEventListener('click', setLightbox);

function onSearch(event) {
  event.preventDefault();

  clearGallery();
  elements.loader.classList.remove('hide-loader');

  const inputValue = event.currentTarget.elements.query.value;

  const str = new RegExp('[a-zA-Z]');

  if (!str.test(inputValue) || inputValue === '') {
    hideLoader();
    return onError();
  }

  imagesApiService.query = inputValue;

  imagesApiService.resetPage();

  imagesApiService.fetchImages().then(renderImgs).catch(onFetchError);
}

function renderImgs(images) {
  if (images.length === 0) {
    hideLoader();
    return onError();
  }

  const markup = cardTemplate(images);
  elements.gallery.insertAdjacentHTML('beforeend', markup);
  observer.observe(elements.observerItem);
}

function clearGallery() {
  elements.gallery.innerHTML = '';

  observer.unobserve(elements.observerItem);
}

function renderMore() {
  imagesApiService
    .fetchImages()
    .then(renderImgs)
    .then(hideLoader)
    .catch(onFetchError);
}

function intersectionHandler(entries) {
  const { isIntersecting } = entries[0];
  if (isIntersecting) {
    renderMore();
  }
}

function hideLoader() {
  refs.loader.classList.add('hide-loader');
}