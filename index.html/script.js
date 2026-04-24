document.addEventListener('DOMContentLoaded', () => {
    const modalPanier = document.getElementById('modal-panier');
    const listeUl = document.getElementById('liste-panier');
    const totalSpan = document.getElementById('total-panier');
    const buttons = document.querySelectorAll('.btn-ajouter-panier');
    const compteurHeader = document.getElementById('compteur-panier');
    
    // Panier vide au démarrage (chaque nouveau client commence à zéro)
    let panier = [];

document.addEventListener('click', (event) => {
    // On vérifie si l'élément cliqué est un bouton d'ajout
    if (event.target.classList.contains('btn-ajouter-panier')) {
        const btn = event.target;
        const card = btn.closest('.card'); // Vérifie bien que ta section bracelet utilise aussi la classe 'card'
        const nom = card.querySelector('h3').innerText;
        
        // Récupération du prix
        let prixTexte = card.querySelector('.price').innerText;
        let prixChiffre = parseInt(prixTexte.replace(/[^\d]/g, '')) || 0;

        // On ajoute au panier
        panier.push({ nom: nom, prix: prixChiffre });

        // Mise à jour de l'affichage
        actualiserAffichage();

        // Notification (ton code toast)
        const toast = document.getElementById('toast-notification');
        toast.innerText = nom + " ajouté avec succès ✅";
        toast.style.display = 'block';
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }
});
    // --- 2. MISE À JOUR VISUELLE ---
    function actualiserAffichage() {
        listeUl.innerHTML = "";
        let sommeTotale = 0;

        panier.forEach((item) => {
            sommeTotale += item.prix;
            let li = document.createElement('li');
            li.style.display = "flex";
            li.style.justifyContent = "space-between";
            li.innerHTML = `<span>${item.nom}</span> <b>${item.prix} FCFA</b>`;
            listeUl.appendChild(li);
        });

        totalSpan.innerText = sommeTotale;
        if (compteurHeader) compteurHeader.innerText = panier.length;
    }

    // --- 3. OUVRIR / FERMER ---
    document.getElementById('btn-voir-panier').onclick = () => modalPanier.style.display = 'flex';
    document.querySelector('.close-panier').onclick = () => modalPanier.style.display = 'none';

    // --- 4. FINALISER ET VIDER (La partie importante) ---
    document.getElementById('btn-finaliser-commande').onclick = () => {
        if (panier.length === 0) {
    const toast = document.getElementById('toast-notification');
    toast.innerHTML = "Votre panier est vide ! 🛒";
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
    return;
}
        
        let message = "Bonjour Emma's Vogue, voici ma commande :\n\n";
        panier.forEach(item => message += `- ${item.nom} : ${item.prix} FCFA\n`);
        message += "\nTotal : " + totalSpan.innerText + " FCFA";

        window.open(`https://wa.me/2290150509600?text=${encodeURIComponent(message)}`, '_blank');
        
        // VIDER LE PANIER IMMÉDIATEMENT APRÈS LA COMMANDE
        panier = [];
        actualiserAffichage();
        modalPanier.style.display = 'none';
        // ... après avoir ouvert WhatsApp ...
window.open(`https://wa.me/2290150509600?text=${encodeURIComponent(message)}`, '_blank');

// VIDER ET AFFICHER LA NOTIFICATION PROFESSIONNELLE
panier = [];
actualiserAffichage();
modalPanier.style.display = 'none';

// Appel de la notification élégante
const toast = document.getElementById('toast-notification');
toast.innerHTML = "Commande envoyée avec succès ✅"; 
toast.style.display = 'block';

// Disparaît après 3 secondes
setTimeout(() => {
    toast.style.display = 'none';
}, 3000);
    };
});