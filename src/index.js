const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const apiKey = 'u_q1s8se4pv1';

let searchQuery = '';
let page = 1;

searchForm.addEventListener('submit', handleFormSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);

async function handleFormSubmit(event) {
  event.preventDefault();
  page = 1;
  searchQuery = searchForm.elements.searchQuery.value;
  clearGallery();
  await searchImages();
  showLoadMoreButton();
}

async function loadMoreImages() {
  page++;
  await searchImages();
}

function clearGallery() {
  gallery.innerHTML = '';
}

function showLoadMoreButton() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
}

async function searchImages() {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.hits.length === 0) {
      notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      hideLoadMoreButton();
      return;
    }

    data.hits.forEach(image => {
      const photoCard = createPhotoCard(image);
      gallery.appendChild(photoCard);
    });

    if (data.totalHits <= page * 40) {
      hideLoadMoreButton();
      notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.error('Error:', error);
    notiflix.Notify.failure('An error occurred. Please try again later.');
    hideLoadMoreButton();
  }
}

function createPhotoCard(image) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = image;

  const photoCard = document.createElement('div');
  photoCard.classList.add('photo-card');

  const imageElement = document.createElement('img');
  imageElement.src = webformatURL;
  imageElement.alt = tags;
  imageElement.loading = 'lazy';

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('info');

  const likesParagraph = createInfoParagraph('Likes', likes);
  const viewsParagraph = createInfoParagraph('Views', views);
  const commentsParagraph = createInfoParagraph('Comments', comments);
  const downloadsParagraph = createInfoParagraph('Downloads', downloads);

  infoDiv.append(
    likesParagraph,
    viewsParagraph,
    commentsParagraph,
    downloadsParagraph
  );
  photoCard.append(imageElement, infoDiv);

  return photoCard;
}

function createInfoParagraph(label, value) {
  const paragraph = document.createElement('p');
  paragraph.classList.add('info-item');
  const boldText = document.createElement('b');
  boldText.textContent = label;
  paragraph.append(boldText, `: ${value}`);
  return paragraph;
}
