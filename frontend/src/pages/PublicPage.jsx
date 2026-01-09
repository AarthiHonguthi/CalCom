import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

export default function PublicPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    document.title = "Events | Clone Cal";
  }, []);

  useEffect(() => {
    axios
      .get("https://calcom-kdz8.onrender.com/api/event-types/public/list")
      .then((res) => setEvents(res.data))
      .catch(() => setEvents([]));
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-slate-200">
      <Sidebar />

      {/* MAIN */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 lg:ml-64">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-white">
            Public Event Types
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            These pages are visible to your visitors.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {events.map((e) => (
            <div
              key={e.id}
              className="bg-[#111] border border-[#3c3c3c] rounded-lg p-4 hover:border-[#171717] transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {e.title}
                  </h3>
                  <div className="mt-1 text-xs text-slate-400">
                    /{e.slug} • {e.duration}m
                  </div>
                </div>

                <Link
                  to={`/${e.slug}`}
                  className="text-sm text-slate-400 hover:text-white whitespace-nowrap"
                >
                  View
                </Link>
              </div>
            </div>
          ))}

          {events.length === 0 && (
            <div className="col-span-full text-center text-slate-500 py-20">
              No public event types available
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
