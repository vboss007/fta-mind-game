// FTA Mind Game team leaderboard (Vercel serverless function).
// Needs three settings in Vercel > Project > Settings > Environment Variables:
//   TEAM_CODE                          the code players type to join (you choose it)
//   KV_REST_API_URL + KV_REST_API_TOKEN  added automatically when you connect Upstash Redis
// Stores only: random player id, first name + last initial, avatar, and score numbers.

const KEY = "fta:players";
const DAY = /^\d{4}-\d{2}-\d{2}$/;

function cfg() {
  return {
    url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
    code: (process.env.TEAM_CODE || "").trim().toUpperCase()
  };
}

async function redis(c, commands) {
  const r = await fetch(c.url.replace(/\/$/, "") + "/pipeline", {
    method: "POST",
    headers: { Authorization: "Bearer " + c.token, "Content-Type": "application/json" },
    body: JSON.stringify(commands)
  });
  if (!r.ok) throw new Error("redis " + r.status);
  return r.json();
}

const int = (v, max) => { const n = Math.floor(Number(v)); return Number.isFinite(n) ? Math.max(0, Math.min(max, n)) : 0; };
const str = (v, max, re) => { const s = typeof v === "string" ? v.trim().slice(0, max) : ""; return re && !re.test(s) ? "" : s; };

function cleanAvatar(a) {
  const out = {};
  if (!a || typeof a !== "object") return out;
  for (const k of ["animal", "eyes", "hat", "shirt", "pants", "shoes", "acc"]) {
    const v = str(a[k], 24, /^[a-z0-9-]+$/);
    if (v) out[k] = v;
  }
  const fur = str(a.fur, 7, /^#[0-9a-fA-F]{6}$/);
  if (fur) out.fur = fur;
  return out;
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  const c = cfg();
  if (!c.url || !c.token || !c.code) return res.status(503).json({ error: "not_set_up" });

  const body = typeof req.body === "string" ? (() => { try { return JSON.parse(req.body); } catch (e) { return {}; } })() : (req.body || {});
  const code = String((req.method === "GET" ? req.query.code : body.code) || "").trim().toUpperCase();
  if (code !== c.code) return res.status(403).json({ error: "bad_code" });

  try {
    if (req.method === "GET") {
      const [{ result }] = await redis(c, [["HGETALL", KEY]]);
      const players = [];
      for (let i = 0; i < (result || []).length; i += 2) {
        try { players.push(JSON.parse(result[i + 1])); } catch (e) { /* skip */ }
      }
      return res.status(200).json({ players });
    }

    const id = str(body.id, 32, /^[a-f0-9]{8,32}$/);
    if (!id) return res.status(400).json({ error: "bad_id" });

    if (req.method === "DELETE") {
      await redis(c, [["HDEL", KEY, id]]);
      return res.status(200).json({ ok: true });
    }

    if (req.method === "POST") {
      const name = str(body.name, 20).replace(/[<>]/g, "") || "Player";
      const row = {
        id, name,
        avatar: cleanAvatar(body.avatar),
        week: str(body.week, 10, DAY),
        weekMin: int(body.weekMin, 7 * 24 * 60),
        streak: int(body.streak, 400),
        lastDay: str(body.lastDay, 10, DAY),
        xp: int(body.xp, 10000000),
        at: Date.now()
      };
      await redis(c, [["HSET", KEY, id, JSON.stringify(row)]]);
      return res.status(200).json({ ok: true });
    }

    res.setHeader("Allow", "GET, POST, DELETE");
    return res.status(405).json({ error: "method" });
  } catch (e) {
    return res.status(502).json({ error: "storage" });
  }
};
