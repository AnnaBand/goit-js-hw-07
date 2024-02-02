import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');

const createGalleryItem = (item) => {
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

const galleryTemp = document.createDocumentFragment();

galleryItems.map(item => galleryTemp.appendChild(createGalleryItem(item)));

galleryContainer.appendChild(galleryTemp);

// Clicks on images
galleryContainer.addEventListener("click", showImage);

const instance = basicLightbox.create(`<img src="">`, {
    onShow: () => {
      document.addEventListener("keydown", pressKey);
    },
    onClose: () => {
      document.removeEventListener("keydown", pressKey);
    },
  }
);

function pressKey(event) {
  if (event.key === "Escape") {
    instance.close();
  }
}

function showImage(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
    
  instance.element().querySelector("IMG").src = event.target.dataset.source;
  instance.show();
}