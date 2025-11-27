document.addEventListener('DOMContentLoaded', () => {
  // ----- УВЕЛИЧЕНИЕ ЛОГО -----
  const logo = document.querySelector('.site-logo');
  const logoLink = document.querySelector('.logo-link');

  if (logo && logoLink) {
    logoLink.addEventListener('click', (e) => {
      // не переходим на главную
      e.preventDefault();
      logo.classList.toggle('logo-zoom');
    });
  }

  // ----- LIGHTBOX ДЛЯ ГАЛЕРЕЙ -----
  const images = Array.from(document.querySelectorAll('.gallery img'));
  if (!images.length) return;

  let currentIndex = 0;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Schliessen">&times;</button>
    <button class="lightbox-arrow lightbox-prev" aria-label="Zurück">&#10094;</button>
    <img class="lightbox-img" src="" alt="" />
    <button class="lightbox-arrow lightbox-next" aria-label="Weiter">&#10095;</button>
  `;
  document.body.appendChild(lightbox);

  const imgEl = lightbox.querySelector('.lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  function showImage(index) {
    currentIndex = index;
    const img = images[currentIndex];
    imgEl.src = img.src;
    imgEl.alt = img.alt || '';
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add('is-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
  }

  function changeImage(delta) {
    const total = images.length;
    currentIndex = (currentIndex + delta + total) % total;
    showImage(currentIndex);
  }

  images.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
  });

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', () => changeImage(1));
  prevBtn.addEventListener('click', () => changeImage(-1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') changeImage(1);
    if (e.key === 'ArrowLeft') changeImage(-1);
  });

  let startX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  lightbox.addEventListener('touchend', (e) => {
    const diffX = e.changedTouches[0].clientX - startX;
    if (Math.abs(diffX) > 50) {
      if (diffX < 0) {
        changeImage(1);
      } else {
        changeImage(-1);
      }
    }
  });
});
