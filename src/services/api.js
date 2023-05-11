import axios from 'axios';
const API_KEY = '36114618-4ab1640e640d5e2e224b92420';

const fetchImages = async (searchText, page) => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchText,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page,
  });
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?${searchParams}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchImages;
