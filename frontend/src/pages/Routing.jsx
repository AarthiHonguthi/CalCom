import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import {
  FileText,
  Route,
  BarChart2,
  CheckCircle,
  Mail,
  Download,
} from "lucide-react";

export default function Routing() {
  useEffect(() => {
    document.title = "Routing | Clone Cal";
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <Sidebar />

      {/* MAIN */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 lg:ml-64">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold">Routing</h1>
          <p className="mt-1 text-sm text-white/60">
            Create forms to direct attendees to the correct destinations
          </p>
        </div>

        {/* HERO */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-white/0 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* LEFT */}
            <div className="flex-1 p-6 sm:p-8">
              <h2 className="text-xl font-semibold">Teams plan required</h2>
              <p className="mt-3 text-sm text-white/70 max-w-xl">
                Routing forms help route incoming leads to the right person.
                Upgrade to a Teams plan to access this feature.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button className="rounded-full bg-white text-black px-5 py-2 text-sm font-medium hover:bg-white/90">
                  Upgrade
                </button>
                <button className="text-sm text-white/70 hover:text-white">
                  Learn more
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative w-full lg:w-[420px] bg-white/5 border-t lg:border-t-0 lg:border-l border-white/10 flex items-center justify-center p-6">
              <div className="w-[260px] rounded-xl bg-white p-4 shadow-lg">
                <div className="h-8 rounded bg-gray-100 mb-2" />
                <div className="h-8 rounded bg-gray-100 mb-2" />
                <div className="h-10 rounded bg-black" />
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <FeatureCard
            icon={<FileText className="h-5 w-5 text-orange-400" />}
            title="Create your first form"
            desc="Ask qualifying questions and route users correctly."
          />
          <FeatureCard
            icon={<Route className="h-5 w-5 text-green-400" />}
            title="Create your first route"
            desc="Route users based on their form answers."
          />
          <FeatureCard
            icon={<BarChart2 className="h-5 w-5 text-blue-400" />}
            title="Reporting"
            desc="View all incoming data and export it as CSV."
          />
          <FeatureCard
            icon={<CheckCircle className="h-5 w-5 text-teal-400" />}
            title="Test routing form"
            desc="Safely test your form without storing responses."
          />
          <FeatureCard
            icon={<Mail className="h-5 w-5 text-yellow-400" />}
            title="Email notifications"
            desc="Notify owners when a form is submitted."
          />
          <FeatureCard
            icon={<Download className="h-5 w-5 text-purple-400" />}
            title="Download responses"
            desc="Export responses anytime as CSV files."
          />
        </div>

        <div className="pb-12" />
      </main>
    </div>
  );
}

/* FEATURE CARD */
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/7 transition">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-white/65 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}
