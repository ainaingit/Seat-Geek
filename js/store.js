// Fonction pour afficher les informations et mettre à jour le modèle préféré
function showCarInfo(model) {
    let info = "";
    switch(model.toLowerCase()) {
        case "altima":
            info = "Nissan Altima - Une voiture qui offre confort et technologie.";
            break;
        case "leaf":
            info = "Nissan Leaf - Une voiture entièrement électrique.";
            break;
        case "x-trail":
            info = "Nissan X-Trail - Un SUV robuste pour toute aventure.";
            break;
        default:
            info = "Modèle non disponible. Essayez Altima, Leaf ou X-Trail.";
            break;
    }
            document.getElementById("carInfo").innerHTML = "<div class='alert alert-info'>" + info + "</div>";
            document.getElementById("preferredCar").innerText = "Votre voiture préférée : " + model.charAt(0).toUpperCase() + model.slice(1);
    //alert("Votre voiture préférée : " + info);      
}

// Fonction pour rediriger vers la boutique (peut-être vers une autre page ou section)
function goToStore() {
// Si tu veux naviguer vers une autre page "boutique.html"
    window.location.href = "boutique.html"; 

    // Si tu veux faire défiler jusqu'à une section "store" de la même page, décommente la ligne ci-dessous :
    // document.getElementById('store').scrollIntoView({ behavior: 'smooth' });
}

function ClientInfo(){
    // utilisation d un tableau 
    let tab  = [] ;
    while (true) {
        let info  = prompt("oui ?","") ;
        // alert(info) ;
        if(!info) break ;
        tab.push(info)        
    }
    
    for (let ojbet in tab) {
        alert(tab[ojbet]) ;
    }
}