/* FTA Mind Game: animal avatars and store catalog.
   window.Avatar.svg(config, size) returns an SVG string.
   To add an item to the store, add one line to ITEMS below. */
(function () {
  "use strict";

  const ANIMALS = [
    { id: "fox", name: "Fox", fur: "#e07a2e" },
    { id: "bear", name: "Bear", fur: "#8a5a3b" },
    { id: "panda", name: "Panda", fur: "#f2f2f2" },
    { id: "lion", name: "Lion", fur: "#e0a640" },
    { id: "tiger", name: "Tiger", fur: "#f08a24" },
    { id: "wolf", name: "Wolf", fur: "#8d96a3" },
    { id: "cat", name: "Cat", fur: "#4a4f57" },
    { id: "dog", name: "Dog", fur: "#c9935a" },
    { id: "rabbit", name: "Rabbit", fur: "#e9e2da" },
    { id: "koala", name: "Koala", fur: "#9aa3ad" },
    { id: "owl", name: "Owl", fur: "#9b6b43" },
    { id: "penguin", name: "Penguin", fur: "#2b3038" }
  ];

  const FURS = ["#e07a2e", "#8a5a3b", "#f2f2f2", "#e0a640", "#f08a24", "#8d96a3", "#4a4f57",
    "#c9935a", "#e9e2da", "#2b3038", "#5b3a29", "#d9c27e", "#7aa7d6", "#b58ad6", "#e88aa8", "#6fbf8a"];

  const EYES = [
    { id: "big", name: "Bright" },
    { id: "dot", name: "Calm" },
    { id: "happy", name: "Happy" },
    { id: "focus", name: "Locked in" },
    { id: "wink", name: "Wink" }
  ];

  // slot, id, name, price (0 = free starter), params used by the drawing code
  const ITEMS = [
    // shirts
    ["shirt", "tee-white", "White tee", 0, { kind: "tee", c: "#f4f5f7" }],
    ["shirt", "tee-blue", "Blue tee", 0, { kind: "tee", c: "#3b82f6" }],
    ["shirt", "tee-black", "Black tee", 40, { kind: "tee", c: "#1f2226" }],
    ["shirt", "tee-red", "Red tee", 40, { kind: "tee", c: "#e04848" }],
    ["shirt", "polo-navy", "Navy polo", 90, { kind: "polo", c: "#1b2a55" }],
    ["shirt", "polo-green", "Grass court polo", 120, { kind: "polo", c: "#2f8a4c" }],
    ["shirt", "stripe", "Striped tee", 120, { kind: "stripe", c: "#f4f5f7", c2: "#3b82f6" }],
    ["shirt", "jersey", "Tier 1 jersey", 200, { kind: "jersey", c: "#1a1d21", c2: "#3b82f6" }],
    ["shirt", "hoodie-grey", "Grey hoodie", 180, { kind: "hoodie", c: "#9aa0a8" }],
    ["shirt", "hoodie-purple", "Purple hoodie", 220, { kind: "hoodie", c: "#7b4bd1" }],
    ["shirt", "track", "Track jacket", 260, { kind: "track", c: "#172554", c2: "#f4f5f7" }],
    ["shirt", "champ", "Champion jacket", 900, { kind: "track", c: "#d4a02a", c2: "#1a1d21" }],
    // pants
    ["pants", "shorts-black", "Black shorts", 0, { kind: "shorts", c: "#22262b" }],
    ["pants", "shorts-white", "White shorts", 40, { kind: "shorts", c: "#f4f5f7" }],
    ["pants", "shorts-blue", "Blue shorts", 60, { kind: "shorts", c: "#3b82f6" }],
    ["pants", "skirt-white", "Tennis skirt", 80, { kind: "skirt", c: "#f4f5f7" }],
    ["pants", "skirt-pink", "Pink tennis skirt", 120, { kind: "skirt", c: "#e88aa8" }],
    ["pants", "track-navy", "Track pants", 150, { kind: "long", c: "#172554", c2: "#f4f5f7" }],
    ["pants", "joggers", "Grey joggers", 150, { kind: "long", c: "#7d838c" }],
    ["pants", "gold-shorts", "Gold shorts", 600, { kind: "shorts", c: "#d4a02a" }],
    // shoes
    ["shoes", "sneak-white", "White sneakers", 0, { c: "#f4f5f7", c2: "#9aa0a8" }],
    ["shoes", "sneak-blue", "Blue sneakers", 60, { c: "#3b82f6", c2: "#f4f5f7" }],
    ["shoes", "sneak-black", "Black sneakers", 60, { c: "#1f2226", c2: "#f4f5f7" }],
    ["shoes", "sneak-neon", "Neon sneakers", 150, { c: "#c6f432", c2: "#1f2226" }],
    ["shoes", "sneak-red", "Clay court sneakers", 150, { c: "#d35a32", c2: "#f4f5f7" }],
    ["shoes", "sneak-gold", "Gold sneakers", 700, { c: "#d4a02a", c2: "#fff4c8" }],
    // hats
    ["hat", "none", "No hat", 0, { kind: "none" }],
    ["hat", "band-white", "White sweatband", 50, { kind: "band", c: "#f4f5f7", c2: "#3b82f6" }],
    ["hat", "band-red", "Red sweatband", 50, { kind: "band", c: "#e04848", c2: "#f4f5f7" }],
    ["hat", "cap-blue", "Blue cap", 100, { kind: "cap", c: "#3b82f6" }],
    ["hat", "cap-black", "Black cap", 100, { kind: "cap", c: "#1f2226" }],
    ["hat", "cap-back", "Backwards cap", 140, { kind: "back", c: "#e04848" }],
    ["hat", "visor", "Visor", 120, { kind: "visor", c: "#f4f5f7" }],
    ["hat", "beanie", "Beanie", 160, { kind: "beanie", c: "#2f8a4c", c2: "#f4f5f7" }],
    ["hat", "bucket", "Bucket hat", 200, { kind: "bucket", c: "#d9c27e" }],
    ["hat", "crown", "Crown", 1200, { kind: "crown", c: "#d4a02a" }],
    // accessories
    ["acc", "none", "Nothing", 0, { kind: "none" }],
    ["acc", "wrist", "Wristbands", 60, { kind: "wrist", c: "#3b82f6" }],
    ["acc", "shades", "Sunglasses", 150, { kind: "shades", c: "#111318" }],
    ["acc", "phones", "Headphones", 180, { kind: "phones", c: "#f4f5f7", c2: "#3b82f6" }],
    ["acc", "racket", "Racket", 220, { kind: "racket", c: "#3b82f6" }],
    ["acc", "medal", "Gold medal", 400, { kind: "medal", c: "#d4a02a" }],
    ["acc", "cape", "Hero cape", 500, { kind: "cape", c: "#e04848" }],
    ["acc", "trophy", "Trophy", 1000, { kind: "trophy", c: "#d4a02a" }]
  ];

  const SLOTS = [
    { id: "hat", name: "Hats" },
    { id: "shirt", name: "Shirts" },
    { id: "pants", name: "Pants" },
    { id: "shoes", name: "Shoes" },
    { id: "acc", name: "Extras" }
  ];

  const byId = {};
  ITEMS.forEach(([slot, id, name, price, p]) => { byId[slot + ":" + id] = { slot, id, name, price, p }; });
  const item = (slot, id) => byId[slot + ":" + id] || ITEMS.filter((i) => i[0] === slot && i[3] === 0).map(([s, i, n, pr, p]) => ({ slot: s, id: i, name: n, price: pr, p }))[0];

  const DEFAULT = { animal: "fox", fur: "#e07a2e", eyes: "big", hat: "none", shirt: "tee-blue", pants: "shorts-black", shoes: "sneak-white", acc: "none" };

  /* ---------- colour helpers ---------- */
  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    const t = amt < 0 ? 0 : 255, a = Math.abs(amt);
    r = Math.round((t - r) * a + r); g = Math.round((t - g) * a + g); b = Math.round((t - b) * a + b);
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }
  const isLight = (hex) => { const n = parseInt(hex.slice(1), 16); return (((n >> 16) & 255) * 0.3 + ((n >> 8) & 255) * 0.59 + (n & 255) * 0.11) > 170; };
  const INK = "#1b1d22";

  /* ---------- head ---------- */
  function ears(a, f) {
    const dark = shade(f, -0.25), inner = shade(f, 0.45);
    switch (a) {
      case "fox": case "cat": case "wolf":
        return `<path d="M56 62 L62 16 L92 42 Z" fill="${f}"/><path d="M144 62 L138 16 L108 42 Z" fill="${f}"/>` +
          `<path d="M64 52 L66 28 L82 42 Z" fill="${a === "fox" ? INK : inner}" opacity="${a === "fox" ? 0.85 : 1}"/><path d="M136 52 L134 28 L118 42 Z" fill="${a === "fox" ? INK : inner}" opacity="${a === "fox" ? 0.85 : 1}"/>`;
      case "rabbit":
        return `<ellipse cx="80" cy="22" rx="12" ry="34" fill="${f}" transform="rotate(-8 80 22)"/><ellipse cx="120" cy="22" rx="12" ry="34" fill="${f}" transform="rotate(8 120 22)"/>` +
          `<ellipse cx="80" cy="24" rx="6" ry="24" fill="#f2b8c6" transform="rotate(-8 80 24)"/><ellipse cx="120" cy="24" rx="6" ry="24" fill="#f2b8c6" transform="rotate(8 120 24)"/>`;
      case "dog":
        return `<ellipse cx="54" cy="74" rx="15" ry="30" fill="${dark}" transform="rotate(18 54 74)"/><ellipse cx="146" cy="74" rx="15" ry="30" fill="${dark}" transform="rotate(-18 146 74)"/>`;
      case "koala":
        return `<circle cx="56" cy="44" r="24" fill="${f}"/><circle cx="144" cy="44" r="24" fill="${f}"/><circle cx="58" cy="46" r="14" fill="#f3ecec"/><circle cx="142" cy="46" r="14" fill="#f3ecec"/>`;
      case "panda":
        return `<circle cx="62" cy="40" r="17" fill="${INK}"/><circle cx="138" cy="40" r="17" fill="${INK}"/>`;
      case "lion":
        return `<circle cx="100" cy="78" r="66" fill="${shade(f, -0.35)}"/>` +
          Array.from({ length: 14 }, (_, i) => { const t = (i / 14) * Math.PI * 2; return `<circle cx="${(100 + Math.cos(t) * 62).toFixed(1)}" cy="${(78 + Math.sin(t) * 62).toFixed(1)}" r="14" fill="${shade(f, -0.35)}"/>`; }).join("") +
          `<circle cx="64" cy="40" r="13" fill="${f}"/><circle cx="136" cy="40" r="13" fill="${f}"/>`;
      case "owl":
        return `<path d="M58 50 L60 22 L82 38 Z" fill="${dark}"/><path d="M142 50 L140 22 L118 38 Z" fill="${dark}"/>`;
      case "penguin":
        return "";
      default: // bear, tiger
        return `<circle cx="62" cy="40" r="16" fill="${f}"/><circle cx="138" cy="40" r="16" fill="${f}"/><circle cx="62" cy="40" r="8" fill="${shade(f, a === "tiger" ? 0.6 : -0.2)}"/><circle cx="138" cy="40" r="8" fill="${shade(f, a === "tiger" ? 0.6 : -0.2)}"/>`;
    }
  }

  function eyesSvg(style, onDark) {
    const ink = onDark ? "#f4f5f7" : INK;
    const L = 82, R = 118, Y = 74;
    switch (style) {
      case "dot":
        return `<circle cx="${L}" cy="${Y}" r="5.5" fill="${ink}"/><circle cx="${R}" cy="${Y}" r="5.5" fill="${ink}"/>`;
      case "happy":
        return `<path d="M${L - 8} ${Y + 2} Q${L} ${Y - 8} ${L + 8} ${Y + 2}" stroke="${ink}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M${R - 8} ${Y + 2} Q${R} ${Y - 8} ${R + 8} ${Y + 2}" stroke="${ink}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      case "focus":
        return `<circle cx="${L}" cy="${Y + 1}" r="7" fill="#fff"/><circle cx="${R}" cy="${Y + 1}" r="7" fill="#fff"/><circle cx="${L + 1}" cy="${Y + 2}" r="4" fill="${INK}"/><circle cx="${R + 1}" cy="${Y + 2}" r="4" fill="${INK}"/>` +
          `<path d="M${L - 10} ${Y - 9} L${L + 8} ${Y - 4}" stroke="${ink}" stroke-width="4" stroke-linecap="round"/><path d="M${R + 10} ${Y - 9} L${R - 8} ${Y - 4}" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>`;
      case "wink":
        return `<circle cx="${L}" cy="${Y}" r="9" fill="#fff"/><circle cx="${L + 1}" cy="${Y + 1}" r="5" fill="${INK}"/><circle cx="${L + 3}" cy="${Y - 2}" r="1.8" fill="#fff"/>` +
          `<path d="M${R - 8} ${Y} Q${R} ${Y + 6} ${R + 8} ${Y}" stroke="${ink}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      default: // big
        return `<circle cx="${L}" cy="${Y}" r="9.5" fill="#fff"/><circle cx="${R}" cy="${Y}" r="9.5" fill="#fff"/><circle cx="${L + 1}" cy="${Y + 1}" r="5.5" fill="${INK}"/><circle cx="${R + 1}" cy="${Y + 1}" r="5.5" fill="${INK}"/>` +
          `<circle cx="${L + 3}" cy="${Y - 2}" r="2" fill="#fff"/><circle cx="${R + 3}" cy="${Y - 2}" r="2" fill="#fff"/>`;
    }
  }

  function head(a, f, eyes) {
    let s = ears(a, f);
    const light = shade(f, 0.6), dark = shade(f, -0.3);
    s += `<circle cx="100" cy="80" r="46" fill="${f}"/>`;
    let onDark = !isLight(f);
    if (a === "fox") s += `<path d="M58 88 Q72 112 100 112 Q128 112 142 88 Q122 96 100 84 Q78 96 58 88 Z" fill="#f7efe6"/>`;
    if (a === "wolf") s += `<path d="M64 92 Q80 116 100 116 Q120 116 136 92 Q118 100 100 88 Q82 100 64 92 Z" fill="${light}"/>`;
    if (a === "tiger") s += `<path d="M100 36 L100 50 M86 38 L90 52 M114 38 L110 52 M56 74 L68 76 M56 86 L68 84 M144 74 L132 76 M144 86 L132 84" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
    if (a === "panda") { s += `<ellipse cx="80" cy="76" rx="14" ry="12" fill="${INK}" transform="rotate(-20 80 76)"/><ellipse cx="120" cy="76" rx="14" ry="12" fill="${INK}" transform="rotate(20 120 76)"/>`; onDark = true; }
    if (a === "owl") { s += `<circle cx="82" cy="74" r="17" fill="${light}"/><circle cx="118" cy="74" r="17" fill="${light}"/>`; onDark = false; }
    if (a === "penguin") { s += `<path d="M100 66 Q86 50 72 58 Q58 68 62 90 Q70 118 100 120 Q130 118 138 90 Q142 68 128 58 Q114 50 100 66 Z" fill="#f4f5f7"/>`; onDark = false; }
    if (a === "cat") s += `<path d="M60 92 L44 88 M60 98 L44 100 M140 92 L156 88 M140 98 L156 100" stroke="${shade(f, 0.5)}" stroke-width="2.5" stroke-linecap="round"/>`;
    s += eyesSvg(eyes, onDark);
    // muzzle + nose + mouth
    if (a === "owl" || a === "penguin") {
      s += `<path d="M93 86 L107 86 L100 98 Z" fill="#f0a02c"/>`;
    } else if (a === "koala") {
      s += `<ellipse cx="100" cy="92" rx="10" ry="13" fill="${INK}"/><path d="M92 106 Q100 112 108 106" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    } else {
      if (a !== "fox" && a !== "wolf") s += `<ellipse cx="100" cy="98" rx="20" ry="14" fill="${a === "panda" ? "#ffffff" : light}"/>`;
      s += `<path d="M93 90 Q100 86 107 90 Q104 97 100 98 Q96 97 93 90 Z" fill="${INK}"/>`;
      s += `<path d="M100 98 L100 102 M92 104 Q100 110 108 104" stroke="${INK}" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
    }
    s += `<circle cx="70" cy="96" r="6" fill="#f28c9b" opacity=".35"/><circle cx="130" cy="96" r="6" fill="#f28c9b" opacity=".35"/>`;
    return s;
  }

  /* ---------- clothes ---------- */
  const TORSO = "M66 140 Q66 126 82 124 L118 124 Q134 126 134 140 L138 194 L62 194 Z";

  function shirt(p, f) {
    const c = p.c, d = shade(c, -0.18);
    let s = "";
    if (p.kind === "hoodie") s += `<path d="M76 126 Q100 108 124 126 L118 134 Q100 122 82 134 Z" fill="${d}"/>`;
    // sleeves
    s += `<path d="M68 132 L50 160" stroke="${c}" stroke-width="20" stroke-linecap="round"/><path d="M132 132 L150 160" stroke="${c}" stroke-width="20" stroke-linecap="round"/>`;
    if (p.kind === "hoodie" || p.kind === "track") s += `<path d="M50 160 L46 178" stroke="${c}" stroke-width="18" stroke-linecap="round"/><path d="M150 160 L154 178" stroke="${c}" stroke-width="18" stroke-linecap="round"/>`;
    s += `<path d="${TORSO}" fill="${c}"/>`;
    if (p.kind === "polo") s += `<path d="M86 124 L100 140 L114 124 Z" fill="${d}"/><path d="M86 124 L94 136 L80 132 Z M114 124 L106 136 L120 132 Z" fill="${shade(c, 0.25)}"/>`;
    if (p.kind === "tee") s += `<path d="M88 124 Q100 134 112 124" stroke="${d}" stroke-width="4" fill="none"/>`;
    if (p.kind === "stripe") s += [146, 162, 178].map((y) => `<rect x="64" y="${y}" width="73" height="7" fill="${p.c2}"/>`).join("");
    if (p.kind === "jersey") s += `<text x="100" y="176" text-anchor="middle" font-family="Oswald,Impact,sans-serif" font-weight="700" font-size="40" fill="${p.c2}">1</text><path d="M88 124 L100 136 L112 124" stroke="${p.c2}" stroke-width="4" fill="none"/>`;
    if (p.kind === "hoodie") s += `<path d="M80 168 L120 168 L116 188 L84 188 Z" fill="${d}"/><path d="M94 132 L92 152 M106 132 L108 152" stroke="${shade(c, 0.4)}" stroke-width="2.5"/>`;
    if (p.kind === "track") s += `<path d="M100 126 L100 194" stroke="${shade(c, 0.35)}" stroke-width="3"/><path d="M66 140 L62 194 M134 140 L138 194" stroke="${p.c2}" stroke-width="5"/><path d="M88 124 L100 134 L112 124" stroke="${p.c2}" stroke-width="5" fill="none"/>`;
    // hands
    const long = p.kind === "hoodie" || p.kind === "track";
    s += `<circle cx="${long ? 45 : 48}" cy="${long ? 186 : 170}" r="10" fill="${f}"/><circle cx="${long ? 155 : 152}" cy="${long ? 186 : 170}" r="10" fill="${f}"/>`;
    if (!long) s += `<path d="M52 162 L48 168 M148 162 L152 168" stroke="${f}" stroke-width="14" stroke-linecap="round"/>`;
    return s;
  }

  function pants(p, f) {
    let s = `<rect x="72" y="190" width="24" height="40" rx="6" fill="${f}"/><rect x="104" y="190" width="24" height="40" rx="6" fill="${f}"/>`;
    if (p.kind === "shorts") s += `<path d="M64 186 L136 186 L134 214 L104 214 L100 200 L96 214 L66 214 Z" fill="${p.c}"/>`;
    if (p.kind === "skirt") s += `<path d="M64 186 L136 186 L146 214 L54 214 Z" fill="${p.c}"/><path d="M78 190 L72 214 M100 190 L100 214 M122 190 L128 214" stroke="${shade(p.c, -0.12)}" stroke-width="2"/>`;
    if (p.kind === "long") s += `<path d="M64 186 L136 186 L132 230 L104 230 L100 204 L96 230 L68 230 Z" fill="${p.c}"/>` + (p.c2 ? `<path d="M66 192 L69 228 M134 192 L131 228" stroke="${p.c2}" stroke-width="4"/>` : "");
    return s;
  }

  function shoes(p) {
    return `<path d="M66 226 L96 226 Q104 226 104 234 L104 238 L62 238 Q60 230 66 226 Z" fill="${p.c}"/><path d="M134 226 L104 226 Q96 226 96 234 L96 238 L138 238 Q140 230 134 226 Z" fill="${p.c}" transform="translate(4 0)"/>` +
      `<path d="M62 238 L104 238 M100 238 L142 238" stroke="${p.c2}" stroke-width="3"/><path d="M76 230 L84 230 M120 230 L128 230" stroke="${p.c2}" stroke-width="2.5" stroke-linecap="round"/>`;
  }

  function hat(p) {
    if (!p.c) return "";
    const c = p.c, d = shade(c, -0.2);
    switch (p.kind) {
      case "band": return `<path d="M55 64 Q100 46 145 64 L146 52 Q100 32 54 52 Z" fill="${c}"/><path d="M55 58 Q100 40 145 58" stroke="${p.c2}" stroke-width="3" fill="none"/>`;
      case "cap": return `<path d="M56 60 Q58 24 100 22 Q142 24 144 60 Z" fill="${c}"/><path d="M56 58 Q100 50 160 62 Q150 70 100 64 Q74 62 56 64 Z" fill="${d}"/><circle cx="100" cy="23" r="4" fill="${d}"/>`;
      case "back": return `<path d="M56 60 Q58 24 100 22 Q142 24 144 60 Z" fill="${c}"/><path d="M56 56 Q40 58 30 52 Q40 44 58 44 Z" fill="${d}"/><circle cx="100" cy="23" r="4" fill="${d}"/>`;
      case "visor": return `<path d="M56 58 Q100 40 144 58 L144 50 Q100 32 56 50 Z" fill="${c}"/><path d="M60 56 Q100 46 156 60 Q148 70 100 64 Q76 62 58 64 Z" fill="${shade(c, -0.1)}"/>`;
      case "beanie": return `<path d="M54 62 Q54 18 100 18 Q146 18 146 62 Z" fill="${c}"/><rect x="52" y="52" width="96" height="14" rx="4" fill="${d}"/><circle cx="100" cy="16" r="11" fill="${p.c2}"/>`;
      case "bucket": return `<path d="M64 56 Q66 22 100 22 Q134 22 136 56 Z" fill="${c}"/><path d="M44 62 Q100 44 156 62 Q150 70 100 66 Q50 70 44 62 Z" fill="${d}"/>`;
      case "crown": return `<path d="M64 54 L66 18 L82 36 L100 12 L118 36 L134 18 L136 54 Z" fill="${c}" stroke="${shade(c, -0.3)}" stroke-width="2"/><circle cx="100" cy="40" r="5" fill="#e04848"/><circle cx="80" cy="44" r="4" fill="#3b82f6"/><circle cx="120" cy="44" r="4" fill="#3b82f6"/>`;
      default: return "";
    }
  }

  function accFront(p) {
    switch (p.kind) {
      case "wrist": return `<rect x="38" y="${158}" width="20" height="8" rx="2" fill="${p.c}"/><rect x="142" y="158" width="20" height="8" rx="2" fill="${p.c}"/>`;
      case "shades": return `<path d="M64 66 L136 66 L134 72 Q128 86 112 84 Q104 82 102 72 L98 72 Q96 82 88 84 Q72 86 66 72 Z" fill="${p.c}"/><path d="M70 70 L80 70" stroke="#5b6270" stroke-width="2"/>`;
      case "phones": return `<path d="M54 80 Q52 28 100 28 Q148 28 146 80" stroke="${p.c}" stroke-width="7" fill="none"/><rect x="44" y="70" width="16" height="26" rx="6" fill="${p.c2}"/><rect x="140" y="70" width="16" height="26" rx="6" fill="${p.c2}"/>`;
      case "racket": return `<path d="M156 172 L170 130" stroke="#2b3038" stroke-width="7" stroke-linecap="round"/><ellipse cx="178" cy="102" rx="18" ry="26" fill="none" stroke="${p.c}" stroke-width="6" transform="rotate(18 178 102)"/>` +
        `<path d="M170 84 L182 122 M164 94 L190 104 M162 106 L186 114 M176 80 L190 116" stroke="${shade(p.c, 0.55)}" stroke-width="1.5" opacity=".9"/>`;
      case "medal": return `<path d="M86 124 L100 150 L114 124" stroke="#3b82f6" stroke-width="6" fill="none"/><circle cx="100" cy="158" r="12" fill="${p.c}" stroke="${shade(p.c, -0.3)}" stroke-width="2"/><text x="100" y="163" text-anchor="middle" font-family="Oswald,Impact,sans-serif" font-weight="700" font-size="14" fill="#5a4410">1</text>`;
      case "trophy": return `<path d="M150 150 L176 150 L174 166 Q163 178 152 166 Z" fill="${p.c}"/><rect x="159" y="174" width="8" height="10" fill="${p.c}"/><rect x="152" y="184" width="22" height="6" fill="${shade(p.c, -0.3)}"/><path d="M150 154 Q142 156 146 164 M176 154 Q184 156 180 164" stroke="${p.c}" stroke-width="3" fill="none"/>`;
      default: return "";
    }
  }
  const accBack = (p) => p.kind === "cape" ? `<path d="M74 126 L126 126 L150 222 Q100 232 50 222 Z" fill="${p.c}"/><path d="M74 126 L126 126 L150 222" stroke="${shade(p.c, -0.25)}" stroke-width="3" fill="none"/>` : "";

  function svg(cfg, size, opts) {
    const c = Object.assign({}, DEFAULT, cfg || {});
    const animal = ANIMALS.find((a) => a.id === c.animal) ? c.animal : "fox";
    const f = /^#[0-9a-f]{6}$/i.test(c.fur) ? c.fur : "#e07a2e";
    const hp = item("hat", c.hat).p, sp = item("shirt", c.shirt).p, pp = item("pants", c.pants).p, shp = item("shoes", c.shoes).p, ap = item("acc", c.acc).p;
    const headOnly = opts && opts.headOnly;
    const vb = headOnly ? "30 0 140 140" : "20 0 180 244";
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${size}" height="${headOnly ? size : Math.round(size * 244 / 180)}" aria-hidden="true">`;
    if (!headOnly) {
      s += accBack(ap);
      s += pants(pp, f) + shoes(shp);
      s += `<path d="${TORSO}" fill="${f}"/>`;
      s += shirt(sp, f);
      s += `<rect x="88" y="116" width="24" height="14" fill="${f}"/>`;
    }
    s += head(animal, f, c.eyes);
    s += hat(hp);
    s += headOnly ? (ap.kind === "shades" || ap.kind === "phones" ? accFront(ap) : "") : accFront(ap);
    return s + "</svg>";
  }

  window.Avatar = { ANIMALS, FURS, EYES, ITEMS, SLOTS, DEFAULT, item, svg };
})();
