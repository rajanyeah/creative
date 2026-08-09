document.addEventListener('DOMContentLoaded', () => {
  const slideshows = document.querySelectorAll('.work-slideshow');

  slideshows.forEach((container) => {
    const slides = container.querySelectorAll('.slide');
    const dotsWrap = container.querySelector('.dots');
    const prevBtn = container.querySelector('.arrow.prev');
    const nextBtn = container.querySelector('.arrow.next');

    if (!slides.length || !prevBtn || !nextBtn || !dotsWrap) {
      console.warn('Slideshow missing required elements:', container);
      return;
    }

    let current = 0;
    let timer;

    // build dots fresh each time (avoids duplicates on re-run)
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap.querySelectorAll('.dot');

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
      resetTimer();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(next, 5000);
    }

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    resetTimer();
  });

  // Scroll-triggered fade-in for each work block
 const revealBlocks = document.querySelectorAll('.work-block, .work-block-single');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.15 });

  revealBlocks.forEach(block => observer.observe(block));
});