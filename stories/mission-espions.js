/* =====================================================================
   HISTOIRE : "Opération Caméléon" — thème agence secrète
   Quartier : Etterbeek (Bruxelles)
   Public : 3 enfants, 11-13 ans, 1 équipe, ~1h
   Ordre de visite = ordre numérique de la carte :
     1 Maison (départ) -> 2 Place St-Pierre -> 3 Place Rinsdelle
     -> 4 Église -> retour 1 Maison (coffre)
   ---------------------------------------------------------------------
   PRINCIPE DE CONCEPTION (lis-moi) :
   - Chaque énigme = un ANCRAGE narratif/visuel au lieu + UNE transformation
     logique PROPRE qui tombe EXACTEMENT sur le chiffre voulu.
   - On ne force pas des valeurs de terrain incertaines : la valeur numérique
     vient d'un petit déchiffrage/logique fiable, le lieu donne l'ambiance et
     un ou deux indices d'observation facultatifs.
   - Mots-codes "backup" = donnés À L'ORAL par le maître du jeu si blocage
     (GPS KO, etc.). Ils ne sont PAS cachés sur place.
   - L'énoncé NE révèle JAMAIS la réponse ni le calcul : toute aide passe par
     les indices progressifs (payants). Les textes de réussite ne montrent plus
     le chiffre, pour ne pas spoiler le code final.
   - Code final du cadenas = 8 - 4 - 8 - 0  (étape 4 = synthèse des trois autres,
     donc non devinable partiellement).
     Étape1 César(FONTAINE,8) · Étape2 logique(4) · Étape3 romain(24/3=8) · Étape4 (8+4+8=20→0)
   ===================================================================== */

var STORY = {
  id: "mission-espions",
  title: "Opération Caméléon",

  intro:
    "Agence Secrète — transmission cryptée. 🕵️<br><br>" +
    "Agents, l'ennemi que nous traquons se fait appeler <strong>« Le Caméléon »</strong>. " +
    "Maître du déguisement, il a planqué un coffre scellé par un <strong>cadenas à 4 chiffres</strong> " +
    "près de votre base.<br><br>" +
    "Il a dispersé les 4 chiffres sur 4 lieux du quartier, chacun protégé par une énigme. " +
    "Rien n'est écrit en clair : il faudra <strong>observer les lieux</strong> ET <strong>déchiffrer</strong>.<br><br>" +
    "Le GPS de cet appareil vous guide. Vous avez environ une heure. " +
    "Si vous êtes vraiment coincés, l'Agence (le maître du jeu) peut vous souffler un indice — " +
    "mais chaque indice vous coûte des points.<br><br>" +
    "Devise de l'Agence : <em>regarde deux fois, déduis une fois</em>.",

  scoring: {
    base: 1000,
    wrongPenalty: 75
  },

  steps: [
    /* ---------------- ÉTAPE 1 : PLACE SAINT-PIERRE ----------------
       Ancrage : le tram (ligne 81) donne le décalage César (8+1=9).
       Déchiffrage : "Cajwbvrbbrxw" -(9)-> TRANSMISSION.
       Réponse = nombre de CONSONNES du mot décodé = 8.
       (Exige de décoder tout le mot : ni la longueur (12) ni la 1ère lettre
       ne donnent la réponse ; il faut lire le mot entier et trier.)
       Chiffre visé : 8. */
    {
      locationName: "Objectif 1 — Place Saint-Pierre",
      travelBrief:
        "Premier relais : la <strong>Place Saint-Pierre</strong>, au nord-ouest, reconnaissable à sa " +
        "<strong>fontaine</strong> et aux rails du <strong>tram</strong>. Un agent dormant y a laissé un mot codé.",
      lat: 50.837182594065425,
      lon: 4.396121853300444,
      radius: 30,
      codeWord: "transmission",
      fragment: "1er chiffre",
      puzzle:
        "L'agent dormant a laissé un mot codé sur le banc. Le Caméléon brouille toujours ses messages " +
        "en <strong>décalant chaque lettre d'un même nombre de rangs</strong> dans l'alphabet.<br><br>" +
        "<strong style='font-size:22px; letter-spacing:3px'>Cajwbvrbbrxw</strong><br><br>" +
        "Pour trouver de combien les lettres ont été décalées, regarde <strong>autour de toi sur la place</strong> : " +
        "un <strong>véhicule sur rails</strong> porte un numéro à deux chiffres… additionne-les, c'est ton décalage.<br><br>" +
        "Décode le mot en entier. Puis trouve ta réponse : <strong>combien de CONSONNES contient le mot décodé ?</strong> " +
        "(les consonnes = toutes les lettres sauf a, e, i, o, u, y) Ce nombre est le <strong>1er chiffre</strong> du code.",
      answers: ["8", "huit"],
      hints: [
        { text: "Le décalage se lit dans le quartier : le numéro de la ligne de tram qui s'arrête ici. Additionne ses deux chiffres.", cost: 150 },
        { text: "Recule chaque lettre d'autant de rangs que ce total. Le mot décodé est un terme d'espion : ce que fait une radio secrète.", cost: 300 },
        { text: "Le mot est TRANSMISSION. Compte ses consonnes (t, r, n, s, m, s, s, n) : il y en a 8.", cost: 500 }
      ],
      successText:
        "1er chiffre verrouillé. Notez-le dans votre carnet d'agent. " +
        "Le Caméléon a été repéré près d'un terrain de jeu. Prochain arrêt : là où les enfants s'amusent."
    },

    /* ---------------- ÉTAPE 2 : PLACE RINSDELLE ----------------
       Ancrage : terrain de basket (2 paniers) + aire de jeux.
       Logique PROPRE : 2 paniers x 2 - une opération simple.
       Chiffre visé : 4. */
    {
      locationName: "Objectif 2 — Place Rinsdelle",
      travelBrief:
        "Cap sur la <strong>Place Rinsdelle</strong> : aire de <strong>jeux</strong> et <strong>terrain de basket</strong>. " +
        "Le Caméléon adore se fondre parmi les enfants qui jouent.",
      lat: 50.83398228958402,
      lon: 4.395909340859786,
      radius: 30,
      codeWord: "panier",
      fragment: "2e chiffre",
      puzzle:
        "Message gravé sous un banc, près du terrain de basket : 🏀<br><br>" +
        "<em>« Sur ce terrain, deux cibles se font face. " +
        "Mon chiffre est pair. Il est plus grand que le nombre de ces cibles, mais plus petit que leur somme avec elles-mêmes. " +
        "Et si tu me divises par deux, tu retrouves exactement le nombre de cibles. »</em><br><br>" +
        "Quel est ce <strong>2e chiffre</strong> du code ?",
      answers: ["4", "quatre"],
      hints: [
        { text: "Compte d'abord les « cibles » : les paniers du terrain. Il t'en faut le nombre exact.", cost: 150 },
        { text: "Le chiffre cherché, divisé par deux, redonne le nombre de paniers.", cost: 300 },
        { text: "Avec 2 paniers : un chiffre pair qui vaut le double de 2.", cost: 500 }
      ],
      successText:
        "2e chiffre verrouillé. Deux fragments en poche. " +
        "L'Agence a capté un signal venant d'un vieux bâtiment de pierre, au sud : une église."
    },

    /* -------------------- ÉTAPE 3 : L'ÉGLISE --------------------
       Ancrage : vieilles pierres -> chiffres romains.
       Déchiffrage PROPRE : X - I = 9.
       Chiffre visé : 9. */
    {
      locationName: "Objectif 3 — La vieille église",
      travelBrief:
        "Direction l'<strong>église</strong>, plus au sud. Les vieilles pierres gardent des secrets, " +
        "et les anciens n'écrivaient pas les nombres comme nous.",
      lat: 50.83139603619076,
      lon: 4.4001948970709375,
      radius: 30,
      codeWord: "romain",
      fragment: "3e chiffre",
      puzzle:
        "Parchemin du Caméléon : <em>« Les anciens n'écrivaient pas les nombres comme toi. " +
        "Lis le mien, et tu auras ton chiffre. »</em> ⛪🏛️<br><br>" +
        "L'inscription est en <strong>chiffres romains</strong> :<br><br>" +
        "<strong style='font-size:26px; letter-spacing:5px'>XXIV &divide; III</strong><br><br>" +
        "Convertis chaque nombre romain, effectue l'opération (&divide; = divisé par), " +
        "et tu obtiens le <strong>3e chiffre</strong> du code.",
      answers: ["8", "huit"],
      hints: [
        { text: "Les repères utiles : I = 1, V = 5, X = 10. Un petit signe placé AVANT un plus grand se soustrait (IV = 4).", cost: 150 },
        { text: "XXIV = 20 + 4. III = 3. Il reste à diviser l'un par l'autre.", cost: 300 },
        { text: "24 ÷ 3 = 8. Le 3e chiffre est 8.", cost: 500 }
      ],
      successText:
        "3e chiffre verrouillé. Trois fragments ! " +
        "Le dernier signal provient de votre propre base… Le Caméléon vous a suivis depuis le début. Rentrez vite."
    },

    /* ---------------- ÉTAPE 4 : RETOUR À LA MAISON ----------------
       Ancrage : la base, confrontation finale.
       Logique PROPRE de SYNTHÈSE : combine les 3 chiffres trouvés.
       8 + 4 + 9 = 21 -> chiffre des unités = 1.
       Chiffre visé : 1. */
    {
      locationName: "Objectif 4 — Retour à la base",
      travelBrief:
        "Dernière ligne droite : revenez à votre <strong>base de départ</strong> " +
        "(l'esplanade du Cours Saint-Michel). Le coffre du Caméléon y est caché.",
      lat: 50.83398376008588,
      lon: 4.400402755202332,
      radius: 30,
      codeWord: "demasque",
      fragment: "4e chiffre",
      puzzle:
        "Dernier message, signé Le Caméléon : <em>« Bien joué, agents. Mais le dernier chiffre, " +
        "je l'ai caché dans les trois que vous tenez déjà. »</em> 🦎<br><br>" +
        "Reprends ton carnet : tu as noté trois chiffres, dans l'ordre.<br><br>" +
        "<strong>Additionne-les tous les trois. Si ton total dépasse 9, garde seulement son chiffre de droite.</strong><br><br>" +
        "Le résultat est le <strong>4e et dernier chiffre</strong> du code.",
      answers: ["0", "zero"],
      hints: [
        { text: "Relis les trois chiffres trouvés aux objectifs précédents et additionne-les.", cost: 150 },
        { text: "La somme des trois chiffres fait vingt tout rond.", cost: 300 },
        { text: "Dans « 20 », le chiffre de droite est 0. Le 4e chiffre est 0.", cost: 500 }
      ],
      successText:
        "4e chiffre verrouillé. Vous avez les quatre fragments. " +
        "Composez le code sur le cadenas du coffre !"
    }
  ],

  victory: {
    title: "Coffre ouvert ! 🎉",
    text:
      "Mission accomplie, agents. Le Caméléon est démasqué et son coffre est à vous.<br><br>" +
      "Composez le code <strong>8 - 4 - 8 - 0</strong> sur le cadenas pour récupérer votre récompense. " +
      "L'Agence Secrète vous décerne le grade d'agents d'élite. 🕵️🏅",
    finalCode: "8480"
  }
};
