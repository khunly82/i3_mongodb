// 1. Récupérer le document complet du film "The Shawshank Redemption".

db.movies.findOne({
    title: 'The Shawshank Redemption'
})

// 2. Récupérer le titre et le rating des films dont le rating est égal à 3.

db.movies.find({
    rating: 3
}, {
    title: 1, rating: 1
})

// 3. Récupérer le titre et l'année de tous les films sortis dans les années 90 (de 1990 à 1999 inclus).

db.movies.find({
    year: { $gte: 1990, $lte: 1999 }
}, {
    title: 1, 
    year: 1
})

// 4. Récupérer le titre, l'année et le genre des films d'horreur sortis après 2000.

db.movies.find({
    year: { $gte: 2000 },
    genre: 'Horror'
}, {
    title: 1, 
    year: 1,
    genre: 1
})

// 5. Récupérer le titre et l'année des films dans lesquels Tom Hanks a joué, triés par année croissante.

db.movies.find({
    actors: 'Tom Hanks'
}, {
    title: 1,
    year: 1
}).sort({ year: 1 })

// 6. Récupérer le titre et le score des 10 premiers films triés par score décroissant (masquer l'id).

db.movies.find({}, {
    title: 1,
    score: 1,
    _id: 0
})
.sort({ score: -1 })
.limit(10)

// 7. Récupérer le titre et le score des 10 films suivants (pagination).

db.movies.find({}, {
    title: 1,
    score: 1,
    _id: 0
})
.sort({ score: -1 })
.skip(10)
.limit(10)

// db.movies.find({ /*1*/ }, {/*5*/})
// .sort(/*2*/)
// .skip(/*3*/)
// .limit(/*4*/)

// db.movies.find({
//     year: 1994,
//     $expr: { $lt: [
//         {$size: '$actors'}, 10
//     ] }
// }, { 
//     title: 1,
//     nbActors: { $size: '$actors' }
// }).sort({
//     nbActors: 1
// })

// 8. Compter le nombre de films qui sont de genre "Horror" ou "Comedy".

db.movies.countDocuments({
    genre: { $in: ['Horror', 'Comedy'] }
})

// 9. Compter le nombre de films dont le titre contient le mot "christmas" (insensible à la casse).

db.movies.countDocuments({
    title: /christmas/i
})

// 10. Récupérer le titre et les genres des films qui contiennent à la fois le genre "Drama" et le genre "Crime".

db.movies.find({
    genre: { $all: ['Drama', 'Crime'] }
}, {
    title: 1,
    genre: 1
})

// 11. Récupérer le titre et le rating des films dont le rating n'est ni 4, ni 5.

db.movies.find({
    rating: { $nin: [4,5] }
}, {
    title: 1,
    rating: 1
})

// 12. Récupérer le titre et les acteurs des films dont la liste contient exactement 5 acteurs.

db.movies.find({
    actors: { $size: 5 }
}, {
    title: 1,
    actors: 1
})

// 13. Récupérer la liste unique de tous les genres présentés dans la base de données.

db.movies.distinct('genre')

// 14. Récupérer la liste unique des années dans lesquelles au moins un film d'horreur et d'animation est sorti.

db.movies.distinct('year', {
    genre: { $all: ['Animation', 'Horror'] }
})

// 15. Récupérer le titre et la couleur des films qui possèdent un champ `color` renseigné.

db.movies.find({
    color: { $exists: 0 }
}, { title: 1, color: 1 })


// 16. Récupérer le titre et les acteurs des films ayant strictement plus de 5 acteurs.

db.movies.find({
    // $expr: { $gt: [
    //     { $size: '$actors' },
    //     5
    // ] }
}, {
    title: 1,
    actors: 1
})

// 17. Récupérer le `titre`, les `5 premiers acteurs triés par ordre croissant` des films sortis dans les années 90 et dont le genre est "Horror" ou "Comedy".
// hint: $sortArray, $slice

db.movies.find({
    genre: { $in: ['Horror', 'Comedy'] },
    year: { $gte: 1990, $lte: 1999 }
}, {
    title: 1,
    actors: { $slice: [
        { $sortArray: {input: '$actors', sortBy: 1} }, 5
    ] },
})




