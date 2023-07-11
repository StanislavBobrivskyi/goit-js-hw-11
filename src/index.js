import { searchImages } from '/src/api.js';
import { clearGallery, renderPhotoCard } from '/src/renderes.js';

import notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');

let searchQuery = '';
let page = 1;
let lightbox;

searchForm.addEventListener('submit', handleFormSubmit);

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
  createLightbox();
}

async function performImageSearch() {
  const { data, error } = await searchImages(searchQuery, page);

  if (error) {
    notiflix.Notify.failure(error);
    return;
  }

  data.hits.forEach(image => {
    const photoCard = renderPhotoCard(image);
    gallery.appendChild(photoCard);
  });

  if (data.totalHits <= page * 40) {
    notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    return;
  }

  page++;
  await performImageSearch();
}

function createLightbox() {
  if (lightbox) {
    lightbox.refresh();
    return;
  }

  lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
}

window.addEventListener('scroll', handleScroll);

function handleScroll() {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 200) {
    window.removeEventListener('scroll', handleScroll);
    performImageSearch().then(() => {
      window.addEventListener('scroll', handleScroll);
    });
  }
}
