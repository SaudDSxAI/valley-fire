import type { Metadata } from "next";
import { AdminPanel } from "./AdminPanel";

export const metadata: Metadata = { title: "Admin / CMS (Demo)", robots: { index: false } };

export default function Admin() {
  return <AdminPanel />;
}
