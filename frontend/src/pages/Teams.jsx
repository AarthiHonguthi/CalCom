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

      <main className="ml-64 px-6 py-6 space-y-10">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-white">Teams</h1>
            <p className="text-sm text-slate-400 mt-1">
              Create and manage teams to use collaborative features.
            </p>
          </div>

          <Link
            to="/create"
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-200 transition"
          >
            <Plus size={16} /> New
          </Link>
        </div>

        {/* HERO */}
        <div className="px-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a1a] via-[#141414] to-[#0f0f0f] border border-[#3c3c3c]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-10 items-center">
              {/* LEFT CONTENT */}
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Cal.com is better with teams
                </h2>
                <p className="text-slate-400 max-w-lg leading-relaxed">
                  Add your team members to your event types. Use collective
                  scheduling to include everyone or find the most suitable
                  person with round robin scheduling.
                </p>

                <div className="flex items-center gap-4 mt-6">
                  <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-slate-200 transition">
                    Create team
                  </button>
                  <button className="text-sm text-slate-400 hover:text-white">
                    Learn more
                  </button>
                </div>
              </div>

              {/* RIGHT PREVIEW CARD */}
              <div className="flex justify-center lg:justify-end">
                <div className="bg-white text-black rounded-xl w-full max-w-sm shadow-2xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex -space-x-2">
                      <img
                        src="https://i.pravatar.cc/32?img=1"
                        className="h-6 w-6 rounded-full border"
                      />
                      <img
                        src="https://i.pravatar.cc/32?img=2"
                        className="h-6 w-6 rounded-full border"
                      />
                      <img
                        src="https://i.pravatar.cc/32?img=3"
                        className="h-6 w-6 rounded-full border"
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
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Feature
            icon={<Users className="text-red-400" />}
            title="Collective Scheduling"
            desc="Make it easy to book your team when everyone is available."
          />

          <Feature
            icon={<RefreshCcw className="text-blue-400" />}
            title="Round Robin"
            desc="Find the best person available and cycle through your team."
          />

          <Feature
            icon={<UserCheck className="text-green-400" />}
            title="Fixed round robin"
            desc="Add one fixed attendee and round robin through a number of attendees."
          />

          <Feature
            icon={<MessageSquare className="text-orange-400" />}
            title="Send SMS to attendee"
            desc="Easily send meeting reminders via SMS to your attendees."
          />

          <Feature
            icon={<Video className="text-purple-400" />}
            title="Cal Video Recordings"
            desc="Recordings are only available as part of our teams plan."
          />

          <Feature
            icon={<EyeOff className="text-slate-400" />}
            title="Disable Cal.com branding"
            desc="Hide all Cal.com branding from your public pages."
          />
        </div>

        {/* FOOTER TIP */}
        <div className="mt-10 text-xs text-slate-500 text-center">
          Tip: You can add a “+” between usernames: cal.com/anna+brien to make a
          dynamic group meeting
        </div>
      </main>
    </div>
  );
}

/* ----------------- Feature Card ----------------- */
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
