async function afficherMaillots() {
    try {
        // On appelle ton serveur
        const response = await fetch('http://localhost:3000/api/produits');
        const maillots = await response.json();

        const liste = document.getElementById('produits-liste');
        liste.innerHTML = ''; // On efface le message "Chargement..."

        maillots.forEach(m => {
            // Calcul du prix avec réduction
            const prixAffiche = m.reduction > 0 ? (m.prix_base * (1 - m.reduction / 100)).toFixed(2) : m.prix_base;

            liste.innerHTML += `
                <div class="card-maillot">
                    <img src="${m.url_image}" alt="${m.nom}" class="img-maillot">
                    <h3>${m.nom}</h3>
                    <p class="prix">${prixAffiche} € ${m.reduction > 0 ? `<span class="promo">-${m.reduction}%</span>` : ''}</p>
                    <button>Détails</button>
                </div>
            `;
        });
    } catch (e) {
        console.error("Impossible de charger les maillots", e);
    }
}

// On lance la fonction dès que la page est prête
window.onload = afficherMaillots;