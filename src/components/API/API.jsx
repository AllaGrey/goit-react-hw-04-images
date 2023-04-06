import axios from 'axios';

const BASE_URL = `https://pixabay.com/api/?&image_type=photo&orientation=horizontal&per_page=12`;
const API_KEY = `key=33677116-85723a5144d957b1da7c90df9`;

export const getImages = async (searchQuery, page) => {
  const URL = `${BASE_URL}&${API_KEY}&q=${searchQuery}&page=${page}`;
  const resp = await axios.get(URL);
  const data = resp.data.hits;
  const total = Math.ceil(resp.data.totalHits / 12);
  const respObj = { data, total };
  return respObj;
};
