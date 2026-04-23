document.addEventListener('DOMContentLoaded', () => {
    const modalPanier = document.getElementById('modal-panier');
    const listeUl = document.getElementById('liste-panier');
    const totalSpan = document.getElementById('total-panier');
    const buttons = document.querySelectorAll('.btn-commander');
    
    // On commence avec un panier vide pour chaque "session" (nouveau client)
    let panier = [];

    // 1. Ajouter un produit avec son prix
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.card');
            const nom = card.querySelector('h3').innerText;
            // On récupère le prix et on le transforme en nombre
            const prix = parseInt(card.querySelector('.prix-produit').innerText);

            panier.push({ nom: nom, prix: prix });
            actualiserAffichagePanier();
            alert(nom + " ajouté au panier !");
        });
    });

    // 2. Fonction pour calculer et afficher
    function actualiserAffichagePanier() {
        listeUl.innerHTML = "";
        let total General = 0;

        panier.forEach((item, index) => {
            totalGeneral += item.prix;
            let li = document.createElement('li');
            li.innerHTML = `${item.nom} <span>${item.prix} FCFA</span>`;
            listeUl.appendChild(li);
        });

        totalSpan.innerText = totalGeneral;
        // Met à jour le compteur du header s'il existe
        if(document.getElementById('compteur-panier')) {
            document.getElementById('compteur-panier').innerText = panier.length;
        }
    }

    // 3. Ouvrir/Fermer le panier
    document.getElementById('btn-voir-panier').onclick = () => modalPanier.style.display = 'flex';
    document.querySelector('.close-panier').onclick = () => modalPanier.style.display = 'none';

    // 4. Finaliser et VIDER le panier (pour le prochain client)
    document.getElementById('btn-finaliser-commande').onclick = () => {
        if (panier.length === 0) return alert("Le panier est vide !");
        
        let message = "Bonjour Emma's Vogue, je souhaite commander :\n";
        panier.forEach(item => message += `- ${item.nom} (${item.prix} FCFA)\n`);
        message += "\nTotal : " + totalSpan.innerText + " FCFA";

        window.open(`https://wa.me/2290150509600?text=${encodeURIComponent(message)}`, '_blank');
        
        // CRUCIAL : On vide le panier après la commande
        panier = [];
        actualiserAffichagePanier();
        modalPanier.style.display = 'none';
    };
});