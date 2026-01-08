import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export default function Availability() {
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await axios.get("https://calcom-kdz8.onrender.com/api/availability");
        setSchedule(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAvailability();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex">
      {/* Sidebar */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main
        className="
          flex-1
          px-4 sm:px-6 lg:px-10
          py-6
          ml-0 lg:ml-64
        "
      >
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-semibold">Availability</h1>
            <p className="text-sm text-slate-400">
              Configure times when you are available for bookings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="px-4 py-1.5 rounded-full bg-[#1a1a1a] text-sm border border-slate-700">
              My Availability
            </button>
            <button className="px-4 py-1.5 rounded-full bg-[#0b0b0b] text-sm border border-slate-700 text-slate-400">
              Team Availability
            </button>

            <Link
              to="/create"
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-200 transition"
            >
              <Plus size={16} /> New
            </Link>
          </div>
        </div>

        {/* AVAILABILITY CARD */}
        <div className="w-full rounded-xl border border-slate-700/70 bg-gradient-to-r from-[#111] to-[#0e0e0e] px-7 py-6 flex items-center justify-between hover:border-slate-500 transition">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">Aarthi Honguthi</span>
              <span className="text-xs bg-[#1f1f1f] border border-slate-700 rounded-full px-2 py-0.5">
                Default
              </span>
            </div>

            <p className="text-sm text-slate-400">
              Mon – Fri, 9:00 AM – 5:00 PM
            </p>

            <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
              <span>🌍</span>
              <span>Europe/London</span>
            </div>
          </div>

          <button className="w-9 h-9 flex items-center justify-center rounded-md border border-slate-700 hover:bg-[#1f1f1f] transition">
            ⋯
          </button>
        </div>

        {/* OUT OF OFFICE */}
        <div className="mt-6 text-center text-sm text-slate-400">
          Temporarily Out-Of-Office?{" "}
          <span className="text-white underline cursor-pointer">
            Add a redirect
          </span>
        </div>
      </main>
    </div>
  );
}
