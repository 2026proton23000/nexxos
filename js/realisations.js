let projetsData = []; // Stocker les données pour éviter de recharger

async function loadRealisations() {
    const container = document.getElementById('projets-container');
    if (!container) return;

    try {
        const response = await fetch('data/realisations.json');
        projetsData = await response.json();
        const lang = window.i18n.getCurrentLang();

        let html = '<div class="projets-grid">';
        projetsData.forEach(projet => {
            const titre = projet[`titre_${lang}`] || projet.titre_fr;
            const categorie = projet[`categorie_${lang}`] || projet.categorie_fr;
            const miniaturePath = `assets/images/projets/${projet.id}/${projet.miniature}`;
            html += `
                <div class="projet-card" data-id="${projet.id}">
                    <div class="projet-image">
                        <img src="${miniaturePath}" alt="${titre}" loading="lazy" onerror="this.src='assets/images/placeholder.jpg'">
                    </div>
                    <div class="projet-info">
                        <span class="projet-categorie">${categorie}</span>
                        <h3>${titre}</h3>
                        <p>${projet.lieu}</p>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        container.innerHTML = html;

        // Ajouter les écouteurs de clic sur chaque carte
        document.querySelectorAll('.projet-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                const projet = projetsData.find(p => p.id === id);
                if (projet) openModal(projet);
            });
        });
    } catch (error) {
        console.error('Erreur chargement projets:', error);
        container.innerHTML = '<p>Erreur de chargement des projets.</p>';
    }
}

// Fonction pour ouvrir la modale
function openModal(projet) {
    const lang = window.i18n.getCurrentLang();
    const titre = projet[`titre_${lang}`] || projet.titre_fr;
    const categorie = projet[`categorie_${lang}`] || projet.categorie_fr;

    // Créer la structure de la modale
    const modal = document.createElement('div');
    modal.className = 'projet-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>${titre}</h2>
            <p class="modal-meta">${categorie} • ${projet.lieu}</p>
            <div class="modal-galerie">
                ${projet.photos.map((photo, index) => {
                    const legende = photo[`legende_${lang}`] || photo.legende_fr;
                    const photoPath = `assets/images/projets/${projet.id}/${photo.src}`;
                    return `
                        <div class="modal-photo">
                            <img src="${photoPath}" alt="${legende}" loading="lazy">
                            <p class="photo-legende">${legende}</p>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden'; // Empêcher le scroll

    // Fermeture
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    const closeModal = () => {
        modal.remove();
        document.body.style.overflow = '';
    };
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
}

document.addEventListener('languageChanged', loadRealisations);
document.addEventListener('DOMContentLoaded', loadRealisations);