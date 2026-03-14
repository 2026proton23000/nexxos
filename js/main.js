// main.js
let servicesLoaded = false;
let realisationsLoaded = false;

async function loadHomeServices() {
    const container = document.getElementById('services-container');
    if (!container) return;
    const lang = window.i18n?.getCurrentLang ? window.i18n.getCurrentLang() : 'fr';
    try {
        const response = await fetch('data/services.json');
        const services = await response.json();
        container.innerHTML = '';
        services.forEach(service => {
            const titre = service[`titre_${lang}`] || service.titre_fr;
            const desc = service[`desc_${lang}`] || service.desc_fr;
            const card = document.createElement('div');
            card.className = 'challenge-card';
            card.innerHTML = `
                <div class="challenge-icon"><i class="${service.icone}"></i></div>
                <h3 class="challenge-title">${titre}</h3>
                <p class="challenge-desc">${desc}</p>
                <a href="services.html" class="challenge-link" data-i18n="expertise1_link">Explorer <i class="fas fa-arrow-right"></i></a>
            `;
            container.appendChild(card);
        });
        servicesLoaded = true;
    } catch (error) {
        console.error('Erreur chargement services:', error);
    }
}

async function loadHomeRealisations() {
    const container = document.getElementById('realisations-container');
    if (!container) return;
    const lang = window.i18n?.getCurrentLang ? window.i18n.getCurrentLang() : 'fr';
    try {
        const response = await fetch('data/realisations.json');
        const realisations = await response.json();
        container.innerHTML = '';
        realisations.forEach(real => {
            const categorie = real[`categorie_${lang}`] || real.categorie_fr;
            const titre = real[`titre_${lang}`] || real.titre_fr;
            const item = document.createElement('div');
            item.className = 'solution-item';
            item.innerHTML = `
                <div class="solution-image"><i class="${real.icone}"></i></div>
                <div class="solution-content">
                    <div class="solution-tag">${categorie}</div>
                    <div class="solution-title">${titre}</div>
                    <div style="color: rgba(255,255,255,0.6);">${real.lieu}</div>
                </div>
            `;
            container.appendChild(item);
        });
        realisationsLoaded = true;
    } catch (error) {
        console.error('Erreur chargement réalisations:', error);
    }
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
    // On attend que i18n soit prêt, mais i18n.js est chargé avant main.js
    // On peut juste lancer le chargement
    loadHomeServices();
    loadHomeRealisations();
});

// Recharger quand la langue change
document.addEventListener('languageChanged', () => {
    if (servicesLoaded) loadHomeServices();
    if (realisationsLoaded) loadHomeRealisations();
});