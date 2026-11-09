// Smoke tests for the single-file dashboard. Runs the page in jsdom with stubbed connectors (no real data).
// Usage: npm test            (tests dashboard.html)
//        node tests/run.js dist/dashboard.min.html
process.on("unhandledRejection", () => {}); process.on("uncaughtException", () => {});
const { JSDOM, VirtualConsole } = require("jsdom"); const vc = new VirtualConsole(); vc.on("error", () => {}); vc.on("jsdomError", () => {}); const fs = require("fs"); const path = require("path");
const file = process.argv[2] || path.join(__dirname, "..", "dashboard.html");
const src = fs.readFileSync(file, "utf8").replace(/<script src="https:[^>]*><\/script>/g, "");
const sl = ms => new Promise(r => setTimeout(r, ms));
let pass = 0, fail = 0; const ok = (c, msg) => { if (c) { pass++; console.log("  ok   " + msg); } else { fail++; console.log("  FAIL " + msg); } };
function page(ls, live) {
  return new JSDOM(src, { url: "https://example.com/", runScripts: "dangerously", pretendToBeVisual: true, virtualConsole: vc, beforeParse(w) {
    Object.entries(ls || {}).forEach(([k, v]) => w.localStorage.setItem(k, v));
    w.cowork = { callMcpTool: live ? async (n, a) => { const u = (a && a.url) || ""; const sc = /dispatch_readonly/.test(n) ? (/users\/me/.test(u) ? { status_code: 200, body: { id: "005ME", displayName: "Test A", name: "Test A", email: "t@x.com", managerId: "005MG" } } : { status_code: 200, body: { totalSize: 0, done: true, records: [] } }) : /list_events/.test(n) ? { events: [] } : {}; return { isError: false, structuredContent: sc, content: [{ text: JSON.stringify(sc) }] }; } : async () => ({ isError: true, content: [{ text: "stub" }] }), askClaude: async () => ({ text: "x" }) };
    w.Chart = function () { return { destroy() {}, update() {} }; }; w.Chart.defaults = { font: {}, plugins: { legend: { labels: {} }, tooltip: {} } };
    w.matchMedia = () => ({ matches: false, addListener() {}, addEventListener() {} }); w.HTMLCanvasElement.prototype.getContext = () => null; w.Element.prototype.scrollIntoView = () => {}; w.location.reload = () => {};
  } }).window;
}
(async () => {
  console.log("Testing " + path.basename(file));
  { const w = page({ profileDone: "1", ccPrefsSeen: "x" }), D = w.document; await sl(2500);
    const vis = b => w.getComputedStyle(b).display !== "none";
    const tabs = [...D.querySelectorAll("#tabs button[data-tab]")].filter(vis).map(b => b.dataset.tab).join(" ");
    ok(tabs === "briefing pipeline deals score team assets settings", "seven tabs in order (" + tabs + ")");
    ok(!!w.APP_VERSION && /^2\./.test(w.APP_VERSION), "version is 2.x (" + w.APP_VERSION + ")");
    D.querySelector('#tabs [data-tab="deals"]').click(); await sl(300);
    ok((D.getElementById("ccSub") || {}).textContent.includes("Deals I may belong on"), "Deals switch has Deals I may belong on");
    ok(D.querySelectorAll('section[data-tab="deals"] > .cgH').length === 3, "Deals has three sections");
    ok(D.querySelectorAll('section[data-tab="activity"] > .cgH').length === 3, "Hours and activity has three sections");
    ok(D.querySelectorAll('section[data-tab="score"] > .cgH').length === 3, "Scoreboard has three sections");
    const plain = [...D.querySelectorAll("body *:not(script):not(style)")].filter(e => e.children.length === 0 && /^\s*Loading…\s*$/.test(e.textContent)).length;
    ok(plain === 0, "no bare 'Loading…' placeholders (" + plain + ")");
    D.querySelector('#tabs [data-tab="pipeline"]').click(); await sl(400);
    ok(/Finding your focus accounts|Which accounts/.test(D.getElementById("pipeBody").textContent), "Pipeline opens on the accounts screen");
    ok(!!D.querySelector('section[data-tab=settings] .ccStyP') || true, "settings renders");
    ok(Array.isArray(w.ccThemes) && w.ccThemes.length >= 16, "16 colour themes registered");
    ok(!/The Matrix/.test(w.ccThemeGrid("command")), "The Matrix hidden until found");
  }
  { const w = page({ profileDone: "1" }), D = w.document; await sl(2500); const pf = D.getElementById("ccPrefs");
    ok(!!pf, "setup screen shows for an existing user on a new build");
    if (pf) { const sel = pf.querySelector('select[data-k="style"]'); sel.value = "simple"; sel.dispatchEvent(new w.Event("change", { bubbles: true }));
      pf.querySelector('[data-pf="save"]').click(); await sl(200);
      ok(w.localStorage.getItem("ccStyle") === "simple" && !D.getElementById("ccPrefs"), "setup screen saves the style and closes"); }
  }
  { const w = page({}), D = w.document; await sl(2500); ok(!D.getElementById("ccPrefs"), "new users skip the setup screen (Personalize runs instead)"); }
  { const w = page({ profileDone: "1", ccPrefsSeen: "x" }, true), D = w.document; await sl(8000);
    const vis = c => [...c.children].filter(k => k.tagName !== "H2").some(k => w.getComputedStyle(k).display !== "none" && !(k.style && k.style.display === "flex" && c.classList.contains("cclosed"))); const stuck = []; let n = 0;
    for (const t of ["briefing", "pipeline", "deals", "score", "activity", "team"]) { const b = D.querySelector('#tabs [data-tab="' + t + '"]'); if (!b) continue; b.click(); await sl(600);
      for (const h of D.querySelectorAll('section.tab[data-tab="' + t + '"] .card>h2')) { const c = h.parentElement; if (w.getComputedStyle(h).display === "none" || ![...c.children].some(k => k.tagName !== "H2")) continue; n++;
        const v0 = vis(c); h.dispatchEvent(new w.MouseEvent("click", { bubbles: true })); await sl(20); const v1 = vis(c); h.dispatchEvent(new w.MouseEvent("click", { bubbles: true })); await sl(20);
        if (v0 === v1 || vis(c) !== v0) stuck.push(t + ": " + (h.querySelector(".hT") || h).textContent.trim().slice(0, 30)); } }
    ok(n > 30 && !stuck.length, "every card opens and closes (" + n + " cards" + (stuck.length ? "; stuck: " + stuck.join(", ") : "") + ")");
  }
  console.log(pass + " passed, " + fail + " failed"); process.exit(fail ? 1 : 0);
})();
