import {
  Users,
  RefreshCcw,
  UserCheck,
  MessageSquare,
  Video,
  EyeOff,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";

export default function Teams() {
  useEffect(() => {
    document.title = "Teams | Clone Cal";
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-slate-200">
      <Sidebar />

      {/* MAIN */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 lg:ml-64 space-y-10">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-white">Teams</h1>
            <p className="text-sm text-slate-400 mt-1">
              Create and manage teams to use collaborative features.
            </p>
          </div>

          <Link
            to="/create"
            className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-200 transition"
          >
            <Plus size={16} /> New
          </Link>
        </div>

        {/* HERO */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a1a] via-[#141414] to-[#0f0f0f] border border-[#3c3c3c]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8 lg:p-10 items-center">
            {/* LEFT */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Cal.com is better with teams
              </h2>
              <p className="text-slate-400 max-w-lg leading-relaxed">
                Add your team members to event types. Use collective scheduling
                or round robin to find the best available person.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-6">
                <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-slate-200 transition">
                  Create team
                </button>
                <button className="text-sm text-slate-400 hover:text-white">
                  Learn more
                </button>
              </div>
            </div>

            {/* RIGHT PREVIEW */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white text-black rounded-xl w-full max-w-sm shadow-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex -space-x-2">
                    <img
                      src="https://i.pravatar.cc/32?img=1"
                      className="h-6 w-6 rounded-full border"
                      alt=""
                    />
                    <img
                      src="https://i.pravatar.cc/32?img=2"
                      className="h-6 w-6 rounded-full border"
                      alt=""
                    />
                    <img
                      src="https://i.pravatar.cc/32?img=3"
                      className="h-6 w-6 rounded-full border"
                      alt=""
                    />
                  </div>
                  <span className="text-sm text-slate-500">Acme Inc.</span>
                </div>

                <h3 className="text-lg font-semibold mb-2">Sales demo</h3>
                <p className="text-sm text-slate-600 mb-1">
                  Friday, August 30, 2021
                </p>
                <p className="text-sm text-slate-600">9:00 am – 10:00 am</p>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Feature
            icon={<Users className="text-red-400" />}
            title="Collective Scheduling"
            desc="Book your team when everyone is available."
          />
          <Feature
            icon={<RefreshCcw className="text-blue-400" />}
            title="Round Robin"
            desc="Automatically rotate bookings across your team."
          />
          <Feature
            icon={<UserCheck className="text-green-400" />}
            title="Fixed round robin"
            desc="Add a fixed attendee with rotating participants."
          />
          <Feature
            icon={<MessageSquare className="text-orange-400" />}
            title="Send SMS to attendee"
            desc="Send automated SMS reminders to attendees."
          />
          <Feature
            icon={<Video className="text-purple-400" />}
            title="Cal Video recordings"
            desc="Meeting recordings available on Teams plans."
          />
          <Feature
            icon={<EyeOff className="text-slate-400" />}
            title="Disable branding"
            desc="Remove Cal.com branding from public pages."
          />
        </div>

        {/* FOOTER TIP */}
        <div className="mt-10 text-xs text-slate-500 text-center max-w-2xl mx-auto">
          Tip: You can add a “+” between usernames — cal.com/anna+brien — to
          create dynamic group meetings.
        </div>
      </main>
    </div>
  );
}

/* FEATURE CARD */
function Feature({ icon, title, desc }) {
  return (
    <div className="bg-[#111] border border-[#3c3c3c] rounded-xl p-5 hover:border-[#171717] transition">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-9 w-9 rounded-full bg-[#1a1a1a] flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-semibold text-white text-sm">{title}</h3>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}
