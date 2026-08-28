# Fiche Synthèse : De MongoDB à Plotly

## 1. La Base : Connexion à MongoDB

```python
from pymongo import MongoClient

# Connexion au serveur local
client = MongoClient("mongodb://localhost:27017/")

# Sélection de la base et de la collection
db = client["test"]
collection = db["movies"]

```

---

## 2. Exemple Simple : Lire tous les films et afficher un graphique

On récupère les documents bruts et on génère un graphique rapide avec `plotly.express`.

```python
import pandas as pd
import plotly.express as px

# 1. Récupération des films depuis MongoDB
cursor = collection.aggregate([{"_id": "$year", "count": { "$count": {} }}])

# 2. Conversion en DataFrame Pandas
df = pd.DataFrame(list(cursor))

df_bucket.rename(columns={'_id': 'annee'}, inplace=True)

# 3. Affichage du graphique simple (Nombre de films par genre)
fig = px.bar(df, x="annee", title="Nombre de films par année")
fig.show()

```

---

## 3. Exemple Avancé : Décennies (`$bucket`) et Boîte à moustaches (`px.box`)

> **Pourquoi la boîte à moustaches ?** Au lieu d'une simple moyenne qui peut être trompeuse, le *Box Plot* montre la médiane, la dispersion des notes et les films extrêmes pour chaque décennie.

### Étape A : Le pipeline d'agrégation MongoDB (`$bucket`)

On utilise `$bucket` pour définir les tranches de 10 ans et `$push` pour regrouper la liste des notes de chaque décennie.

```python
pipeline = [
    {
        # Regroupement par tranches de 10 ans sur le serveur MongoDB
        "$bucket": {
            "groupBy": "$year",
            "boundaries": [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020],
            "output": {
                "tous_les_scores": {"$push": "$score"}  # Récupère tous les scores de la décennie
            }
        }
    }
]

cursor = collection.aggregate(pipeline)

```

### Étape B : Transformation minimale et Box Plot avec Plotly

```python
import pandas as pd
import plotly.express as px

# 1. Conversion du résultat MongoDB en DataFrame
df_bucket = pd.DataFrame(list(cursor))
df_bucket.rename(columns={'_id': 'decennie'}, inplace=True)

# 2. Déplier la liste des scores pour alimenter le Box Plot
df_flat = df_bucket.explode('tous_les_scores')

# 3. Graphique en boîte à moustaches
fig_box = px.box(
    df_flat,
    x="decennie",
    y="tous_les_scores",
    points="outliers",  # Affiche les valeurs extrêmes sous forme de points
    title="Distribution des notes de films par décennie",
    labels={"decennie": "Décennie (Année de début)", "tous_les_scores": "Note (1-10)"}
)

fig_box.show()

```