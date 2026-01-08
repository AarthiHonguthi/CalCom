import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

export default function PublicPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("https://calcom-kdz8.onrender.com/api/event-types/public/list")
      .then((res) => setEvents(res.data))
      .catch(() => setEvents([]));
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-slate-200">
      <Sidebar />

      <main className="ml-64 px-8 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-white">
            Public Event Types
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            These pages are visible to your visitors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((e) => (
            <div
              key={e.id}
              className="bg-[#111] border border-[#3c3c3c] rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {e.title}
                  </h3>
                  <div className="text-xs text-slate-400">
                    /{e.slug} • {e.duration}m
                  </div>
                </div>
                <Link
                  to={`/${e.slug}`}
                  className="text-sm text-slate-400 hover:text-white"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
