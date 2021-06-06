const BASE_URL = 'https://pixabay.com/api';
const KEY = '21923762-625ed23d6fd96f8b8b3fcd755';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw response;
    }

    return response
      .json()
      .then(({ hit }) => {
        this.incrementPage();

        return hit;
      })
      .catch(err => {
        console.warn(err);
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}