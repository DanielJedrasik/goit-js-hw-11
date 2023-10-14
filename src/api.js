// my api key 39999567-6a63dde8da73c54260ff5c1f8
import axios from 'axios';
import Notiflix from 'notiflix';
const apiKey = '39999567-6a63dde8da73c54260ff5c1f8';

async function fetchImages(query, page, btnLoadMore, perPage) {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    const { data } = response;
    if (data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching ypur search query. Please try again.'
      );
      btnLoadMore.style.display = 'none';
      return null;
    }

    return data;
  } catch (error) {
    Notiflix.Notify.failure('Oops! Something went wrong. Please try again.');
    return null;
  }
}

export { fetchImages };
