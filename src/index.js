import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

import { fetchImages } from './api';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

let page = 1;
let searchTerm = '';

btnLoadMore.style.display = 'none';

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  gallery.innerHTML = '';
  page = 1;
  searchTerm = event.target.elements.searchQuery.value;
  loadImages(searchTerm, page, btnLoadMore);
});

async function loadImages(query, page, btnLoadMore) {
  const perPage = 40;
  const data = await fetchImages(query, page, btnLoadMore, perPage);
  if (data === null) {
    return;
  }
  const images = data.hits.map(
    image => `                                           
        <a href = "${image.largeImageURL}" class="card" target="_blank" >
        <img class="card__photo" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        <div class="description">
            <p class="description-item"><b>Likes</b> ${image.likes}
            </p>
            <p class="description-item"><b>Views</b> ${image.views}
            </p>
            <p class="description-item"><b>Comments</b> ${image.comments}
            </p>
            <p class="description-item"><b>Downloads</b> ${image.downloads}
            </p>
        </div>
        </a>
        `
  );
  gallery.insertAdjacentHTML('beforeend', images.join(''));

  if (data.totalHits <= page * perPage) {
    btnLoadMore.style.display = 'none';
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  } else {
    btnLoadMore.style.display = 'block';
  }
}

btnLoadMore.addEventListener('click', () => {
  page++;
  loadImages(searchQuestion, page, btnLoadMore);
});
