function loadHeader() {
    const headerHTML = `
        <header class="site-header">
            <div class="container header-inner">
                <div class="logo">
                    <a href="index.html">
                        <img src="assets/images/logo.jpeg" alt="NEXXOS">
                    </a>
                </div>
                <nav class="main-nav">
                    <ul>
                        <li><a href="index.html" data-i18n="menu_accueil">Accueil</a></li>
                        <li><a href="services.html" data-i18n="menu_services">Services</a></li>
                        <li><a href="about.html" data-i18n="menu_nosotros">Société</a></li>
                        <li><a href="realisations.html" data-i18n="menu_realisations">Réalisations</a></li>
                        <li><a href="contact.html" data-i18n="menu_contact">Contact</a></li>
                    </ul>
                    <div class="lang-switch">
                        <img src="assets/icons/fr.svg" alt="FR" data-lang="fr">
                        <img src="assets/icons/es.svg" alt="ES" data-lang="es">
                        <img src="assets/icons/en.svg" alt="EN" data-lang="en">
                    </div>
                </nav>
                <button class="menu-toggle" aria-label="Menu">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </header>
    `;
    document.getElementById('header-placeholder').innerHTML = headerHTML;

    // Gestion du menu burger
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}