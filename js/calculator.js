/**
 * ==========================================================
 * Kagan Studio | Kır Düğünü Bütçe Hesaplayıcı
 * ==========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Girdi Elemanlarının Seçimi
    const guestRange = document.getElementById('guestRange');
    const guestCountDisplay = document.getElementById('guestCountDisplay');
    const eventRadios = document.querySelectorAll('input[name="eventType"]');
    const menuSelect = document.getElementById('menuSelect');
    const serviceCheckboxes = document.querySelectorAll('.checkbox-grid input[type="checkbox"]');

    // 2. Çıktı / Özet Elemanlarının Seçimi
    const totalPriceDisplay = document.getElementById('totalPriceDisplay');
    const summaryMenuCost = document.getElementById('summaryMenuCost');
    const summaryVenueCost = document.getElementById('summaryVenueCost');
    const summaryExtraCost = document.getElementById('summaryExtraCost');
    const transferToFormBtn = document.getElementById('transferToFormBtn');

    // Kır Bahçesi Baz Tahsis Bedeli (₺)
    const venueBaseCost = 20000;

    // Para Formatlayıcı (Örn: 145000 -> ₺145.000)
    function formatCurrency(amount) {
        return '₺' + amount.toLocaleString('tr-TR');
    }

    // Ana Hesaplama Fonksiyonu
    function calculateBudget() {
        if (!guestRange || !menuSelect) return;

        // A. Davetli Sayısı (Maksimum 1.000 Kişi)
        const guestCount = parseInt(guestRange.value, 10);
        guestCountDisplay.textContent = `${guestCount} Kişi`;

        // B. Menü Maliyeti: Sadece 2 Seçenek (Kuru Pasta veya Yemekli)
        const selectedMenuOption = menuSelect.options[menuSelect.selectedIndex];
        const menuPricePerPerson = parseInt(selectedMenuOption.getAttribute('data-price'), 10) || 250;
        const totalMenuCost = guestCount * menuPricePerPerson;

        // C. Kır Bahçesi Tahsis Bedeli
        const totalVenueCost = venueBaseCost;

        // D. İsteğe Bağlı Ekstra Hizmetler
        let totalExtraCost = 0;
        serviceCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const cost = parseInt(checkbox.getAttribute('data-cost'), 10) || 0;
                totalExtraCost += cost;
            }
        });

        // E. Genel Toplam
        const grandTotal = totalMenuCost + totalVenueCost + totalExtraCost;

        // F. Ekrana Yazdır
        totalPriceDisplay.textContent = formatCurrency(grandTotal);
        summaryMenuCost.textContent = formatCurrency(totalMenuCost);
        summaryVenueCost.textContent = formatCurrency(totalVenueCost);
        summaryExtraCost.textContent = formatCurrency(totalExtraCost);
    }

    // Dinleyici (Event Listener) Atamaları
    if (guestRange) {
        guestRange.addEventListener('input', calculateBudget);
    }

    if (menuSelect) {
        menuSelect.addEventListener('change', calculateBudget);
    }

    eventRadios.forEach(radio => {
        radio.addEventListener('change', calculateBudget);
    });

    serviceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateBudget);
    });

    // "Bu Bütçe İle Teklif Al" butonuna basıldığında değerleri iletişim formuna aktarma
    if (transferToFormBtn) {
        transferToFormBtn.addEventListener('click', () => {
            const guestCount = guestRange.value;
            let selectedEvent = 'dugun';
            eventRadios.forEach(r => { if (r.checked) selectedEvent = r.value; });

            const selectedMenuText = menuSelect.options[menuSelect.selectedIndex].text;

            // Formdaki alanları bul
            const guestInput = document.getElementById('guestEstimate');
            const conceptSelect = document.getElementById('conceptChoice');
            const notesTextarea = document.getElementById('userNotes');

            if (guestInput) guestInput.value = guestCount;
            if (conceptSelect) conceptSelect.value = selectedEvent;

            // Seçilen ekstraları listele
            const selectedExtras = [];
            serviceCheckboxes.forEach(cb => {
                if (cb.checked) {
                    selectedExtras.push(cb.parentElement.textContent.trim());
                }
            });

            if (notesTextarea) {
                notesTextarea.value = `Hesaplanan Bütçe: ${totalPriceDisplay.textContent}\nDavetli Sayısı: ${guestCount} Kişi\nMenü Tercihi: ${selectedMenuText}\nEkstra Talepler: ${selectedExtras.length > 0 ? selectedExtras.join(', ') : 'Standart'}`;
            }

            // İletişim bölümüne pürüzsüz kaydır
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // İlk yüklemede çalıştır
    calculateBudget();
});
