// Navbar auto-hide on scroll
document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  let lastScrollTop = 0;
  window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 80) {
      navbar.style.top = '-80px';
    } else {
      navbar.style.top = '0';
    }
    lastScrollTop = scrollTop;
  });

  // Fade-up on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Immediately reveal first visible section
  const first = document.querySelector('.fade-up');
  if (first) first.classList.add('visible');
});
