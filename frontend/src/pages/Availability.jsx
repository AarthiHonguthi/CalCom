import { MoreHorizontal, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Availability() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-slate-200">
      <Sidebar />

      <main className="ml-64 px-8 py-6">
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">Availability</h1>
            <p className="text-sm text-slate-400 mt-1">
              Configure times when you are available for bookings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm rounded-md bg-[#1a1a1a] text-white">
              My Availability
            </button>
            <button className="px-3 py-1.5 text-sm rounded-md text-slate-400 hover:text-white">
              Team Availability
            </button>
            <button className="ml-2 px-3 py-1.5 text-sm rounded-md bg-white text-black font-medium">
              + New
            </button>
          </div>
        </div>

        {/* AVAILABILITY CARD */}
        <div
          onClick={() => navigate("/availability/1")}
          className="cursor-pointer bg-[#111] border border-[#3c3c3c] rounded-xl px-6 py-5 flex items-center justify-between hover:border-[#171717] transition"
        >
          {/* LEFT */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-white">Aarthi Honguthi</h3>
              <span className="text-xs px-2 py-0.5 rounded bg-[#1a1a1a] text-slate-300">
                Default
              </span>
            </div>

            <div className="text-sm text-slate-400">
              Mon – Fri, 9:00 AM – 5:00 PM
            </div>

            <div className="flex items-center gap-1 mt-1 text-sm text-slate-400">
              <Globe size={14} />
              Europe/London
            </div>
          </div>

          {/* RIGHT */}
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-9 h-9 flex items-center justify-center rounded-md border border-slate-700 hover:bg-[#1f1f1f]"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>

        {/* FOOTER LINK */}
        <div className="mt-8 text-sm text-slate-400 text-center">
          Temporarily Out-Of-Office?{" "}
          <span className="underline cursor-pointer hover:text-white">
            Add a redirect
          </span>
        </div>
      </main>
    </div>
  );
}
