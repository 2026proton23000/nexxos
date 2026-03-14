// Gestion de l'internationalisation
let currentLang = 'fr';
let translations = {};

// Charger les traductions (fichiers de langue pour les textes statiques)
async function loadTranslations(lang) {
    const response = await fetch(`lang/${lang}.json`);
    translations = await response.json();
    applyTranslations();
}

// Appliquer les traductions aux éléments avec data-i18n
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
            el.textContent = translations[key];
        }
    });
}

// Fonction pour changer de langue
async function setLanguage(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    await loadTranslations(lang);
    localStorage.setItem('preferredLang', lang);
    // Déclencher un événement personnalisé pour informer les autres modules
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

// Initialisation
document.addEventListener('DOMContentLoaded', async () => {
    const savedLang = localStorage.getItem('preferredLang');
    let initialLang = 'fr';
    if (savedLang && ['fr','es','en'].includes(savedLang)) {
        initialLang = savedLang;
    } else {
        const browserLang = navigator.language.split('-')[0];
        if (browserLang === 'es') initialLang = 'es';
        else if (browserLang === 'en') initialLang = 'en';
        else initialLang = 'fr';
    }
    await loadTranslations(initialLang);
    currentLang = initialLang;

    // Gestionnaire pour les drapeaux
    document.querySelectorAll('.lang-switch img, .lang-switch button').forEach(el => {
        el.addEventListener('click', (e) => {
            const lang = e.target.getAttribute('data-lang');
            if (lang) setLanguage(lang);
        });
    });
});

// Exporter pour les autres modules
window.i18n = {
    getCurrentLang: () => currentLang,
    translate: (key) => translations[key] || key,
    setLanguage
};