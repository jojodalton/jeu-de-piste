# 🕵️ Opération Caméléon — Feuille du Maître du Jeu

**Pour le parent uniquement. Ne pas montrer aux enfants.**

Jeu de piste géolocalisé, quartier Etterbeek. 3 agents, 1 équipe, ~1h.
**Code final du cadenas : 8 - 4 - 8 - 0**

---

## Parcours (ordre de jeu = ordre des numéros de la carte)

1. **Départ : Maison** — esplanade, Cours Saint-Michel (point 1)
2. → **Place Saint-Pierre** (point 2), fontaine + tram — ~470 m
3. → **Place Rinsdelle** (point 3), jeux + basket — ~360 m
4. → **Église** (point 4) — ~290 m
5. → **Retour Maison** (point 1) — ~290 m — le coffre !

Distance totale ~1,5 km (ordre plus court que la boucle inverse). Prévoir ~1h avec les énigmes.
Carte de référence : `assets/mission-espion.png`.

---

## Conception des énigmes (important)

Règle appliquée : **l'énoncé ne révèle jamais la réponse ni le calcul**. Les enfants doivent
vraiment chercher (déchiffrer, raisonner, observer). Toute l'aide passe par les **indices
progressifs payants** (3 niveaux : coup de pouce → méthode → quasi-solution).

Les éléments réels (tram, paniers, pierres) servent d'ambiance et, pour l'étape 1, de clé.
La valeur numérique vient d'un déchiffrage/logique fiable, donc le calcul reste juste même si
le décor change un peu.

---

## Solutions détaillées

### Étape 1 — Place Saint-Pierre → chiffre **8**
- Énigme : **chiffre de César**, décalage NON donné. Mot codé `Cajwbvrbbrxw`.
- Clé du décalage : somme des chiffres du numéro de **tram 81** → 8 + 1 = **9**.
- Décodage : recule chaque lettre de 9 → **TRANSMISSION**.
- Transformation : **nombre de consonnes** du mot décodé (t, r, n, s, m, s, s, n) = **8**.
  (Exige de décoder tout le mot : ni la longueur (12), ni la 1ère lettre ne donnent la réponse ;
  il faut lire le mot entier et trier voyelles/consonnes.)
- Réponse attendue : **8**.
- Indices : (1) décalage = n° de tram (8+1=9) — (2) le mot décodé = ce que fait une radio secrète (TRANSMISSION) — (3) 8 consonnes → 8.
- Mot-code backup (donné à l'oral si blocage) : **TRANSMISSION**

### Étape 2 — Place Rinsdelle → chiffre **4**
- Énigme : devinette logique (chiffre pair, double du nombre de paniers, divisé par 2 = nb paniers).
- Résolution : 2 paniers → le chiffre est le double de 2 = **4**.
- Réponse attendue : **4**.
- Indices : (1) compte les paniers — (2) chiffre ÷ 2 = nb paniers — (3) double de 2 → 4.
- Mot-code backup : **PANIER**

### Étape 3 — Église → chiffre **8**
- Énigme : **chiffres romains** `XXIV ÷ III` (le calcul n'est PAS écrit en clair).
- Conversion : XXIV = 24, III = 3. Opération : 24 ÷ 3 = **8**.
- Réponse attendue : **8**.
- Indices : (1) I=1, V=5, X=10, règle de soustraction (IV=4) — (2) XXIV=24, III=3 — (3) 24÷3=8.
- Mot-code backup : **ROMAIN**

### Étape 4 — Retour Maison → chiffre **0**
- Énigme de **synthèse** : additionner les 3 chiffres trouvés, garder le chiffre de droite.
- Calcul : 8 + 4 + 8 = 20 → chiffre des unités = **0**.
- Réponse attendue : **0**.
- Indices : (1) additionne les 3 chiffres — (2) somme = 20 — (3) chiffre de droite de 20 = 0.
- Mot-code backup : **DEMASQUE**

---

## 🎁 La récompense

Cache un petit coffre / boîte à la maison (point de départ-retour) fermé par un
**cadenas à 4 chiffres réglé sur 8480**, avec la récompense dedans (bonbons, petit trésor…).
Si tu n'as pas de cadenas physique, l'app affiche le code à la fin : cache simplement la boîte
et donne-leur le code de l'écran comme « preuve » de mission réussie.

---

## 📱 Comment lancer le jeu avec les enfants

1. Ouvre le lien de l'app sur le téléphone (voir README pour l'URL une fois déployé).
2. **Autorise la géolocalisation** quand le navigateur le demande (obligatoire pour le GPS).
3. Donne le téléphone aux enfants, appuie sur **« Accepter la mission »**.
4. Le radar GPS les guide. À moins de 30 m d'un objectif, l'énigme se débloque.
5. **GPS capricieux ?** Le lien « Entrer le mot-code » apparaît sous le radar.
   Les mots-codes backup (TRANSMISSION, PANIER, ROMAIN, DEMASQUE) ne sont PAS cachés sur place :
   c'est **toi** qui les donnes à l'oral si l'équipe est vraiment bloquée.

---

## 🧪 Tester sans bouger (mode simulation)

Ajoute `?sim=1` à l'URL. Un bouton « SIM : simuler l'arrivée » apparaît à chaque étape
pour dérouler tout le jeu depuis le canapé.

---

## 🔧 Comment modifier le jeu

Tout le contenu est dans **un seul fichier** : `stories/mission-espions.js`.

- **Changer une énigme / réponse** : édite `puzzle`, `answers` (plusieurs variantes acceptées),
  et le chiffre correspondant dans `victory.finalCode`.
- **Changer un lieu** : édite `lat`, `lon`, `radius` (rayon de validation en mètres).
- **Régler la difficulté du score** : `scoring.base` et `scoring.wrongPenalty`.
- **Coût des indices** : champ `cost` de chaque indice.

Les réponses sont comparées sans accents, majuscules ni espaces (« Huit », « huit », « 8 » marchent).

---

## 🗺️ Image de la carte

La carte Google Maps (avec les 4 points) est dans `assets/mission-espion.png`. Elle est versionnée
avec le projet. Astuce : tu peux l'imprimer pour la garder sous la main pendant le jeu.
