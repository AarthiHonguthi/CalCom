import { useMemo, useState, useEffect } from "react";
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

const CATEGORIES = [
  { key: "conferencing", title: "Conferencing", count: "26 Apps", Icon: Video },
  { key: "automation", title: "Automation", count: "19 Apps", Icon: Wand2 },
  { key: "analytics", title: "Analytics", count: "11 Apps", Icon: BarChart3 },
  { key: "other", title: "Other", count: "11 Apps", Icon: Puzzle },
  { key: "calendar", title: "Calendar", count: "10 Apps", Icon: Calendar },
];

const MOST_POPULAR = [
  {
    id: "google-calendar",
    name: "Google Calendar",
    desc: "Google Calendar is a time management and scheduling service developed by Google.",
    logoType: "gc",
  },
  {
    id: "google-meet",
    name: "Google Meet",
    desc: "Google Meet is Google's web-based video conferencing platform.",
    logoType: "gm",
  },
  {
    id: "zoom",
    name: "Zoom Video",
    desc: "Zoom is a secure and reliable video platform.",
    logoType: "zoom",
  },
];

const RECENTLY_ADDED = [
  {
    id: "btcpayserver",
    name: "BTCPayServer",
    desc: "Self-hosted Bitcoin payment processor.",
    logoType: "btc",
  },
  {
    id: "dub",
    name: "Dub",
    desc: "Modern link attribution platform.",
    logoType: "dub",
  },
  {
    id: "lindy",
    name: "Lindy",
    desc: "Build AI agents in minutes.",
    logoType: "lindy",
  },
];

function AppLogo({ type }) {
  const base =
    "h-12 w-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/5";
  const map = {
    gc: "31",
    gm: "M",
    zoom: "Z",
    btc: "₿",
    dub: "d",
    lindy: "◇",
  };

  return (
    <div className={base}>
      {map[type] ? (
        <div className="h-8 w-8 rounded-md bg-white text-black flex items-center justify-center text-xs font-black">
          {map[type]}
        </div>
      ) : (
        <Grid3X3 className="h-5 w-5 text-white/70" />
      )}
    </div>
  );
}

export default function AppsStore() {
  const [q, setQ] = useState("");

  useEffect(() => {
    document.title = "App Store | Clone Cal";
  }, []);

  const filteredPopular = useMemo(() => {
    const s = q.toLowerCase();
    return MOST_POPULAR.filter(
      (a) =>
        a.name.toLowerCase().includes(s) || a.desc.toLowerCase().includes(s)
    );
  }, [q]);

  const filteredRecent = useMemo(() => {
    const s = q.toLowerCase();
    return RECENTLY_ADDED.filter(
      (a) =>
        a.name.toLowerCase().includes(s) || a.desc.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex">
      {/* SIDEBAR */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* MAIN */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:ml-64">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">App Store</h1>
            <p className="mt-1 text-sm text-white/70">
              Connecting people, technology and the workplace.
            </p>
          </div>

          <div className="relative w-full sm:max-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 py-2 text-sm placeholder:text-white/50 outline-none"
            />
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="mt-10">
          <h2 className="text-sm font-semibold mb-4">Featured Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map(({ key, title, count, Icon }) => (
              <div
                key={key}
                className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                <div className="h-24 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-white/80" />
                </div>
                <div className="px-4 pb-4">
                  <div className="text-sm font-semibold">{title}</div>
                  <div className="text-xs text-white/60">{count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MOST POPULAR */}
        <div className="mt-12">
          <h2 className="text-sm font-semibold mb-4">Most Popular</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPopular.map((app) => (
              <div
                key={app.id}
                className="rounded-2xl border border-white/10 bg-white/5"
              >
                <div className="p-5">
                  <AppLogo type={app.logoType} />
                  <div className="mt-4 font-semibold">{app.name}</div>
                  <p className="mt-2 text-sm text-white/70 line-clamp-4">
                    {app.desc}
                  </p>
                </div>
                <div className="px-5 pb-5">
                  <Link
                    to={`/apps/${app.id}`}
                    className="block text-center rounded-xl border border-white/10 hover:bg-white/10 py-2 text-sm"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENTLY ADDED */}
        <div className="mt-12">
          <h2 className="text-sm font-semibold mb-4">Recently added</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-10">
            {filteredRecent.map((app) => (
              <div
                key={app.id}
                className="rounded-2xl border border-white/10 bg-white/5"
              >
                <div className="p-5">
                  <AppLogo type={app.logoType} />
                  <div className="mt-4 font-semibold">{app.name}</div>
                  <p className="mt-2 text-sm text-white/70 line-clamp-3">
                    {app.desc}
                  </p>
                </div>
                <div className="px-5 pb-5">
                  <Link
                    to={`/apps/${app.id}`}
                    className="block text-center rounded-xl border border-white/10 hover:bg-white/10 py-2 text-sm"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
