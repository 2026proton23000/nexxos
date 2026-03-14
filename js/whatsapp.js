// Configuration WhatsApp
const whatsappNumber = '56952299301'; // sans le +
const defaultMessage = 'Bonjour, je souhaite obtenir un renseignement.';

function openWhatsApp(message = defaultMessage) {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Ajout du bouton flottant après chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.createElement('a');
    btn.href = '#';
    btn.className = 'whatsapp-float';
    btn.id = 'whatsapp-btn';
    btn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    document.body.appendChild(btn);

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openWhatsApp();
    });
});