// # Exercices Pratiques : Le Framework d'Agrégation MongoDB

// > **Consigne générale :** 
// > Même si certaines requêtes pourraient être réalisées avec une simple extraction (méthode `find()`), vous devez **impérativement utiliser la pipeline d'agrégation** (`db.movies.aggregate([...])`).

// ---

// ### Exercice 1
// Récupérer **20 titres de films aléatoires** (seul le titre doit être conservé dans le résultat).

db.movies.aggregate(
    { $sample: { size: 20 } },
    { $project: { _id: 0, title: 1 } },
)

// ---

// ### Exercice 2
// Récupérer les **20 premiers films** (titre uniquement) triés par **ordre croissant** sur leur titre.

// ---

db.movies.aggregate(
    { $sort: { title: 1 } },
    { $limit: 20 },
    { $project: { _id: 0, title: 1 } },
)

// ### Exercice 3
// Récupérer les **20 films suivants** (du 21ᵉ au 40ᵉ), également triés par **ordre croissant** sur leur titre.

// ---

db.movies.aggregate(
    { $sort: { title: 1 } },
    { $skip: 20 },
    { $limit: 20 },
    { $project: { _id: 0, title: 1 } },
)

// ### Exercice 4
// Récupérer toutes les propriétés des films dans lesquels **Tom Hanks** a joué :
// - Triés par **ordre décroissant** sur leur score.
// - En ajoutant un champ calculé `score100` qui correspond au score ramené sur 100.

db.movies.aggregate(
    { $match: { actors: 'Tom Hanks' } },
    { $addFields: { score100: { $multiply: ['$score', 10] } } },
    { $sort: { score100: 1 } },
)

// ---

// ### Exercice 5
// Récupérer la **moyenne des scores sur 100** pour l'ensemble des films dans lesquels **Tom Hanks** a joué.

// ---

// ### Exercice 6
// Récupérer **tous les titres de films groupés par genre**.

// ---

// ### Exercice 7
// Récupérer les **10 meilleurs titres de films pour chaque genre** (basé sur le score).

// ---

// ### Exercice 8
// Récupérer les **5 meilleures moyennes de score** des films groupés par acteurs.

// ---

// ### Exercice 9
// Récupérer la **moyenne des scores** groupée à la fois par **genre** et par **année**.

// ---

// ### Exercice 10
// Récupérer le **nombre total de films** dans lesquels chaque acteur a joué.

// ---

// ### Exercice 11
// Récupérer par acteur la **répartition des films par genre** (le nom du genre et le nombre de films associés).

// **Format attendu pour le résultat :**
// ```json
// [
//   { 
//     "_id": "John Doe", 
//     "details": [ 
//       { "genre": "Comedy", "quantite": 2 }, 
//       { "genre": "Horror", "quantite": 5 }
//     ]
//   }
// ]