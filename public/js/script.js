// Bootstrap form validation
(() => {
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();

// Nav scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.05 });
  reveals.forEach(r => observer.observe(r));
}

// Search date defaults — only runs if date inputs exist
const dateInputs = document.querySelectorAll('input[type=date]');
if (dateInputs.length >= 2) {
  const today = new Date();
  const fmt = d => d.toISOString().split('T')[0];
  const cin = new Date(today);
  const cout = new Date(today);
  cout.setDate(today.getDate() + 3);
  dateInputs[0].value = fmt(cin);
  dateInputs[1].value = fmt(cout);
}
