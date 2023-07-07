import { searchImages } from '/src/api.js';
import { clearGallery, renderPhotoCard } from '/src/renderes.js';

import notiflix from 'notiflix';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let searchQuery = '';
let page = 1;

searchForm.addEventListener('submit', handleFormSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);

async function handleFormSubmit(event) {
  event.preventDefault();
  const searchInput = searchForm.elements.searchQuery;
  searchQuery = searchInput.value.trim();

  if (searchQuery === '') {
    notiflix.Notify.failure('Please enter a search query.');
    return;
  }

  page = 1;
  clearGallery();
  await performImageSearch();
  showLoadMoreButton();
}

async function loadMoreImages() {
  page++;
  await performImageSearch();
}

async function performImageSearch() {
  const { data, error } = await searchImages(searchQuery, page);

  if (error) {
    notiflix.Notify.failure(error);
    hideLoadMoreButton();
    return;
  }

  data.hits.forEach(image => {
    const photoCard = renderPhotoCard(image);
    gallery.appendChild(photoCard);
  });

  if (data.totalHits <= page * 40) {
    hideLoadMoreButton();
    notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function showLoadMoreButton() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
}
