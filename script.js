// Parallax 3D على حركة الماوس
document.addEventListener('mousemove', (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 30;
  const y = (window.innerHeight / 2 - e.clientY) / 30;

  document.querySelectorAll('.player-circle, .news-card, .hero-text').forEach(el => {
    const depth = el.getAttribute('data-depth') || 0.2;
    el.style.transform = `translateX(${x * depth}px) translateY(${y * depth}px) rotateY(${x * depth * 5}deg) rotateX(${y * depth * 5}deg)`;
  });
});

// Carousel تلقائي
const carousels = document.querySelectorAll('.carousel');
carousels.forEach(carousel => {
  let scrollAmount = 0;
  setInterval(() => {
    scrollAmount += 2;
    if(scrollAmount >= carousel.scrollWidth - carousel.clientWidth){
      scrollAmount = 0;
    }
    carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  }, 50);
});
