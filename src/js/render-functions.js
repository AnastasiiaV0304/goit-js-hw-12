import SimpleLightbox from 'simplelightbox';

export function renderImages(data, gallery, lightbox) {
  const markup = data.hits
    .map(data => {
      return `
            <li class="gallery-item"><a href="${data.largeImageURL}">
          <img class="gallery-image" src="${data.webformatURL}" alt="${data.tags}"></a>
          <p><b>Likes: </b>${data.likes}</p>
          <p><b>Views: </b>${data.views}</p>
          <p><b>Comments: </b>${data.comments}</p>
          <p><b>Downloads: </b>${data.downloads}</p>
          </li>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (lightbox) {
    lightbox.destroy();
  }

  lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    fadeSpeed: 150,
    captionSelector: 'img',
    captionDelay: 250,
  });

  lightbox.on('show.simplelightbox').refresh();
}
