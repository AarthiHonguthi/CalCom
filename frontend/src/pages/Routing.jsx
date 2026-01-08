import Sidebar from "../components/Sidebar";
import {
  FileText,
  Route,
  BarChart2,
  CheckCircle,
  Mail,
  Download,
} from "lucide-react";

export default function Routing() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="ml-64 px-8 py-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">Routing</h1>
          <p className="mt-1 text-sm text-white/60">
            Create forms to direct attendees to the correct destinations
          </p>
        </div>

        {/* Hero banner */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-white/0 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* Left */}
            <div className="flex-1 p-8">
              <h2 className="text-xl font-semibold">Teams plan required</h2>
              <p className="mt-3 text-sm text-white/70 max-w-xl">
                Routing forms are a great way to route your incoming leads to
                the right person. Upgrade to a Teams plan to access this
                feature.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <button className="rounded-full bg-white text-black px-5 py-2 text-sm font-medium hover:bg-white/90">
                  Upgrade
                </button>
                <button className="text-sm text-white/70 hover:text-white">
                  Learn more
                </button>
              </div>
            </div>

            {/* Right illustration placeholder */}
            <div className="relative w-full lg:w-[420px] bg-white/5 border-l border-white/10 flex items-center justify-center">
              <div className="w-[260px] rounded-xl bg-white p-4 shadow-lg">
                <div className="h-8 rounded bg-gray-100 mb-2" />
                <div className="h-8 rounded bg-gray-100 mb-2" />
                <div className="h-10 rounded bg-black" />
              </div>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <FeatureCard
            icon={<FileText className="h-5 w-5 text-orange-400" />}
            title="Create your first form"
            desc="With Routing Forms you can ask qualifying questions and route to the correct person or event type."
          />
          <FeatureCard
            icon={<Route className="h-5 w-5 text-green-400" />}
            title="Create your first route"
            desc="Route to the right person based on the answers to your form."
          />
          <FeatureCard
            icon={<BarChart2 className="h-5 w-5 text-blue-400" />}
            title="Reporting"
            desc="See all incoming form data and download it as a CSV."
          />
          <FeatureCard
            icon={<CheckCircle className="h-5 w-5 text-teal-400" />}
            title="Test Routing Form"
            desc="Test your routing form without submitting any data."
          />
          <FeatureCard
            icon={<Mail className="h-5 w-5 text-yellow-400" />}
            title="Send Email to Owner"
            desc="Sends an email to the owner when the form is submitted."
          />
          <FeatureCard
            icon={<Download className="h-5 w-5 text-purple-400" />}
            title="Download responses"
            desc="Download all responses to your form in CSV format."
          />
        </div>

        <div className="pb-12" />
      </main>
    </div>
  );
}

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
