function loadFooter() {
    const footerHTML = `
        <footer class="site-footer">
            <div class="container">
                <p>© 2025 NEXXOS SPA - <span data-i18n="footer_droits">Tous droits réservés</span></p>
                <p style="margin-top: 10px;"><i class="fas fa-phone"></i> <span data-i18n="contact_phone">+56 9 5229 9301</span> | <i class="fas fa-envelope"></i> <span data-i18n="contact_email">jaime.c@nexxossa.cl</span></p>
            </div>
        </footer>
    `;
    document.getElementById('footer-placeholder').innerHTML = footerHTML;
}