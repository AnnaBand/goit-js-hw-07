import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
let currentInstance = null;

function createGalleryItem(item) {
  const galleryItem = document.createElement('div');
  galleryItem.classList.add('gallery__item');

  const galleryLink = document.createElement('a');
  galleryLink.classList.add('gallery__link');
  galleryLink.href = item.original;

  const galleryImage = document.createElement('img');
  galleryImage.classList.add('gallery__image');
  galleryImage.src = item.preview;
  galleryImage.alt = item.description;
  galleryImage.setAttribute('data-source', item.original);

  galleryLink.appendChild(galleryImage);
  galleryItem.appendChild(galleryLink);

  return galleryItem;
}

galleryItems.forEach((item) => {
  const galleryItem = createGalleryItem(item);
  galleryContainer.appendChild(galleryItem);
});

// Clicks on images
galleryContainer.addEventListener('click', (event) => {
  event.preventDefault();

  const target = event.target;
  if (target.nodeName === 'IMG') {
      const largeImageUrl = target.dataset.source;
      
      console.log('Clicked on image!', largeImageUrl);

    // Checking if a modal window is currently open
    if (currentInstance) {
      // If yes, close it
      currentInstance.close();
    }

    // Opening a new modal window by using basicLightbox
    const instance = basicLightbox.create(`<img src="${largeImageUrl}" alt="Image description">`);
    instance.show();

    currentInstance = instance;
  }
});

// Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && currentInstance) {
      
    currentInstance.close();
  }
});