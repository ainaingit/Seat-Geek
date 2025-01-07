let cars = [
    {
        brand: "Toyota",
        model: "V8",
        matricule: "2522 TAS"
    },
    {
        brand: "Nissan",
        model: "GTR R34",
        matricule: "1234 XYZ"
    },
    {
        brand: "Nissan",
        model: "Altima",
        matricule: "5678 ABC"
    },
    {
        brand: "Honda",
        model: "Civic",
        matricule: "9012 DEF"
    },
    {
        brand: "Nissan",
        model: "X-Trail",
        matricule: "3456 GHI"
    },
];

function GetCarsModel(brand) {
    let models = [];
    for (let car of cars) {
        if (car.brand.toLowerCase() === brand.toLowerCase()) {
            models.push(car.model);
        }
    }
    return models;
}

function DisplayCars() {
    for (let i = 0; i < cars.length; i++) {
        alert(
            "Voiture numéro : " + (i + 1) +
            "\nMarque : " + cars[i].brand +
            "\nModèle : " + cars[i].model +
            "\nMatricule : " + cars[i].matricule
        );
    }
}

// Appel des fonctions
DisplayCars();

let nissanModels = GetCarsModel("Nissan");
alert("Modèles de Nissan disponibles : " + nissanModels.join(", "));


// Fonction pour afficher les voitures dans le HTML
function displayCarsInHTML() {
    // Sélectionner le conteneur HTML où afficher les voitures
    const carContainer = document.getElementById('carContainer');

    // Vérifier si le conteneur existe
    if (!carContainer) {
        console.error("Aucun élément avec l'ID 'carContainer' trouvé !");
        return;
    }

    // Effacer le contenu précédent (au cas où)
    carContainer.innerHTML = '';

    // Parcourir la liste des voitures et créer des éléments HTML
    cars.forEach((car, index) => {
        const carElement = document.createElement('div');
        carElement.innerHTML = `
            <h3>Voiture ${index + 1}</h3>
            <p><strong>Marque :</strong> ${car.brand}</p>
            <p><strong>Modèle :</strong> ${car.model}</p>
            <p><strong>Matricule :</strong> ${car.matricule || "Non spécifié"}</p>
            <hr>
        `;
        carContainer.appendChild(carElement); // Ajouter chaque voiture au conteneur
    });
}
