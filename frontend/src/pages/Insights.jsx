import { TrendingUp, TrendingDown, Users, BarChart3, Star } from "lucide-react";
import { useEffect } from "react";

import Sidebar from "../components/Sidebar";

export default function Insights() {
  useEffect(() => {
    document.title = "Insights | Clone Cal";
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-slate-200">
      <Sidebar />
      <main className="ml-64 px-8 py-8">
        {/* PAGE HEADER */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-white">Insights</h1>
          <p className="text-sm text-slate-400 mt-1">
            View booking insights across your events
          </p>
        </div>

        {/* HERO / BANNER */}
        <div className="relative rounded-2xl bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border border-[#3c3c3c] p-8 mb-10 overflow-hidden">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold text-white mb-3">
              Make informed decisions with Insights
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Our Insights dashboard surfaces all activity across your team and
              shows you trends that enable better team scheduling and decision
              making.
            </p>

            <div className="flex items-center gap-4">
              <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-200">
                Create team
              </button>
              <button className="text-sm text-slate-400 hover:text-white">
                Learn more
              </button>
            </div>
          </div>

          {/* FLOATING STATS */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex gap-4">
            <StatCard title="Bookings" value="32%" icon={<TrendingUp />} />
            <StatCard title="Canceled" value="2%" icon={<TrendingDown />} />
            <StatCard title="Most booked" value="321" icon={<Star />} />
          </div>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
          <FeatureCard
            icon={<Users />}
            title="View bookings across all members"
            description="See who's receiving the most bookings and ensure the best distribution across your team."
          />

          <FeatureCard
            icon={<BarChart3 />}
            title="Identify booking trends"
            description="See what times of the week and what times during the day are popular for your bookers."
          />

          <FeatureCard
            icon={<Star />}
            title="Spot popular event types"
            description="See which of your event types are receiving the most clicks and bookings."
          />
        </div>
      </main>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-[#111] border border-[#3c3c3c] rounded-xl px-5 py-4 min-w-[140px]">
      <div className="text-xs text-slate-400 mb-1">{title}</div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-semibold text-white">{value}</span>
        <span className="text-slate-400">{icon}</span>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-[#111] border border-[#3c3c3c] rounded-xl p-5 hover:border-[#171717] transition">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-md bg-[#1a1a1a] flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  );
}
