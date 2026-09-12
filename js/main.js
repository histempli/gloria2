document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Animations (Fade-up)
    const animateElements = document.querySelectorAll('.animate-up');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                scrollObserver.unobserve(entry.target); // Sadece bir kere animasyon oynasın
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => scrollObserver.observe(el));

    // 2. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    // 3. Mobil Menü
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.remove('open'));
        });
    }

    // 4. Portföy Filtreleme
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    // 5. FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // 6. İletişim Formu ve Toast
    const form = document.getElementById('weddingForm');
    const toast = document.getElementById('toastNotification');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('submitBtn');
            btn.innerHTML = 'Gönderiliyor...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = 'Talebi Gönder';
                btn.disabled = false;
                if(toast) {
                    toast.classList.add('show');
                    setTimeout(() => toast.classList.remove('show'), 4000);
                }
                form.reset();
            }, 1500);
        });
    }
});
