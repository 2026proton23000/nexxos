// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Récupération des données du formulaire
        const formData = new FormData(form);
        const data = {
            nom: formData.get('nom'),
            email: formData.get('email'),
            telephone: formData.get('telephone'),
            service: formData.get('service'),
            message: formData.get('message'),
            date: new Date().toLocaleString('fr-FR', { timeZone: 'America/Santiago' })
        };

        // Envoi à Google Sheets
        if (typeof sendToGoogleSheet === 'function') {
            await sendToGoogleSheet(data);
        }

        // Préparation du message Telegram
        const serviceLabel = document.querySelector(`#service option[value="${data.service}"]`)?.textContent || data.service;
        const telegramMessage = `
<b>🔔 Nouvelle demande de contact</b>

<b>👤 Nom:</b> ${data.nom}
<b>📧 Email:</b> ${data.email}
<b>📞 Téléphone:</b> ${data.telephone}
<b>🛠️ Service:</b> ${serviceLabel}
<b>💬 Message:</b> ${data.message}
<b>📅 Date:</b> ${data.date}
        `;

        // Envoi à Telegram avec logs
        console.log('sendTelegramNotification existe ?', typeof sendTelegramNotification);
        if (typeof sendTelegramNotification === 'function') {
            try {
                console.log('Appel de sendTelegramNotification avec message :', telegramMessage);
                await sendTelegramNotification(telegramMessage);
                console.log('Appel réussi, vérifie Telegram');
            } catch (error) {
                console.error('Erreur lors de l\'envoi Telegram:', error);
            }
        } else {
            console.error('sendTelegramNotification non défini ! Vérifie l\'ordre des scripts.');
        }
        // Message de confirmation à l'utilisateur
        alert('Merci ! Votre message a été envoyé. Nous vous répondrons dans les plus brefs délais.');

        // Réinitialisation du formulaire
        form.reset();
    });
});