"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { menu, type MenuItem } from "@/config/menu";
import { branches } from "@/config/content";

export type CartLine = {
  key: string;
  id: string;
  name: string;
  unitPrice: number;
  qty: number;
  choices: string[];
  note?: string;
};

type Ctx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (line: Omit<CartLine, "key">) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  customizing: MenuItem | null;
  customize: (id: string) => void;
  closeCustomizer: () => void;
  branch: string;
  setBranch: (slug: string) => void;
  toast: string | null;
};

const CartContext = createContext<Ctx | null>(null);
const KEY = "ember-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [branch, setBranchState] = useState(branches[0].slug);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [customizing, setCustomizing] = useState<MenuItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (Array.isArray(s.lines)) setLines(s.lines);
        if (s.branch) setBranchState(s.branch);
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ lines, branch }));
    } catch {}
  }, [lines, branch, loaded]);

  const value = useMemo<Ctx>(() => {
    const flash = (msg: string) => {
      setToast(msg);
      window.setTimeout(() => setToast(null), 2200);
    };
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.unitPrice, 0),
      add: (line) => {
        const key = `${line.id}|${line.choices.join(",")}|${line.note ?? ""}`;
        setLines((prev) => {
          const found = prev.find((l) => l.key === key);
          if (found) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + line.qty } : l));
          return [...prev, { ...line, key }];
        });
        flash(`${line.name} added to your order`);
      },
      setQty: (key, qty) =>
        setLines((prev) => (qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l)))),
      clear: () => setLines([]),
      drawerOpen,
      setDrawerOpen,
      customizing,
      customize: (id) => setCustomizing(menu.find((m) => m.id === id) ?? null),
      closeCustomizer: () => setCustomizing(null),
      branch,
      setBranch: setBranchState,
      toast,
    };
  }, [lines, drawerOpen, customizing, branch, toast]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
