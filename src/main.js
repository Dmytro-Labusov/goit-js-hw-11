import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.createElement('div');
loader.classList.add('loader');
document.body.appendChild(loader);

form.addEventListener('submit', async e => {
  e.preventDefault();

  const query = form.elements['search-text'].value.trim();
  if (query === '') {
    iziToast.error({
      title: '❌ Error',
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  loader.style.display = 'block';
  gallery.innerHTML = '';

  try {
    const images = await fetchImages(query);

    if (images.length === 0) {
      iziToast.error({
        title: '❌ No images found',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      renderGallery(images);
    }
  } catch (error) {
    iziToast.error({
      title: '❌ Error',
      message: 'Something went wrong while fetching images!',
      position: 'topRight',
    });
    console.error('Error fetching images:', error);
  } finally {
    loader.style.display = 'none';
  }
});
