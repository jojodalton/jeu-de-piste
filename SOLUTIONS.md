# 🕵️ Mission Caméléon — Feuille du Maître du Jeu

**Pour le parent uniquement. Ne pas montrer aux enfants.**

Jeu de piste géolocalisé, quartier Etterbeek. 3 agents, 1 équipe, ~1h.
Code final du cadenas : **2 - 9 - 6 - 3**

---

## ⚠️ À VÉRIFIER SUR LE TERRAIN AVANT DE JOUER

Les énigmes s'appuient sur des éléments réels. J'ai mis des valeurs plausibles,
mais **va vérifier ces 3 points** et ajuste si besoin (voir "Comment modifier" plus bas) :

| Étape | Élément à vérifier | Hypothèse utilisée | Chiffre obtenu |
|-------|--------------------|--------------------|----------------|
| 1 Église | Nombre de cloches visibles au clocher | 1 cloche → ×2 | **2** |
| 2 Place St-Pierre | Numéro de la ligne de tram | tram **81** → 8+1 | **9** |
| 3 Place Rinsdelle | Nombre de paniers de basket | 2 paniers → ×3 | **6** |
| 4 Retour maison | Nombre d'objectifs visités avant | 3 | **3** |

Si une valeur réelle diffère (ex. le tram n'est pas le 81), **soit tu adaptes l'énigme sur le terrain,
soit tu modifies le fichier** `stories/mission-espions.js` (le chiffre du code ET le champ `answers`).
Le plus simple : choisis les 4 chiffres que tu veux, puis façonne chaque énigme pour qu'elle y mène.

---

## Parcours (ordre de jeu)

1. **Départ : Maison** — esplanade, Cours Saint-Michel (point 1)
2. → **Église** (point 4) — ~290 m
3. → **Place Saint-Pierre** (point 2), fontaine + tram — ~700 m
4. → **Place Rinsdelle** (point 3), jeux + basket — ~360 m
5. → **Retour Maison** (point 1) — ~320 m — le coffre !

Distance totale ~1,65 km. Prévoir ~1h avec les énigmes.

---

## Solutions détaillées

### Étape 1 — Église → chiffre **2**
- Énigme : nombre de cloches visibles × 2.
- Réponse attendue : **2** (1 cloche × 2).
- Indices : (1) regarde en haut du clocher — (2) il y a 1 cloche — (3) réponse = 2.
- Mot-code de secours (si le GPS ne valide pas) : **CAMELEON**

### Étape 2 — Place Saint-Pierre → chiffre **9**
- Énigme : numéro du tram, additionner ses chiffres.
- Réponse attendue : **9** (tram 81 → 8+1).
- Indices : (1) panneau d'arrêt / avant du tram — (2) c'est le 81 — (3) réponse = 9.
- Mot-code de secours : **FONTAINE**

### Étape 3 — Place Rinsdelle → chiffre **6**
- Énigme : nombre de paniers de basket × 3.
- Réponse attendue : **6** (2 paniers × 3).
- Indices : (1) regarde aux deux bouts — (2) il y a 2 paniers — (3) réponse = 6.
- Mot-code de secours : **PANIER**

### Étape 4 — Retour Maison → chiffre **3**
- Énigme : nombre d'objectifs visités avant celui-ci.
- Réponse attendue : **3**.
- Indices : (1) compte les lieux résolus — (2) église, St-Pierre, Rinsdelle — (3) réponse = 3.
- Mot-code de secours : **COFFRE**

---

## 🎁 La récompense

Cache un petit coffre / boîte à la maison (point de départ-retour) fermé par un
**cadenas à 4 chiffres réglé sur 2963**, avec la récompense dedans (bonbons, petit trésor…).
Si tu n'as pas de cadenas physique, l'app affiche le code à la fin : tu peux simplement
cacher la boîte et leur donner le code à l'écran comme "preuve" de mission réussie.

---

## 📱 Comment lancer le jeu avec les enfants

1. Ouvre le lien de l'app sur le téléphone (voir README pour l'URL une fois déployé).
2. **Autorise la géolocalisation** quand le navigateur le demande (obligatoire pour le GPS).
3. Donne le téléphone aux enfants, appuie sur **« Accepter la mission »**.
4. Le radar GPS les guide. À moins de 30 m d'un objectif, l'énigme se débloque.
5. En cas de GPS capricieux : lien **« Entrer le mot-code »** → ils tapent le mot-code
   (que tu auras éventuellement écrit sur un petit papier caché sur place).

---

## 🔧 Comment modifier le jeu

Tout le contenu est dans **un seul fichier** : `stories/mission-espions.js`.

- **Changer une énigme / réponse** : édite `puzzle`, `answers` (plusieurs variantes acceptées),
  et le chiffre correspondant dans `victory.finalCode`.
- **Changer un lieu** : édite `lat`, `lon`, `radius` (rayon de validation en mètres).
- **Régler la difficulté du score** : `scoring.base` (points par étape) et `scoring.wrongPenalty`.
- **Coût des indices** : champ `cost` de chaque indice.

Les réponses sont comparées sans tenir compte des accents, majuscules ou espaces.
