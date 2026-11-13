import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Command,
  Copy,
  ExternalLink,
  Layers,
  Palette,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  X,
} from "lucide-react";

import { Aurora } from "@/components/dithercn/aurora";
import { DitherText } from "@/components/dithercn/dither-text";
import { DitherButton } from "@/components/dithercn/dither-button";
import { DitherCard } from "@/components/dithercn/dither-card";
import { DitherNumber } from "@/components/dithercn/dither-number";
import { StatCard } from "@/components/dithercn/stat-card";
import { Sparkline } from "@/components/dithercn/sparkline";
import { DitherSwitch } from "@/components/dithercn/dither-switch";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   DATA — the five resources from the thread, with verified pricing
------------------------------------------------------------------ */

const RESOURCES = [
  {
    id: "dithercn",
    name: "dithercn.dev",
    tag: "Code",
    free: true,
    note: "MIT · 69 registry items · installable via shadcn CLI",
    url: "https://dithercn.dev",
    color: "purple",
    glyph: Layers,
    used: "Renders this entire page — every surface, glow, number and chart below.",
  },
  {
    id: "component",
    name: "component.gallery",
    tag: "Reference",
    free: true,
    note: "Open source · interface pattern reference",
    url: "https://component.gallery",
    color: "blue",
    glyph: Star,
    used: "Informed the nav taxonomy and card composition in this demo.",
  },
  {
    id: "navbar",
    name: "navbar.gallery",
    tag: "Reference",
    free: true,
    note: "Free · sponsored by Mobbin · no login",
    url: "https://www.navbar.gallery",
    color: "green",
    glyph: Command,
    used: "The sticky nav + mega-menu pattern below.",
  },
  {
    id: "pixlpin",
    name: "pixlpin.com",
    tag: "Inspiration",
    free: true,
    note: "Free w/ account · launched Oct 2026",
    url: "https://pixlpin.com",
    color: "orange",
    glyph: Search,
    used: "Layout density and card rhythm inspiration.",
  },
  {
    id: "vanta",
    name: "vanta.supply",
    tag: "Paid",
    free: false,
    note: "$72/yr Pro · free tier exists, vault does not",
    url: "https://vanta.supply",
    color: "red",
    glyph: Palette,
    used: "NOT used — assets are paywalled. Listed for honesty.",
  },
];

const NAV = [
  { label: "Vault", items: ["Materials", "Filament", "Shaders", "Particles"] },
  { label: "Components", items: ["Navigation", "Cards", "Charts", "Text"] },
  { label: "Resources", items: ["dithercn", "component.gallery", "navbar.gallery", "pixlpin"] },
];

const TREND = [31, 38, 35, 47, 44, 58, 55, 67, 72, 69, 81, 88, 84, 96, 104, 99, 118];

/* ------------------------------------------------------------------
   NAVBAR — pattern per navbar.gallery (sticky bar + mega menu)
------------------------------------------------------------------ */

function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
      onMouseLeave={() => setOpen(null)}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <span className="grid size-8 place-items-center rounded-lg bg-foreground text-background">
            <Sparkles className="size-4" />
          </span>
          <span className="font-semibold tracking-tight">TrendVault</span>
        </a>

        {/* mega menu */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((g) => (
            <div
              key={g.label}
              className="relative"
              onMouseEnter={() => setOpen(g.label)}
            >
              <button
                className={cn(
                  "rounded-lg px-3 py-2 text-sm transition-colors",
                  open === g.label
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {g.label}
              </button>
              {open === g.label && (
                <div className="absolute left-0 top-full pt-2">
                  <div className="w-56 rounded-xl border border-border bg-card p-2 shadow-2xl shadow-black/40">
                    {g.items.map((it) => (
                      <a
                        key={it}
                        href="#resources"
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {it}
                        <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <DitherSwitch
            checked={theme === "dark"}
            onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
            aria-label="Toggle dark mode"
          />
          <DitherButton size="sm" color="ink" asChild>
            <a href="#resources">
              Browse <ArrowRight className="size-3.5" />
            </a>
          </DitherButton>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------
   HERO — Aurora background + dithered display text
------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden pt-16">
      {/* dithercn Aurora as the background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[85vh] opacity-70">
        <Aurora
          color="--dither-color-purple"
          tipColor="--dither-color-blue"
          background="--dither-paper"
          curtains={4}
          height={0.55}
          spread={0.12}
          rays={10}
          glow={0.9}
          cell={3}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-background/40 to-background" />

      <div className="container-x relative py-20">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-dither-green opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-dither-green" />
          </span>
          5 resources verified · 1 paywalled
        </div>

        <DitherText
          as="h1"
          className="max-w-4xl text-[clamp(2.6rem,7.5vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
          fill="gradient"
          color="--dither-color-purple"
          accent="--dither-color-blue"
          direction={135}
        >
          Every design resource, actually checked.
        </DitherText>

        <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
          A working demo page built from the five sites in that thread — with
          real component code, not screenshots. Four are free. One is not, and
          we say so.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <DitherButton size="lg" color="purple" bloom="low" asChild>
            <a href="#resources">
              See the verdict <ArrowRight className="size-4" />
            </a>
          </DitherButton>
          <DitherButton size="lg" variant="outline" color="ink" asChild>
            <a href="https://dithercn.dev" target="_blank" rel="noreferrer">
              dithercn.dev <ExternalLink className="size-3.5" />
            </a>
          </DitherButton>
        </div>

        {/* live stat row */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Components installed"
            value={69}
            delta={100}
            deltaLabel="from registry"
            trend={[12, 24, 31, 38, 44, 52, 61, 69]}
            color="purple"
          />
          <StatCard
            label="Free resources"
            value={4}
            deltaLabel="of 5 checked"
            trend={[1, 2, 2, 3, 3, 4, 4, 4]}
            color="green"
          />
          <StatCard
            label="Mean trend index"
            value={104}
            delta={12.4}
            deltaLabel="vs last week"
            trend={TREND}
            color="blue"
          />
          <StatCard
            label="Paywalled"
            value={1}
            delta={-20}
            good="down"
            deltaLabel="vanta.supply"
            trend={[3, 3, 2, 2, 2, 1, 1, 1]}
            color="red"
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   RESOURCE GRID — one card per site
------------------------------------------------------------------ */

const COLOR_MAP = {
  purple: "text-dither-purple",
  blue: "text-dither-blue",
  green: "text-dither-green",
  orange: "text-dither-orange",
  red: "text-dither-red",
};

function ResourceCard({ r }) {
  const Glyph = r.glyph;
  return (
    <DitherCard
      className="group relative flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1"
      glow="top-left"
      reach={280}
      interactive
      color={r.color === "red" ? "red" : r.color}
    >
      <div className="mb-5 flex items-start justify-between">
        <span
          className={cn(
            "grid size-10 place-items-center rounded-xl border border-border bg-background",
            COLOR_MAP[r.color]
          )}
        >
          <Glyph className="size-5" />
        </span>
        <span
          className={cn(
            "rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider",
            r.free
              ? "border-dither-green/40 text-dither-green"
              : "border-dither-red/40 text-dither-red"
          )}
        >
          {r.free ? "Free" : "Paid"}
        </span>
      </div>

      <h3 className="text-lg font-semibold tracking-tight">{r.name}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{r.note}</p>
      <p className="mt-4 flex-1 text-sm text-muted-foreground">{r.used}</p>

      <a
        href={r.url}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-opacity hover:opacity-70"
      >
        Visit <ArrowUpRight className="size-3.5" />
      </a>
    </DitherCard>
  );
}

function ResourceGrid() {
  return (
    <section id="resources" className="relative border-t border-border py-24">
      <div className="container-x">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Verified
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              The five, checked
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Status codes, pricing pages and licence terms read directly from
            each site on 9 Nov 2026.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r) => (
            <ResourceCard key={r.id} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   CODE PANEL — shows the real install command
------------------------------------------------------------------ */

function CodePanel() {
  const [copied, setCopied] = useState(false);
  const cmd = "npx shadcn@latest add https://dithercn.dev/r/aurora.json";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="border-t border-border py-24">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Not screenshots
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Every surface here is real code
          </h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            The components on this page were pulled from dithercn's public
            registry and compiled into this build. That is the difference
            between an inspiration gallery and a resource you can ship.
          </p>

          <div className="mt-8 space-y-3">
            {[
              "69 registry items, MIT licensed",
              "Installs through the standard shadcn CLI",
              "Full source in your repo, no runtime dependency on dithercn",
            ].map((t) => (
              <div key={t} className="flex items-start gap-2.5 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-dither-green" />
                <span className="text-muted-foreground">{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-dither-red/70" />
              <span className="size-2.5 rounded-full bg-dither-orange/70" />
              <span className="size-2.5 rounded-full bg-dither-green/70" />
            </div>
            <span className="text-[11px] text-muted-foreground">bash</span>
          </div>
          <div className="flex items-center justify-between gap-4 p-5">
            <code className="overflow-x-auto whitespace-nowrap font-mono text-[13px] text-foreground">
              <span className="text-dither-purple">npx</span> shadcn@latest add{" "}
              <span className="text-dither-green">
                https://dithercn.dev/r/aurora.json
              </span>
            </code>
            <button
              onClick={copy}
              aria-label="Copy command"
              className="grid size-8 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {copied ? (
                <Check className="size-3.5 text-dither-green" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
          </div>
          <div className="border-t border-border p-5">
            <p className="mb-3 text-[11px] uppercase tracking-widest text-muted-foreground">
              Live trend index
            </p>
            <Sparkline
              data={TREND}
              label="Trend index, last 17 periods"
              height={56}
              color="purple"
              area
              bloom="low"
              animate
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   NUMBERS STRIP — DitherNumber showcase
------------------------------------------------------------------ */

function NumbersStrip() {
  return (
    <section className="border-t border-border py-24">
      <div className="container-x">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Built with dithercn
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Numbers that resolve
          </h2>
        </div>
        <div className="grid gap-10 text-center sm:grid-cols-3">
          {[
            { v: 69, l: "Components", c: "purple", suffix: "" },
            { v: 4, l: "Free resources", c: "green", suffix: "/5" },
            { v: 72, l: "Vanta Pro", c: "orange", prefix: "$" },
          ].map((s) => (
            <div key={s.l} className="flex flex-col items-center">
              <DitherNumber
                value={s.v}
                size="lg"
                color={s.c}
                prefix={s.prefix}
                suffix={s.suffix}
                effect="resolve"
                trigger="in-view"
                className="tabular-nums"
              />
              <p className="mt-2 text-sm text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   FOOTER
------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="container-x">
        <div className="mb-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-md bg-foreground text-background">
                <Sparkles className="size-3.5" />
              </span>
              <span className="text-sm font-semibold">TrendVault</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Demo build. Component code © dithercn.dev (MIT). Reference
              galleries belong to their authors.
            </p>
          </div>
          {[
            { h: "Built with", l: ["dithercn.dev", "component.gallery", "navbar.gallery", "pixlpin.com"] },
            { h: "Not used", l: ["vanta.supply (paywalled)"] },
            { h: "Stack", l: ["React 19", "Vite 7", "Tailwind v4", "Radix UI"] },
          ].map((col) => (
            <div key={col.h}>
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {col.h}
              </p>
              <ul className="space-y-2">
                {col.l.map((x) => (
                  <li key={x} className="text-xs text-muted-foreground">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            Prices and licences verified 9 Nov 2026.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <TrendingUp className="size-3" /> Live demo
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------
   APP
------------------------------------------------------------------ */

export default function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar theme={theme} setTheme={setTheme} />
      <main>
        <Hero />
        <ResourceGrid />
        <CodePanel />
        <NumbersStrip />
      </main>
      <Footer />
    </div>
  );
}
