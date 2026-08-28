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

db.movies.aggregate(
    { $match: { actors: 'Tom Hanks' } },
    { $group: { 
        _id: null,
        average: { $avg: '$score'  }
    } },
    { $project: { averageOn100: { $multiply: [10, '$average'] } } }
)

// ---

// ### Exercice 6
// Récupérer **tous les titres de films groupés par genre**.

db.movies.aggregate(
    { $unwind: '$genre' },
    { $group: { _id: '$genre', titles: { $push: '$title' } } }
)

// ---

// ### Exercice 7
// Récupérer les **10 meilleurs titres de films pour chaque genre** (basé sur le score).

db.movies.aggregate(
    { $unwind: '$genre' },
    { $group: { 
        _id: '$genre', 
        titles: { $topN: { 
            output: '$title', n: 10, sortBy: { score: -1 } 
        } } 
    } }
)

// ---

// ### Exercice 8
// Récupérer les **5 meilleures moyennes de score** des films groupés par acteurs.

db.movies.aggregate(
    { $unwind: '$actors' },
    { $group: { _id: '$actors', avg: { $avg: '$score' } } },
    { $sort: { avg: -1 } },
    { $limit: 5 }
)

// ---

// ### Exercice 9
// Récupérer la **moyenne des scores** groupée à la fois par **genre** et par **année**.

db.movies.aggregate(
    { $unwind: '$genre' },
    { $group: { 
        _id: ['$year', '$genre'],
        moyenne: { $avg: '$score' }
    } },
    { $sort: { _id: 1 }  }
)

// ---

// ### Exercice 10
// Récupérer le **nombre total de films** dans lesquels chaque acteur a joué.

// ---

db.movies.aggregate(
    { $unwind: '$actors' },
    { $group: { 
        _id: '$actors', 
        count: { $count: {} } 
    } }
)

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

db.movies.aggregate(
    { $unwind: '$actors' },
    { $unwind: '$genre' },
    { $group: {
        _id: { genre: '$genre', actor: '$actors' },
        nbFilms: { $count: {} }
    } },
    { $group: {
        _id: '$_id.actor',
        details: { $push: { 
            genre: '$_id.genre', quantite: '$nbFilms' 
        } }
    } }
)

