// Configuration Telegram
const TELEGRAM_BOT_TOKEN = '8629349127:AAGc5vJ8rpJcpo9uJKEhcEcwlBwMwbujJRQ';
const TELEGRAM_CHAT_ID = '6051665667';

/**
 * Envoie une notification à Telegram
 * @param {string} message - Le message à envoyer (format HTML)
 * @returns {Promise<object>} - Réponse de l'API Telegram
 */
async function sendTelegramNotification(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const payload = {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (!data.ok) {
            console.error('Erreur Telegram:', data.description);
        }
        return data;
    } catch (error) {
        console.error('Erreur réseau lors de l\'envoi à Telegram:', error);
    }
}

// Exposer la fonction globalement
window.sendTelegramNotification = sendTelegramNotification;