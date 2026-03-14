// Configuration Google Apps Script (placeholder)
const googleScriptURL = 'https://script.google.com/macros/s/AKfycbzC9pzbKiiMzHbHrQGLEBw2vxBR6d_8JMfcYAovwTjxEt1AZBIpxiZjEfcEPDW17aL-Xw/exec';

async function sendToGoogleSheet(data) {
    try {
        const response = await fetch(googleScriptURL, {
            method: 'POST',
            mode: 'no-cors', // important pour les CORS
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        console.log('Données envoyées à Google Sheets');
    } catch (error) {
        console.error('Erreur Google Sheets:', error);
    }
}