// Headless render smoke test with the browser APIs jsdom lacks.
import { JSDOM } from "jsdom";
import { readFileSync } from "node:fs";

const html = readFileSync("./preview.html", "utf8");
const bundle = readFileSync("./preview.js", "utf8");
const css = readFileSync("./preview.css", "utf8");

const errors = [];
const dom = new JSDOM(html, {
  runScripts: "outside-only",
  pretendToBeVisual: true,
  url: "http://127.0.0.1:4173/",
});
const { window } = dom;

/* ---- polyfills for APIs jsdom does not implement ---- */
class RO {
  constructor(cb) { this.cb = cb; }
  observe(el) {
    // report a plausible box so width-dependent components lay out
    this.cb([{ target: el, contentRect: { width: 640, height: 240, top: 0, left: 0, bottom: 240, right: 640 } }], this);
  }
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = RO;
global.ResizeObserver = RO;

class IO {
  constructor(cb) { this.cb = cb; }
  observe(el) {
    this.cb([{ target: el, isIntersecting: true, intersectionRatio: 1, boundingClientRect: { top: 0, left: 0, width: 640, height: 240 } }], this);
  }
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
window.IntersectionObserver = IO;
global.IntersectionObserver = IO;

window.matchMedia = window.matchMedia || ((q) => ({
  matches: false, media: q, onchange: null,
  addEventListener() {}, removeEventListener() {},
  addListener() {}, removeListener() {}, dispatchEvent() { return false; },
}));
window.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
window.cancelAnimationFrame = (id) => clearTimeout(id);
window.scrollTo = () => {};

// canvas 2d stub so shader components don't crash
window.HTMLCanvasElement.prototype.getContext = function (type) {
  if (type === "2d") {
    return {
      canvas: this,
      fillRect(){}, clearRect(){}, getImageData(){ return { data: new Uint8ClampedArray(4) }; },
      putImageData(){}, drawImage(){}, createImageData(){ return { data: new Uint8ClampedArray(4) }; },
      setTransform(){}, scale(){}, translate(){}, save(){}, restore(){},
      beginPath(){}, closePath(){}, moveTo(){}, lineTo(){}, arc(){}, fill(){}, stroke(){},
      createLinearGradient(){ return { addColorStop(){} }; },
      measureText(){ return { width: 10 }; }, fillText(){},
      set fillStyle(v){}, get fillStyle(){ return "#000"; },
      set strokeStyle(v){}, get strokeStyle(){ return "#000"; },
      set globalAlpha(v){}, get globalAlpha(){ return 1; },
    };
  }
  // webgl -> null so components choose their fallback
  return null;
};

const origErr = window.console.error;
window.console.error = (...a) => { errors.push(a.join(" ")); };
window.console.warn = () => {};

window.addEventListener("error", (e) => errors.push("window.error: " + (e.message || e.error)));
window.addEventListener("unhandledrejection", (e) => errors.push("unhandled: " + e.reason));

window.document.documentElement.classList.add("dark");

try { window.eval(bundle); } catch (e) { errors.push("EVAL THREW: " + e.message); }
await new Promise((r) => setTimeout(r, 1200));

const root = window.document.getElementById("root");
const text = root ? root.textContent || "" : "";
const htmlOut = root ? root.innerHTML : "";

const checks = {
  "root mounted": !!(root && root.children.length > 0),
  "brand TrendVault": /TrendVault/.test(text),
  "hero headline": /actually checked/i.test(text),
  "all 5 resources named": ["dithercn.dev","component.gallery","navbar.gallery","pixlpin.com","vanta.supply"].every(n => text.includes(n)),
  "Free badges >= 3": (text.match(/\bFree\b/g) || []).length >= 3,
  "Paid badge shown": /Paid/.test(text),
  "stat 69 present": /\b69\b/.test(text),
  "stat 104 present": /\b104\b/.test(text),
  "nav groups": /Vault/.test(text) && /Components/.test(text) && /Resources/.test(text),
  "icons rendered": (htmlOut.match(/<svg/g) || []).length > 5,
  "data-slot attrs from dithercn": (htmlOut.match(/data-slot/g) || []).length > 0,
  "canvas/svg shader host": /<canvas|<svg/.test(htmlOut),
  "css dither tokens": css.includes("dither-color-purple"),
  "footer MIT credit": /MIT/.test(text),
};

console.log("\n=============== RENDER CHECKS ===============");
let pass = 0, fail = 0;
for (const [k, v] of Object.entries(checks)) {
  console.log(v ? `  PASS  ${k}` : `  FAIL  ${k}`);
  v ? pass++ : fail++;
}
console.log(`\n  ${pass} passed, ${fail} failed`);

const real = errors.filter(e => !/not implemented|Could not parse CSS|WebGL|getContext|ResizeObserver loop/i.test(e));
console.log("\n=============== RUNTIME ERRORS ===============");
if (real.length === 0) console.log("  none");
else real.slice(0, 6).forEach(e => console.log("  ! " + e.slice(0, 200)));

console.log("\ntext chars:", text.replace(/\s+/g," ").trim().length, "| html chars:", htmlOut.length);
console.log("EXIT:", fail === 0 ? "OK" : `${fail} CHECKS FAILED`);
