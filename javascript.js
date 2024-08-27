document.addEventListener('DOMContentLoaded', function () {
  var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  var navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
          var bsCollapse = new bootstrap.Collapse(navbarCollapse, {
              toggle: false
          });
          bsCollapse.hide();
      });
  });
});

document.querySelectorAll('.tab-link').forEach(button => {
    button.addEventListener('click', function(e) {
        console.log('Botão clicado:', this.textContent); 
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        let rect = this.getBoundingClientRect();
        let size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

function showGallery(event, galleryName) {
  var i, tabcontent, tablinks;

  
  tabcontent = document.getElementsByClassName("gallery");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      tabcontent[i].classList.remove("active");
  }

  tablinks = document.getElementsByClassName("tab-link");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
  }

  document.getElementById(galleryName).style.display = "flex";
  document.getElementById(galleryName).classList.add("active");
  event.currentTarget.classList.add("active");
}

