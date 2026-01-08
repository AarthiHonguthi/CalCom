import { Zap, Phone, Mail, MessageSquare } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { Link} from "react-router-dom";
import {Plus } from "lucide-react";
import { useEffect } from "react";

export default function Workflows() {
  useEffect(() => {
    document.title = "Workflows | Clone Cal";
  }, []);
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-slate-200">
      <Sidebar />
      {/* CONTENT AREA (sidebar already exists outside) */}
      <main className="ml-64 px-8 py-8">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-xl font-semibold text-white">Workflows</h1>
            <p className="text-sm text-slate-400 mt-1">
              Create workflows to automate notifications and reminders
            </p>
          </div>
          <Link
            to="/create"
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-200 transition"
          >
            <Plus size={16} /> New
          </Link>
        </div>

        {/* EMPTY STATE */}
        <div className="flex flex-col items-center text-center mt-20">
          <div className="w-14 h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-4">
            <Zap size={26} />
          </div>

          <h2 className="text-lg font-semibold text-white">Workflows</h2>
          <p className="text-sm text-slate-400 max-w-md mt-2">
            Workflows enable simple automation to send notifications and
            reminders enabling you to build processes around your events.
          </p>

          <button className="mt-6 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-200">
            + Create a workflow
          </button>
        </div>

        {/* TEMPLATES */}
        <div className="max-w-4xl mx-auto mt-14 space-y-8">
          {/* CAL.AI TEMPLATES */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">
              Cal.ai Templates
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TemplateCard
                icon={<Phone size={16} />}
                title="Call to confirm booking"
                subtitle="2 hrs before event starts"
              />
              <TemplateCard
                icon={<Phone size={16} />}
                title="Follow up with no shows"
                subtitle="30m after event ends"
              />
              <TemplateCard
                icon={<Phone size={16} />}
                title="Remind attendees to bring ID"
                subtitle="1 day before event starts"
              />
            </div>
          </div>

          {/* STANDARD TEMPLATES */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">
              Standard Templates
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TemplateCard
                icon={<MessageSquare size={16} />}
                title="Send SMS reminder"
                subtitle="24 hours before event starts"
              />
              <TemplateCard
                icon={<MessageSquare size={16} />}
                title="Follow up with no shows"
                subtitle="30m after event ends"
              />
              <TemplateCard
                icon={<MessageSquare size={16} />}
                title="Remind attendees to bring ID"
                subtitle="1 day before event starts"
              />
              <TemplateCard
                icon={<Mail size={16} />}
                title="Email Reminder"
                subtitle="1 hour before event starts"
              />
              <TemplateCard
                icon={<Mail size={16} />}
                title="Custom Email Reminder"
                subtitle="Event is rescheduled to host"
              />
              <TemplateCard
                icon={<MessageSquare size={16} />}
                title="Custom SMS Reminder"
                subtitle="When event is scheduled"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------------- TEMPLATE CARD ---------------- */

function TemplateCard({ icon, title, subtitle }) {
  return (
    <div className="bg-[#111] border border-[#3c3c3c] rounded-xl px-4 py-4 hover:border-[#171717] transition cursor-pointer">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-md bg-[#1a1a1a] flex items-center justify-center">
          {icon}
        </div>
        <h4 className="text-sm font-medium text-white">{title}</h4>
      </div>
      <p className="text-xs text-slate-400 ml-11">{subtitle}</p>
    </div>
  );
}
