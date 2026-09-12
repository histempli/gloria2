document.addEventListener('DOMContentLoaded', () => {
    const guestRange = document.getElementById('guestRange');
    const guestCountDisplay = document.getElementById('guestCountDisplay');
    const eventSelect = document.getElementById('eventSelect');
    const decorSelect = document.getElementById('decorSelect');
    const serviceCheckboxes = document.querySelectorAll('.checkbox-grid input[type="checkbox"]');
    const totalPriceDisplay = document.getElementById('totalPriceDisplay');
    const transferToFormBtn = document.getElementById('transferToFormBtn');

    function formatCurrency(amount) {
        return '₺' + amount.toLocaleString('tr-TR');
    }

    function calculateBudget() {
        if (!guestRange || !eventSelect) return;

        // 1. Katılımcı Sayısı
        const guestCount = parseInt(guestRange.value, 10);
        guestCountDisplay.textContent = `${guestCount} Kişi`;

        // 2. Etkinlik Türü Baz Fiyatı (Hizmet & Koordinasyon Bedeli)
        const baseCost = parseInt(eventSelect.options[eventSelect.selectedIndex].getAttribute('data-base'), 10);

        // 3. Dekorasyon Çarpanı
        const decorMultiplier = parseFloat(decorSelect.options[decorSelect.selectedIndex].getAttribute('data-multiplier'));
        const decorCost = (guestCount * 250) * decorMultiplier; // Kişi başı baz dekorasyon maliyeti

        // 4. Ekstra Hizmetler (Kişi başı catering veya sabit bedeller)
        let extraCost = 0;
        serviceCheckboxes.forEach(cb => {
            if (cb.checked) {
                const cost = parseInt(cb.getAttribute('data-cost'), 10);
                if (cb.id === 'serviceCatering') {
                    extraCost += (cost * guestCount); // Catering kişi başı çarpılır
                } else {
                    extraCost += cost; // Medya ve Sanatçı sabit ücret
                }
            }
        });

        // Genel Toplam
        const grandTotal = baseCost + decorCost + extraCost;
        totalPriceDisplay.textContent = formatCurrency(Math.round(grandTotal));
    }

    // Event Listeners
    [guestRange, eventSelect, decorSelect, ...serviceCheckboxes].forEach(el => {
        if(el) el.addEventListener('input', calculateBudget);
        if(el) el.addEventListener('change', calculateBudget);
    });

    // Forma Aktarma
    if (transferToFormBtn) {
        transferToFormBtn.addEventListener('click', () => {
            const guestInput = document.getElementById('userNotes');
            const conceptSelect = document.getElementById('conceptChoice');
            
            if (conceptSelect) conceptSelect.value = eventSelect.value;
            
            if (guestInput) {
                guestInput.value = `Hesaplanan Tahmini Bütçe: ${totalPriceDisplay.textContent}\nKatılımcı Sayısı: ${guestRange.value} Kişi\nDekorasyon Seviyesi: ${decorSelect.options[decorSelect.selectedIndex].text}`;
            }

            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }

    calculateBudget();
});
