// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

// Navbar toggler
document.addEventListener("DOMContentLoaded", function () {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector("#navbarNavAltMarkup");
  const icon = navbarToggler.querySelector("i");

  navbarToggler.addEventListener("click", function () {
    if (navbarCollapse.classList.contains("show")) {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    } else {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    }
  });
});




  // Nav scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.05 });
  reveals.forEach(r => observer.observe(r));

  // Search date defaults
  const today = new Date();
  const fmt = d => d.toISOString().split('T')[0];
  const cin = today; cin.setDate(today.getDate());
  const cout = new Date(today); cout.setDate(today.getDate() + 3);
  document.querySelectorAll('input[type=date]')[0].value = fmt(cin);
  document.querySelectorAll('input[type=date]')[1].value = fmt(cout);
