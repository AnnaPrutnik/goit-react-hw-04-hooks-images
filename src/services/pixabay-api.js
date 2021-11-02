import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY_API = '23114500-22e254b478d4c1f3e17503cc3';
const PER_PAGE = 12;

export default function searchPictures(searchQuery, searchPage) {
  axios.defaults.baseURL = BASE_URL;
  return axios
    .get(
      `?q=${searchQuery}&page=${searchPage}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`,
    )
    .then(result => result.data.hits);
}
