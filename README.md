# Jeu de piste géolocalisé 🗺️🕵️

Petite web-app statique (sans build, sans dépendances) pour organiser des jeux de piste
de quartier sur smartphone. Le GPS guide les joueurs d'un lieu à l'autre ; chaque lieu
débloque une énigme. Score, indices progressifs (avec malus), mot-code de secours si le
GPS est capricieux, et sauvegarde automatique de la progression.

Première histoire incluse : **« Opération Caméléon »** (thème agence secrète), un parcours
de 4 lieux dans le quartier d'Etterbeek pour des enfants de 11-13 ans (~1h).

## Jouer

Ouvre l'URL de l'app sur un téléphone, autorise la géolocalisation, puis « Accepter la mission ».

> ⚠️ La géolocalisation du navigateur n'est autorisée que sur **HTTPS** (ou `localhost`).
> GitHub Pages fournit du HTTPS, c'est donc parfait.

## Structure

```
jeu-de-piste/
├── index.html                   # page unique
├── css/style.css                # thème agence secrète
├── js/engine.js                 # moteur (GPS, score, indices, progression)
├── stories/
│   └── mission-espions.js       # contenu de l'histoire (tout est ici)
├── SOLUTIONS.md                 # feuille du maître du jeu (pour le parent)
└── README.md
```

Pour ajouter une autre histoire plus tard : dupliquer le fichier dans `stories/`,
l'adapter, et pointer `index.html` dessus.

## Tester en local

```bash
python -m http.server 8765
# puis ouvrir http://localhost:8765
```

## Déployer sur GitHub Pages

1. Crée un dépôt **public** nommé `jeu-de-piste` sur https://github.com/jojodalton
2. Depuis ce dossier :
   ```bash
   git remote add origin https://github.com/jojodalton/jeu-de-piste.git
   git branch -M main
   git push -u origin main
   ```
3. Sur GitHub : **Settings → Pages → Build and deployment → Source : Deploy from a branch**,
   branche `main`, dossier `/ (root)`, puis **Save**.
4. L'app sera publiée sous quelques minutes à :
   **https://jojodalton.github.io/jeu-de-piste/**

## Personnaliser

Tout le contenu éditable est dans `stories/mission-espions.js` (lieux, énigmes, réponses,
indices, score, code final). Voir `SOLUTIONS.md` pour les détails.
