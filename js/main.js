/**
 * ==========================================================
 * Lumine | Kır Bahçesi - Ana Etkileşim ve Fonksiyonlar
 * ==========================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------
    // 1. SABİT HEADER & SCROLL EFEKTİ
    // ----------------------------------------------------------
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ----------------------------------------------------------
    // 2. MOBİL MENÜ TOGGLE & TIKLAMA İLE KAPANMA
    // ----------------------------------------------------------
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            // Menü açıkken sayfa kaydırmayı engelleme/serbest bırakma
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ----------------------------------------------------------
    // 3. PORTFÖY / GALERİ FİLTRELEME SİSTEMİ
    // ----------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Aktif buton stilini değiştir
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ----------------------------------------------------------
    // 4. RESİM BÜYÜTME (LIGHTBOX MODAL)
    // ----------------------------------------------------------
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const galleryThumbs = document.querySelectorAll('.gallery-thumb');

    galleryThumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const img = thumb.querySelector('img');
            const title = thumb.querySelector('.gallery-title');

            if (img && lightboxModal && lightboxImg) {
                lightboxImg.src = img.src;
                lightboxCaption.textContent = title ? title.textContent : img.alt;
                lightboxModal.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightbox() {
        if (lightboxModal) {
            lightboxModal.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }

    // ESC tuşu ile lightbox kapatma
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('open')) {
            closeLightbox();
        }
    });

    // ----------------------------------------------------------
    // 5. SIKÇA SORULAN SORULAR (ACCORDION)
    // ----------------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Diğer tüm maddeleri kapat
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Tıklanan kapalıysa aç
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------------
    // 6. TEKLİF VE RANDEVU FORMU DOĞRULAMA (VALIDATION) & TOAST
    // ----------------------------------------------------------
    const weddingForm = document.getElementById('weddingForm');
    const toastNotification = document.getElementById('toastNotification');

    function showToast(title, message) {
        if (!toastNotification) return;
        
        const toastTitle = document.getElementById('toastTitle');
        const toastMsg = document.getElementById('toastMessage');

        if (toastTitle) toastTitle.textContent = title;
        if (toastMsg) toastMsg.textContent = message;

        toastNotification.classList.add('show');

        setTimeout(() => {
            toastNotification.classList.remove('show');
        }, 5000);
    }

    if (weddingForm) {
        weddingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            const nameInput = document.getElementById('fullName');
            const phoneInput = document.getElementById('phone');
            const emailInput = document.getElementById('email');

            // İsim Kontrolü
            if (!nameInput.value.trim()) {
                nameInput.parentElement.classList.add('has-error');
                isValid = false;
            } else {
                nameInput.parentElement.classList.remove('has-error');
            }

            // Telefon Kontrolü (En az 10 karakter)
            if (phoneInput.value.trim().length < 10) {
                phoneInput.parentElement.classList.add('has-error');
                isValid = false;
            } else {
                phoneInput.parentElement.classList.remove('has-error');
            }

            // E-posta Kontrolü
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                emailInput.parentElement.classList.add('has-error');
                isValid = false;
            } else {
                emailInput.parentElement.classList.remove('has-error');
            }

            if (isValid) {
                const submitBtn = document.getElementById('submitBtn');
                const originalText = submitBtn.innerHTML;

                // Buton yükleniyor animasyonu
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Gönderiliyor...';

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;

                    showToast(
                        'Talebiniz Alındı!',
                        `Teşekkürler Sayın ${nameInput.value.trim()}, düğün koordinatörümüz en kısa sürede sizinle iletişime geçecektir.`
                    );

                    weddingForm.reset();
                }, 1200);
            }
        });

        // Inputlara yazarken hata uyarısını kaldırma
        weddingForm.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                input.parentElement.classList.remove('has-error');
            });
        });
    }

    // ----------------------------------------------------------
    // 7. BÜLTEN ABONELİĞİ FORMU
    // ----------------------------------------------------------
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input');
            if (emailInput && emailInput.value) {
                showToast('Abonelik Başarılı!', 'E-bültenimize kaydoldunuz, yeni fırsatları kaçırmayacaksınız.');
                newsletterForm.reset();
            }
        });
    }
});
