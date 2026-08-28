db.movies.find({
    nb_actors: { $lt: 5 } /* match */
}, /* projection */ {
    title: 1,
    nb_actors: { $size: '$actors' }
})

db.movies.aggregate(
    // stages
    { /* stage 1 */ },
    { /* stage 2 */ },
    { /* stage 3 */ }
)

stepProjection = { $project: {
        title: 1,
        nb_actors: { $size: '$actors' }
    } }

stepFiltre = { $match: {
        nb_actors: { $lt: 5 }
    } }

db.movies.aggregate(
    stepProjection, 
    stepFiltre
)

step1 = {
    $match: { 
        genre: { $in: ['Horror', 'Comedy'] },
        year: { $gte: 1990, $lte: 1999 }
    }
}

step2 = {
    $project: {
        title: 1,
        actors: { $sortArray: { 
            input: '$actors',
            sortBy: 1 
        } }
    }
}

step3 = {
    $project: {
        title: 1,
        actors: { $slice: ['$actors', 5] }
    }
}

db.movies.aggregate(
    step1, // filtre
    step2, // projection
    step3, // projection
)

db.movies.aggregate({
    $addFields: {
        nb_actors: { $size: '$actors' },
        title_year: { $concat: [
            '$title', 
            ' - ', 
            { $toString: '$year' }
        ] }
    }
})

db.movies.aggregate(
    { $limit: 5 }
)

db.movies.aggregate(
    { $sample: { size: 5 } }
)

db.movies.aggregate(
    { $group: {
        _id: '$year',
        moyenneScore: { $avg: '$score' },
        moyenneActors: { $avg: { $size: '$actors' } },
        nbMovies: { $count: {} },
        maxScore: { $max: '$score' },
        movies: { $push: '$title' },
        best10: { $topN: { 
            n: 10, 
            sortBy: { score: -1 },
            output: ['$title', '$score']
        } }
    }},
    { $sort: { _id: 1 } }
)

db.movies.aggregate(
    { $group: {
        _id: '$genre',
        scoreMax: { $max: '$score' }
    } }
)

db.movies.aggregate(
    { $unwind: '$genre' },
    { $group: {
        _id: '$genre',
        nbMovies: { $count: {} },
        titles: { $push: '$title' }
    } }
)