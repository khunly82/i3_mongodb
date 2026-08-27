// créer une collection
// CREATE TABLE pokemon()
db.createCollection('pokemon')

// INSERT INTO pokemon VALUES('vert', 'Bulbizarre', ....)
db.pokemon.insertOne({
    couleur: 'vert',
    nom: 'Bulbizarre',
    taille: 30,
    attaques: [
        'Fouet liane',
        'Lance soleil',
        'Charge'
    ]
})

// SELECT * FROM pokemon
db.pokemon.find()

// SELECT * FROM movies
db.movies.find()

// SELECT title, year 
// FROM movies
db.movies.find({}, {
    title: 1,
    year: 1,
    _id: 0
})

// SELECT 
//      title, 
//      year,
//      score * 10 AS score100 
// FROM movies
// WHERE year = 1994

db.movies.find({
    year: 1994
}, {
    title: 1,
    year: 1,
    // ajouter une colonne calculée
    // avec l'opérateur de multiplicatio
    score100: { $multiply: [
        '$score', 10
    ] },
    nb_actors: { $size: '$actors' },
})

db.movies.find({
    // filtrer (WHERE)
}, {
    // projection (SELECT)
})

// SELECT TOP 1 title, year 
// FROM movies
db.movies.findOne({
    year: 1994
}, {
    title: 1,
    year: 1
})

// SELECT COUNT(*) FROM movies
db.movies.count({
    year: 1994
})

// limiter et trier les données
// SELECT title, genre, year
// WHERE genre = 'Adventure'
// ORDER BY year DESC, title ASC
db.movies.find({
    genre: 'Adventure'
}, {
    title: 1,
    genre: 1,
    year: 1,
}).sort({
    year: -1,
    title: 1,
}).skip(6).limit(3).toArray()

// db.<collection>.find(
//     { /* WHERE */ },
//     { /* SELECT */ }
// ).sort(/* ORDER BY */)
// .limit(/* FETCH NEXT */)
// .skip(/* OFFSET */)

// WHERE year IN (1994, 2000)
db.movies.find({
    // year: { $gt: 2000 } // > 2000
    // year: { $lte: 2000 } // <= 2000
    // <> 2000
    // year: { $ne: 2000 }
    // BETWEEN 2000 AND 2002
    // year: { $gte: 2000, $lte: 2002 }
    // IN (1999, 2009, 1989)
    // year: { $in: [1999, 2009, 1989] }
    // year = 2000 AND genre = 'Comedy'
    year: 2000,
    genre: 'Comedy'
})


// 16. $expr ou $where
// 17. $slice, $sortArray