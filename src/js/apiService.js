const BASE_URL = 'https://pixabay.com/api';
const KEY = '21923762-625ed23d6fd96f8b8b3fcd755';

const getAPI = async (search, currPage) => {
  const pictures = await fetch(`${BASE_URL}/?key=${KEY}&image_type=photo&orientation=horizontal&q=${search}&page=${currPage}&per_page=12`);
    return pictures.json();
};

export default getAPI;