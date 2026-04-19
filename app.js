const LEGACY_STORAGE_KEY = "lays-quiniela-2026";
const STORAGE_KEY = "lays-quiniela-2026-v2";
const LAYS_LOGO_URL = "https://upload.wikimedia.org/wikipedia/commons/6/67/Lay%27s_logo_2019.svg";
const WC_LOGO_URL = "https://digitalhub.fifa.com/transform/157d23bf-7e13-4d7b-949e-5d27d340987e/WC26_Logo?&io=transform:fill,height:210&quality=75";
const DEPARTMENTS = ["Finanzas", "Operaciones", "Marketing", "Ventas", "HR", "Legal", "IT"];

const GROUPS = {
  A: ["Mexico", "South Africa", "Korea Republic", "Czechia"],
  B: ["Canada", "Bosnia and Herzegovina", "Qatar", "Switzerland"],
  C: ["Brazil", "Morocco", "Haiti", "Scotland"],
  D: ["USA", "Paraguay", "Australia", "Turkiye"],
  E: ["Germany", "Curacao", "Cote d'Ivoire", "Ecuador"],
  F: ["Netherlands", "Japan", "Sweden", "Tunisia"],
  G: ["Belgium", "Egypt", "Iran", "New Zealand"],
  H: ["Spain", "Cape Verde", "Saudi Arabia", "Uruguay"],
  I: ["France", "Senegal", "Iraq", "Norway"],
  J: ["Argentina", "Algeria", "Austria", "Jordan"],
  K: ["Portugal", "DR Congo", "Uzbekistan", "Colombia"],
  L: ["England", "Croatia", "Ghana", "Panama"]
};

const TEAM_FLAGS = {
  "Mexico": "🇲🇽",
  "South Africa": "🇿🇦",
  "Korea Republic": "🇰🇷",
  "Czechia": "🇨🇿",
  "Canada": "🇨🇦",
  "Bosnia and Herzegovina": "🇧🇦",
  "Qatar": "🇶🇦",
  "Switzerland": "🇨🇭",
  "Brazil": "🇧🇷",
  "Morocco": "🇲🇦",
  "Haiti": "🇭🇹",
  "Scotland": "🏴",
  "USA": "🇺🇸",
  "Paraguay": "🇵🇾",
  "Australia": "🇦🇺",
  "Turkiye": "🇹🇷",
  "Germany": "🇩🇪",
  "Curacao": "🇨🇼",
  "Cote d'Ivoire": "🇨🇮",
  "Ecuador": "🇪🇨",
  "Netherlands": "🇳🇱",
  "Japan": "🇯🇵",
  "Sweden": "🇸🇪",
  "Tunisia": "🇹🇳",
  "Belgium": "🇧🇪",
  "Egypt": "🇪🇬",
  "Iran": "🇮🇷",
  "New Zealand": "🇳🇿",
  "Spain": "🇪🇸",
  "Cape Verde": "🇨🇻",
  "Saudi Arabia": "🇸🇦",
  "Uruguay": "🇺🇾",
  "France": "🇫🇷",
  "Senegal": "🇸🇳",
  "Iraq": "🇮🇶",
  "Norway": "🇳🇴",
  "Argentina": "🇦🇷",
  "Algeria": "🇩🇿",
  "Austria": "🇦🇹",
  "Jordan": "🇯🇴",
  "Portugal": "🇵🇹",
  "DR Congo": "🇨🇩",
  "Uzbekistan": "🇺🇿",
  "Colombia": "🇨🇴",
  "England": "🏴",
  "Croatia": "🇭🇷",
  "Ghana": "🇬🇭",
  "Panama": "🇵🇦"
};

const GROUP_DATES = [
  "2026-06-11", "2026-06-12", "2026-06-13", "2026-06-14", "2026-06-15", "2026-06-16",
  "2026-06-17", "2026-06-18", "2026-06-19", "2026-06-20", "2026-06-21", "2026-06-22",
  "2026-06-23", "2026-06-24", "2026-06-25", "2026-06-26", "2026-06-27"
];

const VENUES = [
  "Mexico City", "Guadalajara", "Toronto", "Los Angeles", "Vancouver", "San Francisco Bay Area",
  "New York New Jersey", "Boston", "Houston", "Monterrey", "Dallas", "Philadelphia",
  "Kansas City", "Miami", "Atlanta", "Seattle"
];

const KNOCKOUT_TEMPLATE = [
  ["r32-1", "Round of 32", "2A", "2B"],
  ["r32-2", "Round of 32", "1E", "3A/B/C/D/F"],
  ["r32-3", "Round of 32", "1F", "2C"],
  ["r32-4", "Round of 32", "1C", "2F"],
  ["r32-5", "Round of 32", "1I", "3C/D/F/G/H"],
  ["r32-6", "Round of 32", "2E", "2I"],
  ["r32-7", "Round of 32", "1A", "3C/E/F/H/I"],
  ["r32-8", "Round of 32", "1L", "3E/H/I/J/K"],
  ["r32-9", "Round of 32", "1D", "3B/E/F/I/J"],
  ["r32-10", "Round of 32", "1G", "3A/E/H/I/J"],
  ["r32-11", "Round of 32", "1B", "3E/F/G/I/J"],
  ["r32-12", "Round of 32", "1J", "2H"],
  ["r32-13", "Round of 32", "1H", "2J"],
  ["r32-14", "Round of 32", "1K", "3D/E/I/J/L"],
  ["r32-15", "Round of 32", "2D", "2G"],
  ["r32-16", "Round of 32", "2K", "2L"]
];

const ROUNDS = [
  { key: "r32", label: "Round of 32", size: 16 },
  { key: "r16", label: "Round of 16", size: 8 },
  { key: "qf", label: "Quarterfinals", size: 4 },
  { key: "sf", label: "Semifinals", size: 2 },
  { key: "third", label: "Third Place", size: 1 },
  { key: "final", label: "Final", size: 1 }
];

const state = loadState();
const app = document.querySelector("#app");

let currentTab = "predictions";
let authMode = "login";
let matchFilter = "A";

function initialState() {
  return {
    session: null,
    users: {},
    realResults: {},
    toast: null,
    lastUpdated: new Date().toISOString()
  };
}

function loadState() {
  try {
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    return { ...initialState(), ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return initialState();
  }
}

function saveState() {
  try {
    state.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

function fixtures() {
  const games = [];
  let number = 1;
  Object.entries(GROUPS).forEach(([group, teams], groupIndex) => {
    const pairings = [[0, 1], [2, 3], [0, 2], [3, 1], [3, 0], [1, 2]];
    pairings.forEach(([homeIndex, awayIndex], matchIndex) => {
      games.push({
        id: `g-${group}-${matchIndex + 1}`,
        number: number++,
        stage: "Group",
        group,
        date: GROUP_DATES[(groupIndex + Math.floor(matchIndex / 2) * 6) % GROUP_DATES.length],
        venue: VENUES[(groupIndex * 2 + matchIndex) % VENUES.length],
        home: teams[homeIndex],
        away: teams[awayIndex]
      });
    });
  });
  return games;
}

const GROUP_FIXTURES = fixtures();

function currentUser() {
  return state.session ? state.users[state.session] : null;
}

function displayName(user) {
  return [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.name || user?.email || "";
}

function setToast(type, message) {
  state.toast = { type, message, at: new Date().toISOString() };
}

function flagFor(team) {
  return TEAM_FLAGS[team] || "🏳";
}

function renderFlag(team, extraClass = "") {
  return `<span class="flag-circle tooltip-target ${extraClass}" title="${escapeHtml(team)}" aria-label="${escapeHtml(team)}" data-tooltip="${escapeHtml(team)}" tabindex="0">${flagFor(team)}</span>`;
}

function renderVenezuelaMark() {
  return `
    <span class="venezuela-mark" aria-label="Venezuela">
      <svg viewBox="0 0 64 64" role="img" aria-hidden="true">
        <defs><clipPath id="vz-clip"><circle cx="32" cy="32" r="31" /></clipPath></defs>
        <g clip-path="url(#vz-clip)">
          <rect width="64" height="21.34" y="0" fill="#f4d000" />
          <rect width="64" height="21.34" y="21.34" fill="#003f8e" />
          <rect width="64" height="21.34" y="42.68" fill="#cf142b" />
        </g>
        <g fill="#fff" font-size="6" text-anchor="middle">
          <text x="17" y="35">★</text><text x="21" y="30">★</text><text x="27" y="27">★</text><text x="34" y="27">★</text><text x="40" y="30">★</text><text x="45" y="35">★</text><text x="31" y="36">★</text><text x="37" y="36">★</text>
        </g>
        <circle cx="32" cy="32" r="31" fill="none" stroke="rgba(0,32,91,.18)" stroke-width="2" />
      </svg>
    </span>
  `;
}

async function digest(value) {
  if (!globalThis.crypto?.subtle) {
    let hash = 5381;
    for (let index = 0; index < value.length; index += 1) {
      hash = ((hash << 5) + hash) + value.charCodeAt(index);
      hash = hash >>> 0;
    }
    return String(hash);
  }
  const data = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function defaultUser(email, name) {
  const firstName = name || email.split("@")[0];
  return {
    email,
    firstName,
    lastName: "",
    phone: "",
    name: firstName,
    department: "Marketing",
    passwordHash: "",
    predictions: {},
    createdAt: new Date().toISOString()
  };
}

function resultOutcome(result) {
  if (!isCompleteScore(result)) return null;
  if (Number(result.homeGoals) > Number(result.awayGoals)) return "home";
  if (Number(result.homeGoals) < Number(result.awayGoals)) return "away";
  return result.winner || "draw";
}

function isCompleteScore(result) {
  return result && result.homeGoals !== "" && result.awayGoals !== "" && result.homeGoals !== undefined && result.awayGoals !== undefined;
}

function pickWinner(match, result) {
  if (!isCompleteScore(result)) return null;
  const home = Number(result.homeGoals);
  const away = Number(result.awayGoals);
  if (home > away) return match.home;
  if (away > home) return match.away;
  if (result.winner === "home") return match.home;
  if (result.winner === "away") return match.away;
  return null;
}

function scorePrediction(prediction, real, predictedMatch, realMatch) {
  if (!isCompleteScore(prediction) || !isCompleteScore(real)) return 0;
  if (predictedMatch && realMatch) {
    const sameHome = predictedMatch.home === realMatch.home;
    const sameAway = predictedMatch.away === realMatch.away;
    if (!sameHome || !sameAway) return 0;
  }
  const exact = Number(prediction.homeGoals) === Number(real.homeGoals) && Number(prediction.awayGoals) === Number(real.awayGoals);
  const sameOutcome = resultOutcome(prediction) === resultOutcome(real);
  if (exact && sameOutcome) return 3;
  if (sameOutcome) return 1;
  return 0;
}

function calculateGroupTables(sourceResults) {
  const tables = {};
  Object.entries(GROUPS).forEach(([group, teams]) => {
    tables[group] = teams.map((team) => ({ team, group, played: 0, points: 0, gf: 0, ga: 0, gd: 0, wins: 0 }));
  });

  GROUP_FIXTURES.forEach((match) => {
    const result = sourceResults[match.id];
    if (!isCompleteScore(result)) return;
    const home = tables[match.group].find((row) => row.team === match.home);
    const away = tables[match.group].find((row) => row.team === match.away);
    const hg = Number(result.homeGoals);
    const ag = Number(result.awayGoals);
    home.played += 1;
    away.played += 1;
    home.gf += hg;
    home.ga += ag;
    away.gf += ag;
    away.ga += hg;
    home.gd = home.gf - home.ga;
    away.gd = away.gf - away.ga;
    if (hg > ag) {
      home.points += 3;
      home.wins += 1;
    } else if (ag > hg) {
      away.points += 3;
      away.wins += 1;
    } else {
      home.points += 1;
      away.points += 1;
    }
  });

  Object.values(tables).forEach((rows) => {
    rows.sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf || b.wins - a.wins || a.team.localeCompare(b.team));
  });

  return tables;
}

function bestThirds(tables) {
  return Object.values(tables)
    .map((rows) => rows[2])
    .filter(Boolean)
    .sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf || a.team.localeCompare(b.team))
    .slice(0, 8);
}

function resolveSeed(seed, tables, thirds) {
  if (/^[12][A-L]$/.test(seed)) {
    const place = Number(seed[0]) - 1;
    return tables[seed[1]]?.[place]?.team || seed;
  }
  if (seed.startsWith("3")) {
    const allowed = seed.slice(1).split("/").filter(Boolean);
    const selected = thirds.find((row) => allowed.includes(row.group));
    return selected?.team || `Best ${seed}`;
  }
  return seed;
}

function buildKnockoutMatches(sourceResults, knockoutResults = {}) {
  const tables = calculateGroupTables(sourceResults);
  const thirds = bestThirds(tables);
  const matches = [];
  const winners = {};
  const semifinalLosers = [];
  const roundOf32Dates = ["2026-06-28", "2026-06-29", "2026-06-30", "2026-07-01", "2026-07-02", "2026-07-03"];

  KNOCKOUT_TEMPLATE.forEach(([id, stage, homeSeed, awaySeed], index) => {
    const match = {
      id,
      number: 73 + index,
      stage,
      home: resolveSeed(homeSeed, tables, thirds),
      away: resolveSeed(awaySeed, tables, thirds),
      date: roundOf32Dates[Math.floor(index / 3)] || "2026-07-03",
      venue: VENUES[(index + 3) % VENUES.length]
    };
    matches.push(match);
    winners[id] = pickWinner(match, knockoutResults[id]);
  });

  const buildRound = (roundKey, label, previousMatches, startNumber, datePrefix) => {
    const built = [];
    for (let index = 0; index < previousMatches.length; index += 2) {
      const home = winners[previousMatches[index].id] || `Winner ${previousMatches[index].number}`;
      const away = winners[previousMatches[index + 1].id] || `Winner ${previousMatches[index + 1].number}`;
      const id = `${roundKey}-${index / 2 + 1}`;
      const match = {
        id,
        number: startNumber + index / 2,
        stage: label,
        home,
        away,
        date: datePrefix,
        venue: VENUES[(startNumber + index) % VENUES.length]
      };
      built.push(match);
      const winner = pickWinner(match, knockoutResults[id]);
      winners[id] = winner;
      if (roundKey === "sf") {
        const loser = winner === home ? away : winner === away ? home : null;
        semifinalLosers.push(loser);
      }
    }
    matches.push(...built);
    return built;
  };

  const r32 = matches.filter((match) => match.id.startsWith("r32"));
  const r16 = buildRound("r16", "Round of 16", r32, 89, "2026-07-04");
  const qf = buildRound("qf", "Quarterfinals", r16, 97, "2026-07-09");
  const sf = buildRound("sf", "Semifinals", qf, 101, "2026-07-14");

  const third = {
    id: "third-1",
    number: 103,
    stage: "Third Place",
    home: semifinalLosers[0] || "Loser 101",
    away: semifinalLosers[1] || "Loser 102",
    date: "2026-07-18",
    venue: "Miami"
  };
  matches.push(third);

  const final = {
    id: "final-1",
    number: 104,
    stage: "Final",
    home: winners[sf[0]?.id] || "Winner 101",
    away: winners[sf[1]?.id] || "Winner 102",
    date: "2026-07-19",
    venue: "New York New Jersey"
  };
  matches.push(final);

  return matches;
}

function allMatchesForUser(user) {
  return [...GROUP_FIXTURES, ...buildKnockoutMatches(user.predictions, user.predictions)];
}

function realKnockoutMatches() {
  return buildKnockoutMatches(state.realResults, state.realResults);
}

function leaderboard() {
  return Object.values(state.users).map((user) => {
    return { ...user, ...userScoreStats(user) };
  }).sort((a, b) => b.points - a.points || b.exact - a.exact || displayName(a).localeCompare(displayName(b)));
}

function userScoreStats(user) {
  const realKnockouts = realKnockoutMatches();
  const realMap = Object.fromEntries([...GROUP_FIXTURES, ...realKnockouts].map((match) => [match.id, match]));
  const predictedMatches = allMatchesForUser(user);
  const predictedMap = Object.fromEntries(predictedMatches.map((match) => [match.id, match]));

  return Object.entries(state.realResults).reduce((stats, [matchId, real]) => {
    if (!isCompleteScore(real)) return stats;
    const score = scorePrediction(user.predictions[matchId], real, predictedMap[matchId], realMap[matchId]);
    stats.points += score;
    if (score === 3) stats.exact += 1;
    if (score === 1) stats.correct += 1;
    if (score === 0) stats.missed += 1;
    return stats;
  }, { points: 0, exact: 0, correct: 0, missed: 0 });
}

function departmentLeaderboard(rows) {
  const teams = {};
  rows.forEach((row) => {
    const department = row.department || "Sin departamento";
    teams[department] = teams[department] || { department, people: 0, points: 0, exact: 0 };
    teams[department].people += 1;
    teams[department].points += row.points;
    teams[department].exact += row.exact;
  });
  return Object.values(teams)
    .map((team) => ({ ...team, average: team.people ? team.points / team.people : 0 }))
    .sort((a, b) => b.average - a.average || b.points - a.points || a.department.localeCompare(b.department));
}

function render() {
  const user = currentUser();
  if (!user) {
    renderAuth();
    return;
  }
  const matches = currentTab === "predictions" ? filteredGroupMatches() : allMatchesForUser(user).filter((match) => match.stage !== "Group");
  const leaders = leaderboard();
  const userRank = leaders.findIndex((row) => row.email === user.email) + 1;
  const champion = pickWinner(allMatchesForUser(user).find((match) => match.id === "final-1") || {}, user.predictions["final-1"]);

  app.innerHTML = `
    <div class="app-shell">
      <section class="hero">
        <div class="topbar">
          <div class="brand-lockup">
            <img class="brand-logo lays-logo" src="${LAYS_LOGO_URL}" alt="Lay's" />
            <div class="wc-badge"><img src="${WC_LOGO_URL}" alt="FIFA World Cup 2026" /></div>
            <div class="brand-copy"><strong>PepsiCo Quiniela</strong><span>FIFA World Cup 2026</span></div>
          </div>
          <div class="account-chip">
            <span>${escapeHtml(displayName(user))}</span>
            <button class="icon-btn" data-action="profile" title="Perfil" aria-label="Perfil"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Zm-7.2 8c.7-3.5 3.5-5.6 7.2-5.6s6.5 2.1 7.2 5.6" /></svg></button>
            <button class="icon-btn" data-action="logout" title="Salir" aria-label="Salir"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 6H5.8A1.8 1.8 0 0 0 4 7.8v8.4A1.8 1.8 0 0 0 5.8 18H10M15 8l4 4-4 4M19 12H9" /></svg></button>
          </div>
        </div>
        <div class="hero-content">
          <div>
            ${renderVenezuelaMark()}
            <h1>Quiniela Mundial 2026</h1>
            <p>Pronostica cada marcador, arma tus llaves automaticamente y mira como se mueve el ranking de la empresa con cada resultado oficial.</p>
          </div>
          <div class="score-card">
            <h2>Tu tablero</h2>
            <div class="metric-row">
              <div class="metric"><b>${completedCount(user.predictions)}</b><span>Predicciones</span></div>
              <div class="metric"><b>${userRank || "-"}</b><span>Ranking</span></div>
              <div class="metric"><b>${champion || "-"}</b><span>Campeon</span></div>
            </div>
          </div>
        </div>
      </section>
      <nav class="tabs">
        ${tabButton("predictions", "Partidos")}
        ${tabButton("bracket", "Llaves")}
        ${tabButton("leaderboard", "Ranking")}
        ${tabButton("results", "Resultados")}
      </nav>
      <section class="content">
        ${state.toast ? `<div class="toast ${state.toast.type}">${escapeHtml(state.toast.message)}</div>` : ""}
        ${currentTab === "leaderboard" ? renderLeaderboard(leaders) : ""}
        ${currentTab === "results" ? renderResults() : ""}
        ${currentTab === "profile" ? renderProfile(user, leaders, userRank) : ""}
        ${currentTab === "predictions" || currentTab === "bracket" ? `
          <div class="${currentTab === "bracket" ? "bracket-layout" : "app-grid"}">
            <div class="panel">
              <div class="panel-head">
                <div>
                  <h2>${currentTab === "predictions" ? "Fase de grupos" : "Llaves simuladas"}</h2>
                  <p class="panel-subtitle">${currentTab === "predictions" ? "Elige un grupo y carga marcadores. La tabla y los mejores terceros se actualizan al instante." : "Estos cruces salen de tus resultados de grupos. Si hay empate, elige quien avanza por penales."}</p>
                </div>
                ${currentTab === "predictions" ? renderFilters() : '<button class="primary-btn" data-action="save">Guardar</button>'}
              </div>
              ${currentTab === "predictions"
                ? `${renderProgress(`Grupo ${matchFilter}`, completedForMatches(matches, user.predictions), matches.length)}${renderMatches(matches, user.predictions, "prediction")}`
                : `${renderProgress("Progreso de llaves", completedForMatches(matches, user.predictions), matches.length)}${renderBracket(matches, user.predictions, "prediction")}`}
            </div>
            ${currentTab === "predictions" ? renderSimulatedGroups(user.predictions) : ""}
          </div>` : ""}
      </section>
    </div>
  `;
  bindEvents();
}

function tabButton(tab, label) {
  return `<button class="tab-btn ${currentTab === tab ? "active" : ""}" data-tab="${tab}">${label}</button>`;
}

function filteredGroupMatches() {
  return GROUP_FIXTURES.filter((match) => match.group === matchFilter);
}

function renderFilters() {
  return `
    <div class="toolbar">
      ${renderGroupSelector()}
      <button class="primary-btn" data-action="save">Guardar</button>
    </div>
  `;
}

function renderGroupSelector() {
  return `
    <label class="group-select-label">
      <span>Grupo</span>
      <select class="select group-select" data-group-select aria-label="Seleccionar grupo">
        ${Object.keys(GROUPS).map((group) => `<option value="${group}" ${matchFilter === group ? "selected" : ""}>Grupo ${group}</option>`).join("")}
      </select>
    </label>
  `;
}

function renderMatches(matches, resultStore, mode) {
  if (!matches.length) return '<div class="empty">No hay partidos para mostrar.</div>';
  return `<div class="match-list">${matches.map((match) => renderMatch(match, resultStore[match.id] || {}, mode)).join("")}</div>`;
}

function renderBracket(matches, resultStore, mode = "prediction") {
  const r32 = matches.filter((match) => match.id.startsWith("r32"));
  const r16 = matches.filter((match) => match.id.startsWith("r16"));
  const qf = matches.filter((match) => match.id.startsWith("qf"));
  const sf = matches.filter((match) => match.id.startsWith("sf"));
  const third = matches.filter((match) => match.id.startsWith("third"));
  const final = matches.filter((match) => match.id.startsWith("final"));
  return `
    <div class="split-bracket">
      <div class="bracket-side left">
        ${renderBracketColumn("Round of 32", r32.slice(0, 8), resultStore, mode)}
        ${renderBracketColumn("Round of 16", r16.slice(0, 4), resultStore, mode)}
        ${renderBracketColumn("Quarterfinals", qf.slice(0, 2), resultStore, mode)}
        ${renderBracketColumn("Semifinal", sf.slice(0, 1), resultStore, mode)}
      </div>
      <div class="bracket-center">
        ${renderBracketColumn("Final", final, resultStore, mode)}
        ${renderBracketColumn("Third Place", third, resultStore, mode)}
      </div>
      <div class="bracket-side right">
        ${renderBracketColumn("Semifinal", sf.slice(1, 2), resultStore, mode)}
        ${renderBracketColumn("Quarterfinals", qf.slice(2, 4), resultStore, mode)}
        ${renderBracketColumn("Round of 16", r16.slice(4, 8), resultStore, mode)}
        ${renderBracketColumn("Round of 32", r32.slice(8, 16), resultStore, mode)}
      </div>
    </div>
  `;
}

function renderBracketColumn(label, matches, resultStore, mode) {
  return `
    <section class="bracket-column">
      <h3>${label}</h3>
      <div class="bracket-stack">
        ${matches.length ? matches.map((match) => renderBracketMatch(match, resultStore[match.id] || {}, mode)).join("") : '<div class="empty compact-empty">Pendiente</div>'}
      </div>
    </section>
  `;
}

function renderBracketMatch(match, result, mode) {
  const homeWinner = pickWinner(match, result) === match.home;
  const awayWinner = pickWinner(match, result) === match.away;
  const winnerNeeded = Number(result.homeGoals) === Number(result.awayGoals) && isCompleteScore(result);
  return `
    <article class="bracket-match" data-match-id="${match.id}" data-mode="${mode}">
      <div class="bracket-meta">#${match.number} · ${formatDate(match.date)}</div>
      <label class="bracket-team flag-only ${homeWinner ? "winner" : ""}" title="${escapeHtml(match.home)}">
        ${renderFlag(match.home, "bracket-flag")}
        <span class="sr-only">${escapeHtml(match.home)}</span>
        <input class="score-input compact" inputmode="numeric" type="number" min="0" max="20" data-side="homeGoals" value="${result.homeGoals ?? ""}" aria-label="${escapeHtml(match.home)} goals" />
      </label>
      <label class="bracket-team flag-only ${awayWinner ? "winner" : ""}" title="${escapeHtml(match.away)}">
        ${renderFlag(match.away, "bracket-flag")}
        <span class="sr-only">${escapeHtml(match.away)}</span>
        <input class="score-input compact" inputmode="numeric" type="number" min="0" max="20" data-side="awayGoals" value="${result.awayGoals ?? ""}" aria-label="${escapeHtml(match.away)} goals" />
      </label>
      ${winnerNeeded ? `
        <select class="winner-select" data-side="winner" aria-label="Tie winner">
          <option value="">Penales</option>
          <option value="home" ${result.winner === "home" ? "selected" : ""}>${escapeHtml(match.home)}</option>
          <option value="away" ${result.winner === "away" ? "selected" : ""}>${escapeHtml(match.away)}</option>
        </select>` : ""}
    </article>
  `;
}

function renderMatch(match, result, mode) {
  const winnerNeeded = match.stage !== "Group" && Number(result.homeGoals) === Number(result.awayGoals) && isCompleteScore(result);
  return `
    <article class="match-card" data-match-id="${match.id}" data-mode="${mode}">
      <div class="match-meta">
        <span class="pill">#${match.number}</span>
        <span class="pill">${match.stage}${match.group ? ` ${match.group}` : ""}</span>
        <span class="pill">${formatDate(match.date)}</span>
        <span class="pill">${escapeHtml(match.venue)}</span>
      </div>
      <label class="team-score home"><span>${escapeHtml(match.home)} ${renderFlag(match.home)}</span><input class="score-input home" inputmode="numeric" type="number" min="0" max="20" data-side="homeGoals" value="${result.homeGoals ?? ""}" aria-label="${escapeHtml(match.home)} goals" /></label>
      <span class="score-divider">-</span>
      <label class="team-score away"><input class="score-input away" inputmode="numeric" type="number" min="0" max="20" data-side="awayGoals" value="${result.awayGoals ?? ""}" aria-label="${escapeHtml(match.away)} goals" /><span>${renderFlag(match.away)} ${escapeHtml(match.away)}</span></label>
      ${winnerNeeded ? `
        <select class="winner-select" data-side="winner" aria-label="Tie winner">
          <option value="">Ganador por penales</option>
          <option value="home" ${result.winner === "home" ? "selected" : ""}>${escapeHtml(match.home)}</option>
          <option value="away" ${result.winner === "away" ? "selected" : ""}>${escapeHtml(match.away)}</option>
        </select>` : ""}
    </article>
  `;
}

function renderGroupTables(tables) {
  return Object.entries(tables).map(([group, rows]) => `
    <div class="group-table">
      <div class="group-title"><span>Grupo ${group}</span><span>Pts</span></div>
      <table>
        <thead><tr><th>Equipo</th><th>J</th><th>DG</th><th>GF</th><th>Pts</th></tr></thead>
        <tbody>
          ${rows.map((row) => `<tr><td>${renderFlag(row.team, "table-flag")} ${escapeHtml(row.team)}</td><td>${row.played}</td><td>${row.gd}</td><td>${row.gf}</td><td><strong>${row.points}</strong></td></tr>`).join("")}
        </tbody>
      </table>
    </div>
  `).join("");
}

function renderSimulatedGroups(results) {
  const tables = calculateGroupTables(results);
  const selectedRows = tables[matchFilter] || [];
  const thirds = bestThirds(tables);
  return `
    <aside class="side-panel compact-groups">
      <div class="panel">
        <h2>Grupos simulados</h2>
        <p class="panel-subtitle">Vista compacta del grupo activo y mejores terceros.</p>
        <div class="group-grid single">${renderGroupTables({ [matchFilter]: selectedRows })}</div>
        <h3 class="mini-title">Best third place</h3>
        <div class="thirds-strip">
          ${thirds.map((row, index) => `<span class="third-pill">${index + 1}. ${renderFlag(row.team, "third-flag")} ${escapeHtml(row.team)} · ${row.points} pts</span>`).join("")}
        </div>
      </div>
    </aside>
  `;
}

function renderLeaderboard(rows) {
  const departments = departmentLeaderboard(rows);
  return `
    <div class="app-grid">
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2>Ranking general</h2>
            <p class="panel-subtitle">3 puntos por marcador exacto, 1 por resultado correcto, 0 por fallo.</p>
          </div>
        </div>
        ${rows.length ? `
          <div class="ranking-table">
            <div class="ranking-head">
              <span>#</span><span>Nombre</span><span>Total</span><span>Exactos</span><span>Correctos</span><span>Fallados</span>
            </div>
            ${rows.map((row, index) => `
              <div class="ranking-row">
                <span class="rank">${index + 1}</span>
                <span><strong>${escapeHtml(displayName(row))}</strong><small>${escapeHtml(row.department || "Sin departamento")}</small></span>
                <span data-label="Total">${row.points}</span>
                <span data-label="Exactos">${row.exact}</span>
                <span data-label="Correctos">${row.correct}</span>
                <span data-label="Fallados">${row.missed}</span>
              </div>
            `).join("")}
          </div>
        ` : '<div class="empty">Aun no hay participantes.</div>'}
      </div>
      <aside class="side-panel">
        <div class="panel">
          <h2>Departamentos</h2>
          <p class="panel-subtitle">Ranking por promedio para equilibrar equipos grandes y chicos.</p>
          <div class="leaderboard compact-list">
            ${departments.length ? departments.map((row, index) => `
              <div class="leader-row dept-row">
                <div class="rank">${index + 1}</div>
                <div><div class="leader-name">${escapeHtml(row.department)}</div><div class="panel-subtitle">${row.people} personas · ${row.points} pts totales</div></div>
                <div class="points">${row.average.toFixed(1)}</div>
              </div>
            `).join("") : '<div class="empty">Sin departamentos todavia.</div>'}
          </div>
        </div>
      </aside>
    </div>
  `;
}

function renderResults() {
  const groupMatches = filteredGroupMatches();
  const knockoutMatches = realKnockoutMatches();
  return `
    <div class="app-grid">
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2>Resultados reales</h2>
            <p class="panel-subtitle">Carga los marcadores oficiales manualmente. El ranking se recalcula con cada resultado guardado.</p>
          </div>
          <button class="primary-btn" data-action="save">Guardar resultados</button>
        </div>
        ${renderGroupSelector()}
        <div class="manual-results-section">
          <h3>Fase de grupos</h3>
          ${renderMatches(groupMatches, state.realResults, "real")}
        </div>
        <div class="manual-results-section">
          <h3>Eliminatorias</h3>
          ${renderBracket(knockoutMatches, state.realResults, "real")}
        </div>
      </div>
      <aside class="side-panel">
        <div class="panel notice">Solo captura resultados finales oficiales. En partidos empatados de eliminatoria, selecciona el equipo que avanza por penales.</div>
        <div class="panel">
          <h2>Tabla real</h2>
          <p class="panel-subtitle">Grupo ${matchFilter}</p>
          ${renderGroupTables({ [matchFilter]: calculateGroupTables(state.realResults)[matchFilter] })}
        </div>
      </aside>
    </div>
  `;
}

function renderProfile(user, leaders, userRank) {
  const userRow = leaders.find((row) => row.email === user.email) || { points: 0, exact: 0 };
  const predictionsDone = completedCount(user.predictions);
  const realDone = completedCount(state.realResults);
  const allUserMatches = allMatchesForUser(user);
  const championMatch = allUserMatches.find((match) => match.id === "final-1");
  const champion = pickWinner(championMatch || {}, user.predictions["final-1"]) || "Pendiente";
  const knockoutDone = allUserMatches.filter((match) => match.stage !== "Group" && isCompleteScore(user.predictions[match.id])).length;
  const groupDone = GROUP_FIXTURES.filter((match) => isCompleteScore(user.predictions[match.id])).length;

  return `
    <div class="profile-grid">
      <section class="panel profile-card">
        <div class="profile-avatar">${escapeHtml((user.firstName || user.email || "?").slice(0, 1).toUpperCase())}</div>
        <div>
          <h2>${escapeHtml(displayName(user))}</h2>
          <p class="panel-subtitle">${escapeHtml(user.department || "Sin departamento")} · ${escapeHtml(user.email)}</p>
          <p class="panel-subtitle">${escapeHtml(user.phone || "Sin telefono")}</p>
        </div>
      </section>
      <section class="panel">
        <h2>Resumen</h2>
        <div class="metric-row profile-metrics">
          <div class="metric"><b>${userRow.points}</b><span>Puntos</span></div>
          <div class="metric"><b>${userRank || "-"}</b><span>Ranking</span></div>
          <div class="metric"><b>${userRow.exact || 0}</b><span>Exactos</span></div>
          <div class="metric"><b>${predictionsDone}</b><span>Predicciones</span></div>
        </div>
      </section>
      <section class="panel">
        <h2>Estado de quiniela</h2>
        <div class="profile-list">
          <div><span>Fase de grupos</span><strong>${groupDone} / ${GROUP_FIXTURES.length}</strong></div>
          <div><span>Llaves</span><strong>${knockoutDone} / ${allUserMatches.length - GROUP_FIXTURES.length}</strong></div>
          <div><span>Resultados cargados</span><strong>${realDone}</strong></div>
          <div><span>Campeon pronosticado</span><strong>${escapeHtml(champion)}</strong></div>
        </div>
      </section>
    </div>
  `;
}

function renderAuth() {
  app.innerHTML = `
    <div class="auth-layout">
      <section class="auth-hero">
        <div class="brand-lockup">
          <img class="brand-logo lays-logo" src="${LAYS_LOGO_URL}" alt="Lay's" />
          <div class="wc-badge"><img src="${WC_LOGO_URL}" alt="FIFA World Cup 2026" /></div>
          <div class="brand-copy"><strong>PepsiCo Quiniela</strong><span>World Cup 2026</span></div>
        </div>
        <h1>Pronostica. Simula. Gana la quiniela.</h1>
        <p>Una app interna con registro por email, predicciones de marcadores, llaves automaticas y ranking en vivo para la Copa Mundial 2026.</p>
      </section>
      <section class="auth-panel">
        <form class="auth-card" data-auth-form>
          <h2>${authMode === "login" ? "Entrar" : "Crear cuenta"}</h2>
          ${authMode === "register" ? `
            <div class="field-grid">
              <div class="field"><label>Nombre</label><input class="text-input" name="firstName" autocomplete="given-name" required /></div>
              <div class="field"><label>Apellido</label><input class="text-input" name="lastName" autocomplete="family-name" required /></div>
            </div>
            <div class="field"><label>Telefono</label><input class="text-input" name="phone" type="tel" autocomplete="tel" required /></div>
          ` : ""}
          ${authMode === "register" ? `<div class="field"><label>Departamento</label><select class="text-input" name="department" required>${DEPARTMENTS.map((department) => `<option value="${department}">${department}</option>`).join("")}</select></div>` : ""}
          <div class="field"><label>Email</label><input class="text-input" name="email" type="email" autocomplete="email" required /></div>
          <div class="field"><label>Password</label><input class="text-input" name="password" type="password" autocomplete="${authMode === "login" ? "current-password" : "new-password"}" minlength="6" required /></div>
          <div class="auth-actions">
            <button class="primary-btn" type="submit">${authMode === "login" ? "Entrar" : "Registrarme"}</button>
            <button class="link-btn" type="button" data-auth-toggle>${authMode === "login" ? "Crear una cuenta" : "Ya tengo cuenta"}</button>
          </div>
          <p class="notice">Prototype local: cuentas y resultados viven en este navegador. Para Vercel multiusuario, conectar un backend compartido.</p>
        </form>
      </section>
    </div>
  `;
  bindAuthEvents();
}

function bindAuthEvents() {
  document.querySelector("[data-auth-toggle]").addEventListener("click", () => {
    authMode = authMode === "login" ? "register" : "login";
    render();
  });
  document.querySelector("[data-auth-form]").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = normalizeEmail(form.get("email"));
    const password = String(form.get("password"));
    if (authMode === "register") {
      if (state.users[email]) {
        alert("Ya existe una cuenta con ese email.");
        return;
      }
      const firstName = String(form.get("firstName") || "").trim();
      const lastName = String(form.get("lastName") || "").trim();
      const phone = String(form.get("phone") || "").trim();
      const user = defaultUser(email, firstName);
      user.firstName = firstName;
      user.lastName = lastName;
      user.phone = phone;
      user.name = displayName(user);
      user.department = String(form.get("department") || DEPARTMENTS[0]);
      user.passwordHash = await digest(`${email}:${password}`);
      state.users[email] = user;
      state.session = email;
      saveState();
      render();
      return;
    }
    const user = state.users[email];
    if (!user || user.passwordHash !== await digest(`${email}:${password}`)) {
      alert("Email o password incorrectos.");
      return;
    }
    state.session = email;
    saveState();
    render();
  });
}

function bindEvents() {
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      currentTab = button.dataset.tab;
      render();
    });
  });

  document.querySelectorAll("[data-action='logout']").forEach((button) => {
    button.addEventListener("click", () => {
      state.session = null;
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-action='profile']").forEach((button) => {
    button.addEventListener("click", () => {
      currentTab = "profile";
      render();
    });
  });

  document.querySelectorAll("[data-action='save']").forEach((button) => {
    button.addEventListener("click", () => {
      const ok = saveState();
      setToast(ok ? "success" : "error", ok ? "Guardado correctamente." : "No se pudo guardar. Revisa el almacenamiento del navegador.");
      render();
    });
  });

  document.querySelectorAll("[data-group-select]").forEach((select) => {
    select.addEventListener("change", () => {
      matchFilter = select.value;
      render();
    });
  });

  document.querySelectorAll("[data-match-id]").forEach((card) => {
    card.addEventListener("input", handleScoreInput);
    card.addEventListener("change", handleScoreInput);
  });
}

function handleScoreInput(event) {
  const card = event.currentTarget;
  const store = card.dataset.mode === "real" ? state.realResults : currentUser().predictions;
  const matchId = card.dataset.matchId;
  const side = event.target.dataset.side;
  if (!side) return;
  store[matchId] = store[matchId] || {};
  store[matchId][side] = event.target.value;
  if (side !== "winner") {
    const hg = store[matchId].homeGoals;
    const ag = store[matchId].awayGoals;
    if (hg !== "" && ag !== "" && Number(hg) !== Number(ag)) {
      delete store[matchId].winner;
    }
  }
  saveState();
  if (event.type === "input") return;
  render();
}

function completedCount(results) {
  return Object.values(results).filter(isCompleteScore).length;
}

function completedForMatches(matches, results) {
  return matches.filter((match) => isCompleteScore(results[match.id])).length;
}

function renderProgress(label, completed, total) {
  const percent = total ? Math.round((completed / total) * 100) : 0;
  return `
    <div class="progress-card">
      <div class="progress-copy"><strong>${escapeHtml(label)}</strong><span>${completed} / ${total} completos</span></div>
      <div class="progress-track" aria-label="${escapeHtml(label)} ${percent}%"><span style="width: ${percent}%"></span></div>
    </div>
  `;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(`${date}T12:00:00Z`));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

render();
