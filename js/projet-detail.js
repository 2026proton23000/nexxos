function getProjectId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function loadProjectDetail() {
    const container = document.getElementById('projet-detail-container');
    const projectId = getProjectId();
    if (!container || !projectId) return;

    try {
        const response = await fetch('data/realisations.json');
        const projets = await response.json();
        const projet = projets.find(p => p.id === projectId);
        if (!projet) {
            container.innerHTML = '<p>Projet non trouvé.</p>';
            return;
        }

        const lang = window.i18n.getCurrentLang();
        const titre = projet[`titre_${lang}`] || projet.titre_fr;
        const categorie = projet[`categorie_${lang}`] || projet.categorie_fr;

        let html = `
            <h1>${titre}</h1>
            <p class="projet-meta">${categorie} • ${projet.lieu}</p>
            <div class="projet-galerie">
        `;

        projet.photos.forEach(photo => {
            const legende = photo[`legende_${lang}`] || photo.legende_fr;
            const photoPath = `assets/images/projets/${projet.id}/${photo.src}`;
            html += `
                <div class="galerie-item">
                    <img src="${photoPath}" alt="${legende}" onclick="openLightbox(this)" loading="lazy">
                    <p class="legende">${legende}</p>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
    } catch (error) {
        console.error('Erreur chargement projet:', error);
        container.innerHTML = '<p>Erreur de chargement du projet.</p>';
    }
}

// Lightbox simple (optionnel)
function openLightbox(img) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        cursor: pointer;
    `;
    const enlarged = document.createElement('img');
    enlarged.src = img.src;
    enlarged.style.maxWidth = '90%';
    enlarged.style.maxHeight = '90%';
    lightbox.appendChild(enlarged);
    lightbox.onclick = () => lightbox.remove();
    document.body.appendChild(lightbox);
}

document.addEventListener('languageChanged', loadProjectDetail);
document.addEventListener('DOMContentLoaded', loadProjectDetail);