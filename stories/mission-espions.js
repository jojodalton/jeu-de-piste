/* =====================================================================
   HISTOIRE : "Mission Caméléon" — thème agence secrète
   Quartier : Etterbeek (Bruxelles)
   Public : 3 enfants, 11-13 ans, 1 équipe, ~1h
   ---------------------------------------------------------------------
   IMPORTANT (pour le parent / maître du jeu) :
   - Les énigmes s'appuient sur des éléments OBSERVABLES sur place.
   - Vérifie sur le terrain les valeurs réelles (numéro de tram, année
     gravée sur l'église, etc.) et ajuste "answers" + le chiffre du code
     si besoin. Les valeurs ci-dessous sont des hypothèses raisonnables ;
     tout est centralisé pour être modifié en 2 minutes.
   - Le code final du cadenas = concaténation des 4 chiffres trouvés.
   ===================================================================== */

var STORY = {
  id: "mission-espions",
  title: "Mission : Opération Caméléon",

  intro:
    "Agents, bienvenue à l'Agence Secrète. 🕵️<br><br>" +
    "L'espion connu sous le nom de <strong>« Le Caméléon »</strong> a caché un coffre quelque part dans le quartier. " +
    "Il est fermé par un cadenas à <strong>4 chiffres</strong>. " +
    "Chaque chiffre est dissimulé sur un lieu différent, protégé par une énigme.<br><br>" +
    "Votre mission : rejoindre chaque lieu grâce au GPS de votre appareil, résoudre les énigmes, " +
    "et reconstituer le code pour ouvrir le coffre. Vous avez environ une heure.<br><br>" +
    "Un conseil d'agent : <em>observez tout autour de vous</em>. Les réponses sont dans le décor. " +
    "Et si vous bloquez, l'Agence peut vous souffler un indice… mais ça coûte des points.",

  scoring: {
    base: 1000,        // points de départ par étape
    wrongPenalty: 50   // malus par mauvaise réponse
  },

  steps: [
    /* -------------------- ÉTAPE 1 : L'ÉGLISE -------------------- */
    {
      locationName: "Objectif 1 — La vieille église",
      travelBrief:
        "Première planque du Caméléon : l'<strong>église</strong> au sud de votre position. " +
        "Suivez le radar jusqu'à vous en approcher. Levez les yeux vers la façade en arrivant.",
      lat: 50.83139603619076,
      lon: 4.4001948970709375,
      radius: 30,
      codeWord: "cameleon", // mot-code de secours à écrire sur l'indice papier caché sur place
      fragment: "1er chiffre",
      puzzle:
        "Message du Caméléon : « Mon premier chiffre se cache dans le ciel de pierre. » 🏛️<br><br>" +
        "Observe la <strong>façade de l'église</strong> : compte le nombre de <strong>cloches visibles</strong> " +
        "dans le clocher, puis multiplie par 2.<br><br>" +
        "<em>(Astuce agent : s'il y a une seule grande cloche, la réponse est 2.)</em><br><br>" +
        "Quel est le résultat ? Ce sera le <strong>1er chiffre</strong> du code.",
      answers: ["2", "deux"],
      hints: [
        { text: "Regarde en haut du clocher, pas au niveau de la porte.", cost: 150 },
        { text: "Il n'y a qu'une seule grande cloche visible.", cost: 300 },
        { text: "1 cloche × 2 = 2. Le 1er chiffre est 2.", cost: 500 }
      ],
      successText:
        "Premier chiffre récupéré : <strong>2</strong>. Notez-le ! " +
        "Le Caméléon n'aime pas qu'on fouille ses planques… direction la suivante."
    },

    /* ---------------- ÉTAPE 2 : PLACE ST-PIERRE ---------------- */
    {
      locationName: "Objectif 2 — Place Saint-Pierre",
      travelBrief:
        "Cap au nord-ouest vers la <strong>Place Saint-Pierre</strong>. " +
        "Vous reconnaîtrez le lieu à sa <strong>fontaine</strong> et aux rails du <strong>tram</strong>.",
      lat: 50.837182594065425,
      lon: 4.396121853300444,
      radius: 30,
      codeWord: "fontaine",
      fragment: "2e chiffre",
      puzzle:
        "Message du Caméléon : « L'eau coule, mais c'est le fer qui parle. » 🚋💧<br><br>" +
        "Sur la place, trouve l'arrêt de <strong>tram</strong>. Lis le <strong>numéro de la ligne</strong> " +
        "qui s'y arrête. Additionne les deux chiffres de ce numéro.<br><br>" +
        "<em>(Exemple : si c'est le tram 81 → 8 + 1 = 9.)</em><br><br>" +
        "Le résultat est le <strong>2e chiffre</strong> du code.",
      answers: ["9", "neuf"],
      hints: [
        { text: "Cherche le panneau jaune de l'arrêt, ou le numéro sur l'avant du tram.", cost: 150 },
        { text: "La ligne qui passe ici est le tram 81.", cost: 300 },
        { text: "8 + 1 = 9. Le 2e chiffre est 9.", cost: 500 }
      ],
      successText:
        "Deuxième chiffre récupéré : <strong>9</strong>. " +
        "L'Agence détecte une activité suspecte près d'un terrain de jeu…"
    },

    /* ---------------- ÉTAPE 3 : PLACE RINSDELLE ---------------- */
    {
      locationName: "Objectif 3 — Place Rinsdelle",
      travelBrief:
        "Rendez-vous à la <strong>Place Rinsdelle</strong> : aire de <strong>jeux</strong> et " +
        "<strong>terrain de basket</strong>. Le Caméléon adore se cacher là où les enfants jouent.",
      lat: 50.83398228958402,
      lon: 4.395909340859786,
      radius: 30,
      codeWord: "panier",
      fragment: "3e chiffre",
      puzzle:
        "Message du Caméléon : « Vise le panier, mais compte avant de tirer. » 🏀<br><br>" +
        "Sur le <strong>terrain de basket</strong>, compte le nombre de <strong>paniers</strong> " +
        "(les arceaux). Multiplie ce nombre par 3.<br><br>" +
        "<em>(Un terrain classique a 2 paniers, un à chaque bout.)</em><br><br>" +
        "Le résultat est le <strong>3e chiffre</strong> du code.",
      answers: ["6", "six"],
      hints: [
        { text: "Regarde aux deux extrémités du terrain.", cost: 150 },
        { text: "Il y a 2 paniers sur le terrain.", cost: 300 },
        { text: "2 × 3 = 6. Le 3e chiffre est 6.", cost: 500 }
      ],
      successText:
        "Troisième chiffre récupéré : <strong>6</strong>. Plus qu'un ! " +
        "Le dernier indice vous ramène à votre base de départ."
    },

    /* ---------------- ÉTAPE 4 : RETOUR À LA MAISON ---------------- */
    {
      locationName: "Objectif 4 — Retour à la base",
      travelBrief:
        "Dernière ligne droite, agents : revenez à votre <strong>base de départ</strong> " +
        "(l'esplanade du Cours Saint-Michel). Le coffre du Caméléon vous y attend.",
      lat: 50.83398376008588,
      lon: 4.400402755202332,
      radius: 30,
      codeWord: "coffre",
      fragment: "4e chiffre",
      puzzle:
        "Message final du Caméléon : « Le dernier chiffre, c'est le nombre d'objectifs que vous avez visités avant celui-ci. » 🎯<br><br>" +
        "Comptez : l'église, la place Saint-Pierre, la place Rinsdelle… " +
        "Combien d'objectifs AVANT d'arriver ici ?<br><br>" +
        "Ce nombre est le <strong>4e chiffre</strong> du code.",
      answers: ["3", "trois"],
      hints: [
        { text: "Comptez les lieux où vous avez déjà résolu une énigme.", cost: 150 },
        { text: "Église (1), Saint-Pierre (2), Rinsdelle (3).", cost: 300 },
        { text: "Vous avez visité 3 objectifs avant. Le 4e chiffre est 3.", cost: 500 }
      ],
      successText:
        "Quatrième et dernier chiffre : <strong>3</strong>. " +
        "Vous avez tous les fragments du code. Assemblez-les sur le cadenas du coffre !"
    }
  ],

  victory: {
    title: "Coffre ouvert ! 🎉",
    text:
      "Félicitations, agents. Vous avez reconstitué le code et neutralisé l'Opération Caméléon.<br><br>" +
      "Entrez le code <strong>2 - 9 - 6 - 3</strong> sur le cadenas du coffre pour récupérer votre récompense. " +
      "L'Agence est fière de vous. Mission accomplie. 🕵️🏅",
    finalCode: "2963"
  }
};
