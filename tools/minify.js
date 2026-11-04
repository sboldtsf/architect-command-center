// Minify the single-file dashboard for distribution: strips comments and whitespace from inline <style> and <script> blocks.
// Keeps every block in place and in order (the cascade and script order are unchanged). No renaming, no code rewriting.
// Usage: node tools/minify.js dashboard.html dist/dashboard.min.html
const fs = require("fs");
let terser = null; try { terser = require("terser"); } catch (e) { console.warn("terser not installed (npm install in the repo); copying without minifying scripts"); }
const [, , src, out] = process.argv;
const html = fs.readFileSync(src, "utf8");
const css = t => t.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{};,>])\s*/g, "$1").replace(/;}/g, "}").trim();
(async () => {
  const parts = []; let last = 0; const re = /<(style|script)([^>]*)>([\s\S]*?)<\/\1>/g; let m;
  while ((m = re.exec(html))) {
    parts.push(html.slice(last, m.index)); last = re.lastIndex;
    const [all, tag, attrs, body] = m;
    if (tag === "style") { parts.push("<style" + attrs + ">" + css(body) + "</style>"); continue; }
    if (/\bsrc=/.test(attrs) || !terser || !body.trim()) { parts.push(all); continue; }
    try { const r = await terser.minify(body, { compress: false, mangle: false, format: { comments: false } }); parts.push("<script" + attrs + ">" + r.code + "</script>"); }
    catch (e) { console.warn("kept a script unminified:", e.message); parts.push(all); }
  }
  parts.push(html.slice(last));
  const outHtml = parts.join("");
  fs.writeFileSync(out, outHtml);
  console.log("minified " + (html.length / 1024).toFixed(0) + " KB -> " + (outHtml.length / 1024).toFixed(0) + " KB");
})();
