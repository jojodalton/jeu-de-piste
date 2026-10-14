/* =====================================================================
   Moteur de jeu de piste géolocalisé — indépendant du contenu.
   Le contenu est fourni par la variable globale STORY (voir stories/*.js).
   ===================================================================== */
(function () {
  "use strict";

  if (typeof STORY === "undefined") {
    document.getElementById("screen").innerHTML =
      "<div class='card'><p>Erreur : aucune histoire chargée.</p></div>";
    return;
  }

  // ---------- État ----------
  var SAVE_KEY = "jeu-de-piste:" + STORY.id;
  var state = loadState();

  var screen = document.getElementById("screen");
  var hud = document.getElementById("hud");
  var elStep = document.getElementById("hud-step");
  var elScore = document.getElementById("hud-score");
  var elTimer = document.getElementById("hud-timer");

  var geoWatchId = null;
  var timerId = null;

  // ---------- Sauvegarde ----------
  function defaultState() {
    return {
      started: false,
      finished: false,
      startTime: null,
      elapsedAtFinish: null,
      current: 0, // index de l'étape en cours (0..n-1)
      score: 0,
      perStep: STORY.steps.map(function () {
        return { points: STORY.scoring.base, hintsUsed: 0, wrong: 0, done: false };
      })
    };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(SAVE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return defaultState();
  }

  function save() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function resetGame() {
    stopGeo();
    stopTimer();
    state = defaultState();
    save();
    renderIntro();
  }

  // ---------- Utilitaires ----------
  function haversine(lat1, lon1, lat2, lon2) {
    var R = 6371000;
    var toRad = function (d) { return (d * Math.PI) / 180; };
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function normalize(s) {
    return (s || "")
      .toString()
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // enlève accents
      .replace(/[^a-z0-9]/g, ""); // enlève espaces/ponctuation
  }

  function fmtTime(ms) {
    var s = Math.floor(ms / 1000);
    var m = Math.floor(s / 60);
    s = s % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  // ---------- HUD / Timer ----------
  function updateHud() {
    hud.classList.toggle("hidden", !state.started || state.finished);
    elStep.textContent = (state.current + 1) + "/" + STORY.steps.length;
    elScore.textContent = state.score;
  }

  function startTimer() {
    stopTimer();
    timerId = setInterval(function () {
      if (!state.startTime) return;
      elTimer.textContent = fmtTime(Date.now() - state.startTime);
    }, 1000);
  }
  function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }

  // ---------- GPS ----------
  function stopGeo() {
    if (geoWatchId !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(geoWatchId);
      geoWatchId = null;
    }
  }

  // ---------- Rendu des écrans ----------
  function renderIntro() {
    stopGeo();
    updateHud();
    screen.innerHTML =
      '<div class="card">' +
      '<span class="stamp">Top Secret</span>' +
      "<h1>" + STORY.title + "</h1>" +
      "<p>" + STORY.intro + "</p>" +
      '<button class="btn btn-primary" id="btn-start">Accepter la mission</button>' +
      (state.started
        ? '<button class="btn btn-ghost" id="btn-resume">Reprendre où j\'en étais</button>'
        : "") +
      "</div>";

    document.getElementById("btn-start").onclick = function () {
      state = defaultState();
      state.started = true;
      state.startTime = Date.now();
      save();
      startTimer();
      renderStep();
    };
    var resume = document.getElementById("btn-resume");
    if (resume) {
      resume.onclick = function () {
        if (!state.startTime) state.startTime = Date.now();
        startTimer();
        if (state.finished) renderVictory();
        else renderStep();
      };
    }
  }

  function renderStep() {
    stopGeo();
    updateHud();
    var step = STORY.steps[state.current];
    var st = state.perStep[state.current];

    // Phase 1 : se rendre sur place (GPS ou mot-code)
    if (!st.arrived) {
      renderTravel(step, st);
    } else {
      // Phase 2 : énigme
      renderPuzzle(step, st);
    }
  }

  function renderTravel(step, st) {
    screen.innerHTML =
      '<div class="card">' +
      '<span class="stamp">Déplacement</span>' +
      "<h2>" + step.locationName + "</h2>" +
      "<p>" + step.travelBrief + "</p>" +
      '<div class="gps-box">' +
      '<div class="radar"></div>' +
      '<div class="gps-dist" id="gps-dist">— m</div>' +
      '<div class="gps-sub" id="gps-sub">Activation du GPS…</div>' +
      "</div>" +
      '<p class="dim" id="gps-help" style="font-size:13px"></p>' +
      '<span class="muted-link" id="link-code">GPS capricieux ? Entrer le mot-code trouvé sur place</span>' +
      '<div id="code-zone" class="hidden">' +
      '<input class="input" id="code-input" placeholder="MOT-CODE" autocomplete="off">' +
      '<button class="btn btn-ghost" id="code-submit">Valider le mot-code</button>' +
      '<div class="feedback" id="code-fb"></div>' +
      "</div>" +
      "</div>";

    document.getElementById("link-code").onclick = function () {
      document.getElementById("code-zone").classList.toggle("hidden");
    };
    document.getElementById("code-submit").onclick = function () {
      var val = normalize(document.getElementById("code-input").value);
      if (val && val === normalize(step.codeWord)) {
        arrive(step);
      } else {
        document.getElementById("code-fb").textContent = "Mot-code incorrect.";
        document.getElementById("code-fb").className = "feedback ko";
      }
    };

    startGeoWatch(step);
  }

  function startGeoWatch(step) {
    var distEl = document.getElementById("gps-dist");
    var subEl = document.getElementById("gps-sub");
    var helpEl = document.getElementById("gps-help");

    if (!navigator.geolocation) {
      subEl.textContent = "GPS indisponible sur cet appareil.";
      helpEl.textContent = "Utilise le mot-code ci-dessous.";
      return;
    }

    stopGeo();
    geoWatchId = navigator.geolocation.watchPosition(
      function (pos) {
        var d = haversine(
          pos.coords.latitude, pos.coords.longitude,
          step.lat, step.lon
        );
        var dRounded = Math.round(d);
        distEl.textContent = dRounded + " m";
        var acc = Math.round(pos.coords.accuracy || 0);

        if (d <= step.radius) {
          distEl.className = "gps-dist gps-near";
          subEl.textContent = "Tu y es ! Position confirmée.";
          arrive(step);
        } else if (d <= step.radius * 3) {
          distEl.className = "gps-dist gps-near";
          subEl.textContent = "Tu chauffes… approche encore.";
        } else {
          distEl.className = "gps-dist gps-far";
          subEl.textContent = "Continue vers l'objectif.";
        }
        helpEl.textContent = "Précision GPS ~" + acc + " m.";
      },
      function (err) {
        subEl.textContent = "GPS refusé ou indisponible.";
        helpEl.textContent = "Autorise la localisation, ou utilise le mot-code.";
      },
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 15000 }
    );
  }

  function arrive(step) {
    stopGeo();
    var st = state.perStep[state.current];
    if (st.arrived) return;
    st.arrived = true;
    save();
    renderPuzzle(step, st);
  }

  function renderPuzzle(step, st) {
    stopGeo();
    var hintsHtml = "";
    for (var i = 0; i < st.hintsUsed; i++) {
      hintsHtml +=
        '<div class="hint">' + step.hints[i].text +
        '<div class="cost">-' + step.hints[i].cost + " pts</div></div>";
    }
    var canHint = st.hintsUsed < step.hints.length;

    screen.innerHTML =
      '<div class="card">' +
      '<span class="stamp">Message intercepté</span>' +
      "<h2>" + step.locationName + "</h2>" +
      '<div class="fragment"><div class="dim">Fragment du code</div>' +
      '<div class="big">' + step.fragment + "</div></div>" +
      "<p>" + step.puzzle + "</p>" +
      '<input class="input" id="ans" placeholder="Ta réponse" autocomplete="off">' +
      '<button class="btn btn-primary" id="submit">Valider</button>' +
      '<div class="feedback" id="fb"></div>' +
      '<div id="hints">' + hintsHtml + "</div>" +
      '<button class="btn btn-warn" id="hint" ' + (canHint ? "" : "disabled") + ">" +
      (canHint
        ? "Demander un indice (-" + step.hints[st.hintsUsed].cost + " pts)"
        : "Plus d'indices disponibles") +
      "</button>" +
      "</div>";

    document.getElementById("submit").onclick = function () {
      var val = normalize(document.getElementById("ans").value);
      if (!val) return;
      var ok = step.answers.some(function (a) { return normalize(a) === val; });
      if (ok) {
        solveStep(step);
      } else {
        st.wrong++;
        st.points = Math.max(0, st.points - STORY.scoring.wrongPenalty);
        save();
        var fb = document.getElementById("fb");
        fb.textContent = "Mauvaise réponse (-" + STORY.scoring.wrongPenalty + " pts). Réessaie !";
        fb.className = "feedback ko";
      }
    };

    document.getElementById("hint").onclick = function () {
      if (st.hintsUsed >= step.hints.length) return;
      st.points = Math.max(0, st.points - step.hints[st.hintsUsed].cost);
      st.hintsUsed++;
      save();
      renderPuzzle(step, st);
    };
  }

  function solveStep(step) {
    var st = state.perStep[state.current];
    st.done = true;
    state.score += st.points;
    save();

    screen.innerHTML =
      '<div class="card">' +
      '<span class="stamp">Décrypté</span>' +
      "<h2>Bien joué, agent !</h2>" +
      "<p>" + step.successText + "</p>" +
      '<p class="dim">Points gagnés sur cette étape : <strong>' + st.points + "</strong></p>" +
      '<button class="btn btn-primary" id="next">' +
      (state.current + 1 < STORY.steps.length ? "Vers le prochain objectif" : "Terminer la mission") +
      "</button>" +
      "</div>";

    document.getElementById("next").onclick = function () {
      if (state.current + 1 < STORY.steps.length) {
        state.current++;
        save();
        renderStep();
      } else {
        state.finished = true;
        state.elapsedAtFinish = Date.now() - state.startTime;
        save();
        renderVictory();
      }
    };
    updateHud();
  }

  function gradeFor(score, maxScore) {
    var r = maxScore ? score / maxScore : 0;
    if (r >= 0.9) return "S";
    if (r >= 0.75) return "A";
    if (r >= 0.6) return "B";
    if (r >= 0.4) return "C";
    return "D";
  }

  function renderVictory() {
    stopGeo();
    stopTimer();
    hud.classList.add("hidden");

    var maxScore = STORY.scoring.base * STORY.steps.length;
    var rows = "";
    state.perStep.forEach(function (st, i) {
      rows +=
        "<tr><td>" + STORY.steps[i].locationName +
        '</td><td>' + st.points + " pts" +
        (st.hintsUsed ? " <span class='dim'>(" + st.hintsUsed + " indice" + (st.hintsUsed > 1 ? "s" : "") + ")</span>" : "") +
        "</td></tr>";
    });

    screen.innerHTML =
      '<div class="card">' +
      '<span class="stamp">Mission accomplie</span>' +
      "<h1>" + STORY.victory.title + "</h1>" +
      "<p>" + STORY.victory.text + "</p>" +
      '<div class="fragment"><div class="dim">CODE FINAL DU COFFRE</div>' +
      '<div class="big">' + STORY.victory.finalCode + "</div></div>" +
      '<div class="grade">' + gradeFor(state.score, maxScore) + "</div>" +
      '<p class="dim" style="text-align:center">Rang d\'agent</p>' +
      "<table class='recap'>" + rows +
      "<tr><td><strong>TOTAL</strong></td><td><strong>" + state.score + " / " + maxScore + "</strong></td></tr>" +
      "<tr><td>Temps</td><td>" + fmtTime(state.elapsedAtFinish || 0) + "</td></tr>" +
      "</table>" +
      '<button class="btn btn-ghost" id="replay">Rejouer</button>' +
      "</div>";

    document.getElementById("replay").onclick = resetGame;
  }

  // ---------- Démarrage ----------
  if (state.started && !state.finished) {
    // reprise automatique de session
    startTimer();
    renderStep();
  } else if (state.finished) {
    renderVictory();
  } else {
    renderIntro();
  }
})();
