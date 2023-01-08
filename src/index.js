
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import PicturesAPI from './Axios';
import './css/styles.css';

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input');
const galleryImage = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const picturesAPI = new PicturesAPI();

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', loadMorePhoto);


let totalCount = 0;

function onFormSubmit(e) {
  e.preventDefault();
  totalCount = 0;

  galleryImage.innerHTML = '';
  picturesAPI.query = inputEl.value.trim();
  picturesAPI.resetPage();
  picturesAPI.hideLoadMoreBtn();

  if (picturesAPI.query === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );

    return;
  }

  fetchPhotosAndCreatePage();
}

function loadMorePhoto() {
  picturesAPI.query = inputEl.value.trim();
  picturesAPI.incrementPage();

  fetchPhotosAndCreatePage();
}

function createPhotoList(photos) {
  const photosArray = photos.hits;
  const totalHits = photos.totalHits;

  totalCount += photosArray.length;

  if (photosArray.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  if (totalHits !== 0 && totalCount >= totalHits) {
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }

  if (totalHits !== 0) {
    Notiflix.Notify.success(`We found ${photosArray.length} images.`);
  }

  if (totalCount < totalHits) {
    picturesAPI.showLoadMoreBtn();
  } else {
    picturesAPI.hideLoadMoreBtn();
  }

  createPhotosList(photosArray);
}


async function fetchPhotosAndCreatePage() {
  try {
    const photoList = await picturesAPI.fetchImages();
    createPhotoList(photoList);
  } catch (error) {
    console.log(error);
  }

}

function createPhotosList(photosArray) {
  const markupPhotoList = photosArray
    .map(photo => {
      return `
          <div class="photo-card">
          <a class="gallery__item" href="${photo.largeImageURL}">
           <img class="gallery__image" src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy"/>
          </a>
            <div class="info">
               <div class="info-item">
                 <p><b>Likes: </b></p> <p>${photo.likes}</p>
              </div>
              <div class="info-item">
                <p><b>Views: </b></p> <p>${photo.views}</p>
              </div>
              <div class="info-item">
                <p><b>Comments: </b></p> <p>${photo.comments}</p>
              </div>
              <div class="info-item">
                <p><b>Downloads: </b></p> <p>${photo.downloads}</p>
              </div>
           </div>
          </div>
          `;
    })
    .join('');

  galleryImage.insertAdjacentHTML('beforeend', markupPhotoList);
  let gallery = new SimpleLightbox('.gallery a');
  gallery.on('show.simplelightbox');
}

