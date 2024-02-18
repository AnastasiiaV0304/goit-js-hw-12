import axios from 'axios';

export async function searchImages(query, page, per_page) {
  try {
    const params = new URLSearchParams({
      key: '42271684-72e9093d4988315267462c0c1',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: per_page,
    });
    const response = await axios.get(`https://pixabay.com/api/?${params}`);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
