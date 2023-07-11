import axios from 'axios';
const apiKey = '38122384-f449367556dc0438355b2be02';

export async function searchImages(searchQuery, page) {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.hits.length === 0) {
      return {
        error:
          'Sorry, there are no images matching your search query. Please try again.',
      };
    }

    return { data };
  } catch (error) {
    console.error('Error:', error);
    return { error: 'An error occurred. Please try again later.' };
  }
}
