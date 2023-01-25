import axios from 'axios';

export const ApiService = async (query, page) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '31530619-c8ff0ea55f4ca3c44478c1e7e';
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    page,
    per_page: 12,
  });
  const url = `${BASE_URL}?${searchParams}`;
  const response = await axios.get(url);

  return response.data;
};
