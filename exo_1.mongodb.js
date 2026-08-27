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



// 4. Récupérer le titre, l'année et le genre des films d'horreur sortis après 2000.



// 5. Récupérer le titre et l'année des films dans lesquels Tom Hanks a joué, triés par année croissante.



// 6. Récupérer le titre et le score des 10 premiers films triés par score décroissant (masquer l'id).



// 7. Récupérer le titre et le score des 10 films suivants (pagination).



// 8. Compter le nombre de films qui sont de genre "Horror" ou "Comedy".



// 9. Compter le nombre de films dont le titre contient le mot "christmas" (insensible à la casse).



// 10. Récupérer le titre et les genres des films qui contiennent à la fois le genre "Drama" et le genre "Crime".



// 11. Récupérer le titre et le rating des films dont le rating n'est ni 4, ni 5.



// 12. Récupérer le titre et les acteurs des films dont la liste contient exactement 5 acteurs.



// 13. Récupérer la liste unique de tous les genres présentés dans la base de données.



// 14. Récupérer la liste unique des années dans lesquelles au moins un film d'horreur est sorti.



// 15. Récupérer le titre et la couleur des films qui possèdent un champ `color` renseigné.



// 16. Récupérer le titre et les acteurs des films ayant strictement plus de 5 acteurs.



// 17. Récupérer le `titre`, les `5 premiers acteurs triés par ordre croissant` des films sortis dans les années 90 et dont le genre est "Horror" ou "Comedy".


