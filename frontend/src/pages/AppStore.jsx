import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  Search,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Video,
  BarChart3,
  Wand2,
  Grid3X3,
  Puzzle,
} from "lucide-react";

/**
 * NOTE:
 * - This page assumes Sidebar is fixed and width is 256px (w-64).
 * - That’s why main uses ml-64.
 * - If your Sidebar width differs, update ml-64 accordingly.
 */

const CATEGORIES = [
  {
    key: "conferencing",
    title: "Conferencing",
    count: "26 Apps",
    Icon: Video,
  },
  {
    key: "automation",
    title: "Automation",
    count: "19 Apps",
    Icon: Wand2,
  },
  {
    key: "analytics",
    title: "Analytics",
    count: "11 Apps",
    Icon: BarChart3,
  },
  {
    key: "other",
    title: "Other",
    count: "11 Apps",
    Icon: Puzzle,
  },
  {
    key: "calendar",
    title: "Calendar",
    count: "10 Apps",
    Icon: Calendar,
  },
];

const MOST_POPULAR = [
  {
    id: "google-calendar",
    name: "Google Calendar",
    desc: "Google Calendar is a time management and scheduling service developed by Google. Allows users to create and edit events, with options available for type and time. Available to anyone that has a Gmail account on both mobile and web versions.",
    logoType: "gc",
  },
  {
    id: "google-meet",
    name: "Google Meet",
    desc: "Google Meet is Google's web-based video conferencing platform, designed to compete with major conferencing platforms.",
    logoType: "gm",
  },
  {
    id: "zoom",
    name: "Zoom Video",
    desc: "Zoom is a secure and reliable video platform that supports online communication needs. It can provide meetings, chat, phone, webinars, and large-scale online events.",
    logoType: "zoom",
  },
];

const RECENTLY_ADDED = [
  {
    id: "btcpayserver",
    name: "BTCPayServer",
    desc: "BTCPay Server is a self-hosted open source Bitcoin payment processor. Start receiving bitcoin payments for your events and bookings.",
    logoType: "btc",
  },
  {
    id: "dub",
    name: "Dub",
    desc: "Dub is the modern link attribution platform for you to create short links, track conversion analytics, and run affiliate programs.",
    logoType: "dub",
  },
  {
    id: "lindy",
    name: "Lindy",
    desc: "Build AI agents in minutes to automate workflows, save time and grow your business.",
    logoType: "lindy",
  },
];

function AppLogo({ type }) {
  // tiny dummy logos that resemble the screenshot cards
  const common =
    "h-12 w-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/5";
  if (type === "gc")
    return (
      <div className={common}>
        <div className="h-8 w-8 rounded-md bg-white text-black flex items-center justify-center text-xs font-black">
          31
        </div>
      </div>
    );
  if (type === "gm")
    return (
      <div className={common}>
        <div className="h-8 w-8 rounded-md bg-white/10 flex items-center justify-center">
          <div className="h-6 w-6 rounded bg-white text-black flex items-center justify-center text-[10px] font-black">
            M
          </div>
        </div>
      </div>
    );
  if (type === "zoom")
    return (
      <div className={common}>
        <div className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-black">
          Z
        </div>
      </div>
    );
  if (type === "btc")
    return (
      <div className={common}>
        <div className="h-8 w-8 rounded-md bg-white text-black flex items-center justify-center text-[10px] font-black">
          ₿
        </div>
      </div>
    );
  if (type === "dub")
    return (
      <div className={common}>
        <div className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-black">
          d
        </div>
      </div>
    );
  if (type === "lindy")
    return (
      <div className={common}>
        <div className="h-8 w-8 rounded-md bg-white text-black flex items-center justify-center text-[10px] font-black">
          ◇
        </div>
      </div>
    );
  return (
    <div className={common}>
      <Grid3X3 className="h-5 w-5 text-white/70" />
    </div>
  );
}

export default function AppsStore() {
  const [q, setQ] = useState("");

  const filteredPopular = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return MOST_POPULAR;
    return MOST_POPULAR.filter(
      (a) =>
        a.name.toLowerCase().includes(s) || a.desc.toLowerCase().includes(s)
    );
  }, [q]);

  const filteredRecent = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return RECENTLY_ADDED;
    return RECENTLY_ADDED.filter(
      (a) =>
        a.name.toLowerCase().includes(s) || a.desc.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      {/* Keep your existing Sidebar */}
      <Sidebar />

      {/* MAIN — this is the missing part in your white page */}
      <main className="ml-64 min-h-screen px-8 py-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl font-semibold">App Store</h1>
            <p className="mt-1 text-sm text-white/70">
              Connecting people, technology and the workplace.
            </p>
          </div>

          <div className="relative w-full max-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 py-2 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/20"
            />
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mt-10 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white/90">
            Featured Categories
          </h2>

          <div className="flex items-center gap-2 text-white/60">
            <button className="h-8 w-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button className="h-8 w-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES.map(({ key, title, count, Icon }) => (
            <div
              key={key}
              className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/7 transition overflow-hidden"
            >
              <div className="h-28 relative">
                {/* subtle gradient panel like screenshot */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0" />
                <div className="absolute left-5 top-5 h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-white/80" />
                </div>
              </div>
              <div className="px-5 pb-4">
                <div className="text-sm font-semibold">{title}</div>
                <div className="mt-1 text-xs text-white/60">
                  {count} <span className="ml-1">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Most Popular */}
        <div className="mt-10 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white/90">Most Popular</h2>

          <div className="flex items-center gap-2 text-white/60">
            <button className="h-8 w-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button className="h-8 w-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {filteredPopular.map((app) => (
            <div
              key={app.id}
              className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
            >
              <div className="p-5">
                <AppLogo type={app.logoType} />
                <div className="mt-4 text-base font-semibold">{app.name}</div>
                <p className="mt-2 text-sm text-white/70 line-clamp-4">
                  {app.desc}
                </p>
              </div>

              <div className="px-5 pb-5">
                <Link
                  to={`/apps/${app.id}`}
                  className="block w-full text-center rounded-xl border border-white/10 bg-white/0 hover:bg-white/10 py-2 text-sm text-white/90"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Recently added */}
        <div className="mt-12 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white/90">
            Recently added
          </h2>

          <div className="flex items-center gap-2 text-white/60">
            <button className="h-8 w-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button className="h-8 w-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-5 pb-10">
          {filteredRecent.map((app) => (
            <div
              key={app.id}
              className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
            >
              <div className="p-5">
                <AppLogo type={app.logoType} />
                <div className="mt-4 text-base font-semibold">{app.name}</div>
                <p className="mt-2 text-sm text-white/70 line-clamp-3">
                  {app.desc}
                </p>
              </div>
              <div className="px-5 pb-5">
                <Link
                  to={`/apps/${app.id}`}
                  className="block w-full text-center rounded-xl border border-white/10 hover:bg-white/10 py-2 text-sm"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
