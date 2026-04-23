document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-commander');
    const modal = document.getElementById('modal-commande');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log("Clic détecté !");
            const card = btn.closest('.card');
            const nom = card.querySelector('h3').innerText;
            document.getElementById('info-produit').innerText = nom;
            modal.style.display = 'flex';
        });
    });

    // Fermer la fenêtre
    document.querySelector('.close').onclick = () => {
        modal.style.display = 'none';
    };

    // Envoi WhatsApp
    document.getElementById('form-client').onsubmit = (e) => {
        e.preventDefault();
        const client = document.getElementById('nom-client').value;
        const produit = document.getElementById('info-produit').innerText;
        window.open(`https://wa.me/2290150509600?text=Bonjour, je suis ${client}, je veux commander : ${produit}`, '_blank');
    };
}); // <--- LA SEULE FERMETURE FINALE DOIT ÊTRE ICI