export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export function renderPhotoCard(image) {
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

  const imageLink = document.createElement('a');
  imageLink.href = largeImageURL;

  const imageElement = document.createElement('img');
  imageElement.src = webformatURL;
  imageElement.alt = tags;
  imageElement.loading = 'lazy';

  imageLink.appendChild(imageElement);

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
  photoCard.append(imageLink, infoDiv);

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
