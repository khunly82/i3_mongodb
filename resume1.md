**1. Structure d'une requête `find`**

```javascript
db.collection.find( { <filtres> }, { <projection> } )

```

* **Filtres (Condition)** : Sélectionne les documents qui correspondent au critère.
* **Projection (Champs)** : Spécifie les champs à afficher (`1`) ou à masquer (`0`). Par défaut, `_id` s'affiche toujours sauf si vous écrivez `_id: 0`.

---

**2. Opérateurs de comparaison**

| Opérateur | Signification | Exemple d'utilisation |
| --- | --- | --- |
| `$eq` | Égal à *(optionnel, égalité simple)* | `{ rating: 3 }` ou `{ rating: { $eq: 3 } }` |
| `$gt` / `$gte` | Strictement supérieur / Supérieur ou égal | `{ year: { $gte: 1990 } }` |
| `$lt` / `$lte` | Strictement inférieur / Inférieur ou égal | `{ year: { $lte: 1999 } }` |
| `$in` | Appartient à une liste de valeurs | `{ genre: { $in: ['Horror', 'Comedy'] } }` |
| `$nin` | N'appartient **pas** à une liste de valeurs | `{ rating: { $nin: [4, 5] } }` |

---

**3. Opérateurs logiques**

| Opérateur | Description | Exemple d'utilisation |
| --- | --- | --- |
| `$and` | **ET** logique *(implicite si les champs sont différents)* | `{ year: { $gte: 1990, $lte: 1999 } }` |
| `$or` | **OU** logique entre plusieurs conditions | `{ $or: [ { genre: 'Comedy' }, { genre: 'Horror' } ] }` |

---

**4. Requêtes sur les Tableaux & Chaînes**

| Élément | Description | Exemple d'utilisation |
| --- | --- | --- |
| **Recherche exacte** | Contient l'élément | `{ actors: 'Tom Hanks' }` *(dans un tableau de chaînes)* |
| **Expression Régulière** | Recherche partielle ou insensible à la casse (`i`) | `{ title: /christmas/i }` |
| `$all` | Contient **tous** les éléments spécifiés | `{ genre: { $all: ['Drama', 'Crime'] } }` |
| `$size` | Longueur exacte d'un tableau | `{ actors: { $size: 5 } }` |
| `$elemMatch` | Au moins un élément du tableau respecte le critère | `{ alternative_titles: { $elemMatch: { $regex: /^Rita/i } } }` |

---

**5. Opérateurs d'Évaluation**

| Opérateur | Description | Exemple d'utilisation |
| --- | --- | --- |
| `$expr` | Permet d'utiliser des expressions complexes (ex: comparer des champs dynamiquement) | `{ $expr: { $gt: [{ $size: "$actors" }, 5] } }` |

---

**6. Méthodes de Curseur & Utilitaires**

* **Chaining sur `find()**` :
* `.sort({ year: 1 })` : Tri croissant (`1`) ou décroissant (`-1`).
* `.limit(10)` : Restreint le nombre de résultats aux $N$ premiers.
* `.skip(10)` : Ignore les $N$ premiers résultats (utile pour la pagination).
* `.count()` : Compte le nombre de documents retournés par la requête.


* **Valeurs uniques** :
* `db.collection.distinct("champ", { <filtres> })` : Renvoie un tableau des valeurs uniques pour un champ donné.