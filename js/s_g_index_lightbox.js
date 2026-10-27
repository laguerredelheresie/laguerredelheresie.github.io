(() => {
  const viewer = document.getElementById('map-lightbox');
  const image = viewer.querySelector('.map-lightbox__image');
  const closeButton = viewer.querySelector('.map-lightbox__close');
  let previousFocus = null;
  function close() {
    viewer.hidden = true;
    image.removeAttribute('src');
    document.body.classList.remove('map-lightbox-open');
    if (previousFocus) previousFocus.focus();
  }
  document.querySelectorAll('.map-lightbox-trigger').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      previousFocus = link;
      image.src = link.dataset.mapFull;
      image.alt = link.querySelector('img')?.alt || 'Carte agrandie';
      viewer.hidden = false;
      document.body.classList.add('map-lightbox-open');
      closeButton.focus();
    });
  });
  closeButton.addEventListener('click', close);
  viewer.addEventListener('click', event => { if (event.target === viewer) close(); });
  document.addEventListener('keydown', event => {
    if (viewer.hidden) return;
    if (event.key === 'Escape') close();
    if (event.key === 'Tab') { event.preventDefault(); closeButton.focus(); }
  });
})();
