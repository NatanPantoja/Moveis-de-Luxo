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

    // Ocultar todas as galerias inicialmente
    document.querySelectorAll('.gallery').forEach(gallery => {
        gallery.style.display = "none";
    });

    // Configuração do Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todas as imagens e cards
    const elements = document.querySelectorAll('.gallery img, article img, .card');
    elements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // Configurar os botões da galeria
    document.querySelectorAll('.tab-link').forEach(button => {
        button.addEventListener('click', function (e) {
            // Efeito visual do botão
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

            // Lógica da galeria
            const galleryId = this.getAttribute('data-gallery');
            const articleImages = document.querySelector('article');

            if (this.classList.contains('active')) {
                // Se o botão já estiver ativo, desativa ele
                this.classList.remove('active');
                document.getElementById(galleryId).style.display = "none";
                articleImages.style.display = "flex"; // Mostra as imagens do article
            } else {
                // Remove active de todos os botões
                document.querySelectorAll('.tab-link').forEach(btn => {
                    btn.classList.remove('active');
                });

                // Esconde todas as galerias
                document.querySelectorAll('.gallery').forEach(gallery => {
                    gallery.style.display = "none";
                    gallery.classList.remove("active");
                });

                // Ativa o botão clicado e mostra sua galeria
                this.classList.add('active');
                document.getElementById(galleryId).style.display = "flex";
                document.getElementById(galleryId).classList.add("active");
                articleImages.style.display = "none"; // Esconde as imagens do article
            }
        });
    });
});

// Adicionar função para mostrar as imagens do article quando nenhuma galeria estiver ativa
function hideGalleryShowArticle() {
    var galleries = document.getElementsByClassName("gallery");
    var articleImages = document.querySelector('article');
    var anyGalleryVisible = false;

    for (var i = 0; i < galleries.length; i++) {
        if (galleries[i].style.display === "flex") {
            anyGalleryVisible = true;
            break;
        }
    }

    if (!anyGalleryVisible) {
        articleImages.style.display = "flex";
    }
}

