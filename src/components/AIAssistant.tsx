"use client";

import { useEffect, useRef, useState } from "react";
import { brand, formatPrice } from "@/config/brand";
import { menu, type MenuItem } from "@/config/menu";
import { branches, faqs } from "@/config/content";
import { useCart } from "@/lib/cart";
import { IconSpark, IconX } from "./Icons";

/**
 * "What should I order?" assistant.
 * DEMO: local keyword matching over the menu tags + FAQs (no API needed).
 * PRODUCTION: swap `reply()` for a call to an AI API with the menu + FAQs as context.
 */
type Msg = { from: "bot" | "user"; text: string; items?: MenuItem[] };

const intents: { words: string[]; tag: string }[] = [
  { words: ["spicy", "hot", "fire", "chilli", "chili", "tez", "mirch"], tag: "spicy" },
  { words: ["filling", "hungry", "big", "heavy", "starving", "bhook"], tag: "filling" },
  { words: ["light", "small", "snack", "diet"], tag: "light" },
  { words: ["sweet", "dessert", "chocolate", "meetha"], tag: "sweet" },
  { words: ["cheese", "cheesy"], tag: "cheesy" },
  { words: ["share", "sharing", "family", "group", "friends", "people"], tag: "sharing" },
  { words: ["veg", "vegetarian", "no meat"], tag: "veg" },
  { words: ["cheap", "budget", "value", "deal", "save"], tag: "value" },
  { words: ["kid", "kids", "children", "child"], tag: "kids" },
  { words: ["crispy", "crunchy", "fried"], tag: "crispy" },
];

function reply(q: string): Msg {
  const t = q.toLowerCase();

  // FAQs
  if (/(open|hours|time|close|timing)/.test(t))
    return { from: "bot", text: branches.map((b) => `${b.name}: ${b.hoursLabel}`).join("\n") };
  if (/(where|location|address|branch|near)/.test(t))
    return { from: "bot", text: branches.map((b) => `📍 ${b.name} — ${b.address}`).join("\n") };
  for (const f of faqs) {
    const key = f.q.toLowerCase().replace(/[^a-z ]/g, "").split(" ").filter((w) => w.length > 4);
    if (key.some((k) => t.includes(k))) return { from: "bot", text: f.a };
  }

  const tags = intents.filter((i) => i.words.some((w) => t.includes(w))).map((i) => i.tag);
  const budget = Number(t.match(/(\d{3,5})/)?.[1] ?? 0);

  let pool = menu.filter((m) => m.category !== "drinks");
  if (tags.length) {
    pool = pool
      .map((m) => ({ m, score: tags.filter((tg) => m.tags?.includes(tg)).length + (m.badges?.includes("Bestseller") ? 0.3 : 0) }))
      .filter((x) => x.score >= 1)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.m);
  } else {
    pool = pool.filter((m) => m.badges?.includes("Bestseller") || m.badges?.includes("Signature"));
  }
  if (budget) pool = pool.filter((m) => m.price <= budget);
  const picks = pool.slice(0, 3);

  if (!picks.length) return { from: "bot", text: "Hmm, nothing matches exactly. Try something like “spicy and filling” or “dessert under 600”." };
  const names = picks.map((p) => p.name);
  const lead = tags.length
    ? `Great choice. Try our ${names.slice(0, 2).join(" or ")}${names[2] ? ` — or the ${names[2]}` : ""}.`
    : `Our guests love these right now:`;
  return { from: "bot", text: lead, items: picks };
}

const starters = ["Something spicy and filling", "Feeding a family of 5", "Dessert under 600", "Are you open now?"];

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: `Salaam! I'm the ${brand.name} food assistant. Tell me what you're in the mood for and I'll pick something for you.` },
  ]);
  const { customize } = useCart();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [msgs, typing]);
  useEffect(() => {
    const openIt = () => setOpen(true);
    window.addEventListener("open-assistant", openIt);
    return () => window.removeEventListener("open-assistant", openIt);
  }, []);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setMsgs((m) => [...m, reply(text)]);
      setTyping(false);
    }, 650);
  };

  return (
    <>
      {/* On mobile/tablet the assistant opens from the Sparkles tab in the
         bottom nav bar instead — a floating button here would just be one
         more thing stacked above that bar. Desktop keeps its own trigger
         since there's no bottom nav there to fold it into. */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-30 hidden items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-bg shadow-2xl transition hover:scale-105 md:flex"
        aria-expanded={open}
        aria-controls="ai-panel"
      >
        <IconSpark className="h-4 w-4 text-accent" /> {open ? "Close" : "What should I order?"}
      </button>

      {open && (
        <section
          id="ai-panel"
          aria-label="Food assistant"
          className="fixed inset-x-3 bottom-20 z-40 flex max-h-[70vh] flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl md:inset-x-auto md:bottom-24 md:right-6 md:w-96"
        >
          <header className="flex items-center justify-between border-b border-line px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-accent/15 text-accent"><IconSpark className="h-4 w-4" /></span>
              <div>
                <p className="text-sm font-semibold">Food assistant</p>
                <p className="text-[11px] text-muted">AI-powered menu guide</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close assistant" className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/5"><IconX className="h-4 w-4" /></button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === "user" ? "flex justify-end" : ""}>
                <div className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm ${m.from === "user" ? "bg-accent text-accent-ink" : "bg-bg"}`}>
                  {m.text}
                </div>
                {m.items && (
                  <div className="mt-2 space-y-2">
                    {m.items.map((it) => (
                      <button key={it.id} onClick={() => customize(it.id)} className="flex w-full items-center justify-between rounded-xl border border-line px-3 py-2 text-left text-sm hover:border-accent">
                        <span>
                          <span className="font-medium">{it.name}</span>
                          <span className="block text-xs text-muted">{it.description.slice(0, 48)}…</span>
                        </span>
                        <span className="ml-3 whitespace-nowrap text-xs font-semibold text-accent">{formatPrice(it.price)} +</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {typing && <div className="w-14 rounded-2xl bg-bg px-4 py-2.5 text-sm text-muted">•••</div>}
            <div ref={endRef} />
          </div>

          {msgs.length < 3 && (
            <div className="flex gap-2 overflow-x-auto px-4 pb-2 no-scrollbar">
              {starters.map((s) => (
                <button key={s} onClick={() => send(s)} className="whitespace-nowrap rounded-full border border-line px-3 py-1.5 text-xs hover:border-accent">{s}</button>
              ))}
            </div>
          )}
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 border-t border-line p-3">
            <label htmlFor="ai-input" className="sr-only">Ask the assistant</label>
            <input id="ai-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="I want something spicy…" className="flex-1 rounded-full border border-line bg-bg px-4 py-2.5 text-sm" />
            <button className="rounded-full bg-accent px-4 text-sm font-semibold text-accent-ink">Send</button>
          </form>
        </section>
      )}
    </>
  );
}
