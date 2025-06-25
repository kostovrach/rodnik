(function () {
  const section = document.querySelector('.not-found');
  const overlay = section?.querySelector('.flashlight-overlay');
  const spot = section?.querySelector('.flashlight-spot');

  if (!section || !overlay || !spot) return;

  const isDesktop = () => window.innerWidth > 768;

  function onMouseMove(e) {
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    spot.style.left = `${x}px`;
    spot.style.top = `${y}px`;
  }

  function enableFlashlight() {
    section.classList.add('has-flashlight');
    section.addEventListener('mousemove', onMouseMove);
  }

  function disableFlashlight() {
    section.classList.remove('has-flashlight');
    section.removeEventListener('mousemove', onMouseMove);
  }

  function checkScreen() {
    if (isDesktop()) {
      enableFlashlight();
    } else {
      disableFlashlight();
    }
  }

  window.addEventListener('resize', checkScreen);
  checkScreen();
})();
