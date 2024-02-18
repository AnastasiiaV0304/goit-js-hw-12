import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import 'simplelightbox/dist/simple-lightbox.min.css';

import { searchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const container = document.querySelector('div');
const searchInput = document.querySelector('input');
const loadBtn = document.querySelector('.btn-load');

const showLoader = () => {
  const loader = document.createElement('span');
  loader.classList.add('loader');
  container.append(loader);
};

const hideLoader = () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.remove();
  }
};

const showButton = () => {
  loadBtn.style.display = 'block';
};

const hideButton = () => {
  loadBtn.style.display = 'none';
};

let page = 1;
let per_page = 15;
let query;
let totalHits;
let lightbox;

form.addEventListener('submit', async event => {
  page = 1;
  showLoader();
  gallery.innerHTML = ' ';
  event.preventDefault();
  try {
    query = searchInput.value;
    const setOfImg = await searchImages(query, page, per_page);
    renderImages(setOfImg, gallery, lightbox);
    form.reset();
    hideLoader();
    showButton();
    if (setOfImg.hits.length < 15) {
      hideButton();
    }
    if (setOfImg.hits.length === 0) {
      hideButton();
      iziToast.error({
        message:
          'Sorry, there are no images matching <br>your search query. Please try again!</br>',
        position: 'topRight',
      });
    }
  } catch (error) {
    console.log(error);
    iziToast.error({
      title: 'Error',
    });
  }
});

loadBtn.addEventListener('click', async () => {
  showLoader();

  try {
    page += 1;
    const photos = await searchImages(query, page, per_page);
    totalHits = photos.totalHits;
    renderImages(photos, gallery, lightbox);
    hideLoader();

    const { height: imgHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: imgHeight * 2,
      behavior: 'smooth',
    });
    if (gallery.children.length >= totalHits || photos.hits.length < per_page) {
      iziToast.warning({
        message:
          'We are sorry, but you have reached the end of search results.',
        position: 'bottomCenter',
      });
      hideButton();
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
    });
    hideLoader();
  }
});
