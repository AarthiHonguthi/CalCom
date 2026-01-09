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

      {/* MAIN */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 lg:ml-64">
        {/* PAGE HEADER */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-white">Insights</h1>
          <p className="text-sm text-slate-400 mt-1">
            View booking insights across your events
          </p>
        </div>

        {/* HERO */}
        <div className="relative rounded-2xl bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border border-[#3c3c3c] p-6 md:p-8 mb-10 overflow-hidden">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold text-white mb-3">
              Make informed decisions with Insights
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Our Insights dashboard surfaces activity across your team and
              highlights trends for better scheduling decisions.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-200">
                Create team
              </button>
              <button className="text-sm text-slate-400 hover:text-white">
                Learn more
              </button>
            </div>
          </div>

          {/* STATS (DESKTOP FLOATING) */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex gap-4">
            <StatCard title="Bookings" value="32%" icon={<TrendingUp />} />
            <StatCard title="Canceled" value="2%" icon={<TrendingDown />} />
            <StatCard title="Most booked" value="321" icon={<Star />} />
          </div>
        </div>

        {/* STATS (MOBILE / TABLET) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 lg:hidden">
          <StatCard title="Bookings" value="32%" icon={<TrendingUp />} />
          <StatCard title="Canceled" value="2%" icon={<TrendingDown />} />
          <StatCard title="Most booked" value="321" icon={<Star />} />
        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
          <FeatureCard
            icon={<Users />}
            title="View bookings across all members"
            description="See who is receiving the most bookings and ensure even distribution across your team."
          />

          <FeatureCard
            icon={<BarChart3 />}
            title="Identify booking trends"
            description="Understand popular times of the week and day for your bookers."
          />

          <FeatureCard
            icon={<Star />}
            title="Spot popular event types"
            description="Discover which event types receive the most engagement."
          />
        </div>
      </main>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-[#111] border border-[#3c3c3c] rounded-xl px-5 py-4 flex justify-between items-center">
      <div>
        <div className="text-xs text-slate-400 mb-1">{title}</div>
        <div className="text-2xl font-semibold text-white">{value}</div>
      </div>
      <div className="text-slate-400">{icon}</div>
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
