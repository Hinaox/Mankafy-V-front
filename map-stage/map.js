// Définir les limites géographiques de Madagascar (bounding box)
var madagascarBounds = [
    [-26.0, 42.0], // Sud-Ouest (coordonnées approx.)
    [-11.0, 51.0]  // Nord-Est (coordonnées approx.)
];

// Initialiser la carte avec un centre sur Madagascar et des limites définies
var map = L.map('map', {
    center: [-18.8792, 47.5079], // Centre de Madagascar (Antananarivo)
    zoom: 6.4,
    maxBounds: madagascarBounds,
    maxBoundsViscosity: 1.0,
    minZoom: 6.4,
    maxZoom: 18
});

// Ajouter la couche OSM à la carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Variables pour stocker les polygones
var polygons = []; // Tableau pour stocker chaque polygone
var currentPolygonPoints = []; // Points du polygone en cours
var currentPolygonLayer;
var isDrawingPolygon = false; // Indicateur pour savoir si un polygone est en cours

// Fonction pour créer un nouveau polygone sans supprimer les anciens
function createNewPolygon(color = "blue") {
    currentPolygonPoints = []; // Réinitialiser les points du nouveau polygone
    currentPolygonLayer = L.polygon(currentPolygonPoints, {
        color: color,         // Couleur des bordures du polygone
        fillColor: color,   // Couleur de remplissage à l'intérieur du polygone
        fillOpacity: 0.3,      // Opacité de remplissage
    }).addTo(map);

    // Ajouter l'effet hover au polygone
    currentPolygonLayer.on('mouseover', function () {
        this.setStyle({
            color: color,       // Change la couleur des bordures au survol
            fillColor: color, // Change la couleur de remplissage au survol
            weight: 2,           // Augmente la largeur de la bordure au survol
            fillOpacity: 0.5     // Augmente l'opacité de remplissage au survol
        });
    });

    currentPolygonLayer.on('mouseout', function () {
        this.setStyle({
            color: color,       // Remet la couleur d'origine des bordures
            fillColor: color,  // Remet la couleur de remplissage d'origine
            fillOpacity: 0.3
        });
    });
    
    currentPolygonLayer.on('click', function () {
        if (!isDrawingPolygon) {
            // Récupérer les coordonnées du polygone
            var latLngs = this.getLatLngs(); // Obtenir les coordonnées du polygone

            // Zoomer sur le centre du polygone et le rendre entièrement visible
            var bounds = L.latLngBounds(latLngs[0]); // Créer des limites avec le premier ensemble de coordonnées
            map.fitBounds(bounds); // Ajuster la carte aux limites du polygone

            // Optionnel : afficher une alerte ou effectuer une autre action
            alert('Polygone cliqué !');
        }
    });

    polygons.push(currentPolygonLayer); // Ajouter le nouveau polygone au tableau
    isDrawingPolygon = true; // Activer le mode dessin de polygone
}



// Fonction pour ajouter un marqueur sur la carte
function addMarker(coords) {
    L.marker([coords.lat, coords.lng]).addTo(map);
}

// Gestionnaire d'événement pour les clics sur la carte
map.on('click', function (e) {
    var coords = e.latlng;

    if (isDrawingPolygon) {
        // Si on est en mode dessin de polygone, ajouter les points au polygone
        currentPolygonPoints.push([coords.lat, coords.lng]);
        currentPolygonLayer.setLatLngs(currentPolygonPoints);
    } else {
        // Sinon, ajouter un simple marqueur
        //addMarker(coords);
    }
});

// Bouton pour initialiser un nouveau polygone
document.getElementById('newPolygon').addEventListener('click', function () {
    createNewPolygon(); // Créer un nouveau polygone
});

// Bouton pour fermer le polygone (lier le dernier point au premier) et désactiver le mode dessin
document.getElementById('closePolygon').addEventListener('click', function () {
    if (currentPolygonPoints.length > 2) {
        currentPolygonPoints.push(currentPolygonPoints[0]); // Fermer le polygone en reliant les points
        currentPolygonLayer.setLatLngs(currentPolygonPoints);
    }
    isDrawingPolygon = false; // Désactiver le mode dessin de polygone
});

// Fonction pour supprimer le polygone en cours
function removeCurrentPolygon() {
    if (currentPolygonLayer) {
        map.removeLayer(currentPolygonLayer); // Supprimer le polygone actuel de la carte
        currentPolygonPoints = []; // Réinitialiser les points du polygone
        currentPolygonLayer = null; // Réinitialiser le calque du polygone
    }
}

// Lier l'événement click du bouton à la fonction removeCurrentPolygon
document.getElementById('removePolygon').addEventListener('click', function () {
    removeCurrentPolygon();
});

// Afficher les coordonnées dans le paragraphe lors du clic droit sur la carte
map.on('contextmenu', function (e) {
    var coords = e.latlng;
    var lat = coords.lat.toFixed(5);
    var lng = coords.lng.toFixed(5);
    document.getElementById('coordinates').textContent = 'Coordonnées : Latitude ' + lat + ', Longitude ' + lng;
});
