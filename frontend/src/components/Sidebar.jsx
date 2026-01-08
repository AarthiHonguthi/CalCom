import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Link as LinkIcon,
  Calendar,
  Clock,
  Users,
  Grid,
  Shuffle,
  Zap,
  BarChart2,
  ExternalLink,
  Copy,
  Settings,
  Search,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { section: "WORKFLOWS", label: "Workflows", icon: Zap, path: "/workflows" },

  { section: "EVENT TYPES", label: "Event Types", icon: LinkIcon, path: "/" },
  {
    section: "EVENT TYPES",
    label: "Bookings",
    icon: Calendar,
    path: "/bookings",
  },
  {
    section: "EVENT TYPES",
    label: "Availability",
    icon: Clock,
    path: "/availability",
  },

  { section: "APPS", label: "Apps", icon: Grid, path: "/apps" },
  { section: "APPS", label: "Teams", icon: Users, path: "/teams" },

  { section: "ROUTING", label: "Routing", icon: Shuffle, path: "/routing" },

  {
    section: "INSIGHTS",
    label: "Insights",
    icon: BarChart2,
    path: "/insights",
  },
];

export default function Sidebar({ events = [] }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Ctrl+K (Cmd+K on mac)
  useEffect(() => {
    const onKeyDown = (e) => {
      const isK = e.key.toLowerCase() === "k";
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      if (isCmdOrCtrl && isK) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      // focus after render
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const eventTypeItems = useMemo(() => {
    // These will appear in the palette under EVENT TYPES
    return (events || []).map((e) => ({
      section: "EVENT TYPES",
      label: e.title,
      meta: `/${e.slug}`,
      path: `/edit/${e.id}`, // change if you want to open preview instead
      icon: LinkIcon,
    }));
  }, [events]);

  const paletteItems = useMemo(() => {
    const all = [
      ...NAV_ITEMS,
      ...eventTypeItems,
      { section: "APPS", label: "App Store", icon: Grid, path: "/apps" },
    ];

    const q = query.trim().toLowerCase();
    if (!q) return all;

    return all.filter((item) => {
      const label = (item.label || "").toLowerCase();
      const meta = (item.meta || "").toLowerCase();
      return label.includes(q) || meta.includes(q);
    });
  }, [query, eventTypeItems]);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const item of paletteItems) {
      const sec = item.section || "OTHER";
      if (!map.has(sec)) map.set(sec, []);
      map.get(sec).push(item);
    }
    return Array.from(map.entries());
  }, [paletteItems]);

  const closeAndGo = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#171717] text-slate-300 flex flex-col">
        {/* TOP: user + search button */}
        <div className="px-4 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold text-black">
              AD
            </div>
            <span className="text-sm font-medium text-white">Admin</span>
          </div>

          {/* Search icon like Cal.com */}
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-md hover:bg-[#262626] text-slate-300 hover:text-white transition"
            title="Search (Ctrl+K)"
          >
            <Search size={16} />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {/* Main list like your screenshot */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
              ${
                isActive
                  ? "bg-[#404040] text-white"
                  : "hover:bg-[#262626] hover:text-white"
              }`
            }
          >
            <LinkIcon size={16} /> <span className="flex-1">Event Types</span>
          </NavLink>

          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
              ${
                isActive
                  ? "bg-[#404040] text-white"
                  : "hover:bg-[#262626] hover:text-white"
              }`
            }
          >
            <Calendar size={16} /> <span className="flex-1">Bookings</span>
          </NavLink>

          <NavLink
            to="/availability"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
              ${
                isActive
                  ? "bg-[#404040] text-white"
                  : "hover:bg-[#262626] hover:text-white"
              }`
            }
          >
            <Clock size={16} /> <span className="flex-1">Availability</span>
          </NavLink>

          <NavLink
            to="/teams"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
              ${
                isActive
                  ? "bg-[#404040] text-white"
                  : "hover:bg-[#262626] hover:text-white"
              }`
            }
          >
            <Users size={16} /> <span className="flex-1">Teams</span>
          </NavLink>

          <NavLink
            to="/apps"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
              ${
                isActive
                  ? "bg-[#404040] text-white"
                  : "hover:bg-[#262626] hover:text-white"
              }`
            }
          >
            <Grid size={16} /> <span className="flex-1">Apps</span>
          </NavLink>

          <NavLink
            to="/routing"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
              ${
                isActive
                  ? "bg-[#404040] text-white"
                  : "hover:bg-[#262626] hover:text-white"
              }`
            }
          >
            <Shuffle size={16} /> <span className="flex-1">Routing</span>
          </NavLink>

          <NavLink
            to="/workflows"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
             ${
               isActive
                 ? "bg-[#404040] text-white"
                 : "hover:bg-[#262626] hover:text-white"
             }`
            }
          >
            <Zap size={16} />
            <span className="flex-1">Workflows</span>
            <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded">
              AI
            </span>
          </NavLink>

          <NavLink
            to="/insights"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
              ${
                isActive
                  ? "bg-[#404040] text-white"
                  : "hover:bg-[#262626] hover:text-white"
              }`
            }
          >
            <BarChart2 size={16} /> <span className="flex-1">Insights</span>
          </NavLink>
        </nav>

        {/* FOOTER */}
        <div className="border-t border-slate-800 p-3 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-[#262626] rounded-md">
            <ExternalLink size={16} /> View public page
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-[#262626] rounded-md">
            <Copy size={16} /> Copy public page link
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-[#262626] rounded-md">
            <Settings size={16} /> Settings
          </button>
        </div>
      </aside>

      {/* COMMAND PALETTE MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-[999] bg-black/60 flex items-start justify-center p-6"
          onMouseDown={() => setOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-[#0b0b0b] border border-slate-800 rounded-xl shadow-2xl overflow-hidden"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800">
              <Search size={18} className="text-slate-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-transparent outline-none text-slate-200 placeholder:text-slate-500"
              />
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-md hover:bg-[#262626] text-slate-300 hover:text-white"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[420px] overflow-y-auto">
              {grouped.length === 0 ? (
                <div className="px-4 py-10 text-center text-slate-500 text-sm">
                  No results
                </div>
              ) : (
                grouped.map(([section, items]) => (
                  <div key={section} className="py-2">
                    <div className="px-4 py-2 text-xs font-semibold text-slate-400">
                      {section}
                    </div>
                    <div className="px-2">
                      {items.map((item) => {
                        const Icon = item.icon || LinkIcon;
                        return (
                          <button
                            key={`${section}-${item.label}-${item.path}`}
                            onClick={() => closeAndGo(item.path)}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-200 hover:bg-[#262626] transition text-left"
                          >
                            <Icon size={16} className="text-slate-400" />
                            <span className="flex-1">{item.label}</span>
                            {item.meta && (
                              <span className="text-xs text-slate-500">
                                {item.meta}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer hints */}
            <div className="px-4 py-2 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between">
              <span>Enter: Open</span>
              <span>Esc: Close • Ctrl+K: Toggle</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
