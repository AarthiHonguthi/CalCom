import { useState } from "react";
import Sidebar from "../components/Sidebar";

import { ChevronLeft, Plus, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition
        ${enabled ? "bg-white" : "bg-[#1f1f1f]"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-black transition
          ${enabled ? "translate-x-6" : "translate-x-1"}`}
      />
    </button>
  );
}


const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function AvailabilityEditor() {
  const navigate = useNavigate();

  const [timezone, setTimezone] = useState("Europe/London");
  const [schedule, setSchedule] = useState({
    Sunday: { enabled: false, slots: [] },
    Monday: { enabled: true, slots: [["09:00", "17:00"]] },
    Tuesday: { enabled: true, slots: [["09:00", "17:00"]] },
    Wednesday: { enabled: true, slots: [["09:00", "17:00"]] },
    Thursday: { enabled: true, slots: [["09:00", "17:00"]] },
    Friday: { enabled: true, slots: [["09:00", "17:00"]] },
    Saturday: { enabled: false, slots: [] },
  });

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex">
      <Sidebar />

      <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 ml-0 lg:ml-64">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-md hover:bg-[#1a1a1a]"
            >
              <ChevronLeft size={18} />
            </button>
            <div>
              <h1 className="text-lg font-semibold">Aarthi Honguthi</h1>
              <p className="text-sm text-slate-400">
                Mon – Fri, 9:00 AM – 5:00 PM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400">Set as Default</span>
            <Toggle enabled={true} onChange={() => {}} />

            <button className="px-4 py-2 rounded-md border border-slate-700 hover:bg-[#1a1a1a]">
              Save
            </button>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* LEFT */}
          <div className="border border-slate-800 rounded-xl p-5 space-y-4">
            {DAYS.map((day) => (
              <div
                key={day}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <Toggle
                    enabled={schedule[day].enabled}
                    onChange={(val) =>
                      setSchedule({
                        ...schedule,
                        [day]: { ...schedule[day], enabled: val },
                      })
                    }
                  />

                  <span className="w-20">{day}</span>
                </div>

                {schedule[day].enabled && (
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      defaultValue="09:00"
                      className="bg-[#111] border border-slate-700 rounded-md px-2 py-1 text-sm"
                    />
                    <span>-</span>
                    <input
                      type="time"
                      defaultValue="17:00"
                      className="bg-[#111] border border-slate-700 rounded-md px-2 py-1 text-sm"
                    />
                    <button className="p-2 hover:bg-[#1a1a1a] rounded-md">
                      <Plus size={16} />
                    </button>
                    <button className="p-2 hover:bg-[#1a1a1a] rounded-md">
                      <Copy size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            <div className="border border-slate-800 rounded-xl p-4">
              <p className="text-sm mb-2">Timezone</p>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full bg-[#111] border border-slate-700 rounded-md px-3 py-2"
              >
                <option>Europe/London</option>
                <option>Asia/Kolkata</option>
                <option>America/New_York</option>
              </select>
            </div>

            <div className="border border-slate-800 rounded-xl p-4">
              <p className="text-sm mb-2">Something doesn't look right?</p>
              <button className="w-full px-3 py-2 border border-slate-700 rounded-md hover:bg-[#1a1a1a]">
                Launch troubleshooter
              </button>
            </div>
          </div>
        </div>

        {/* DATE OVERRIDES */}
        <div className="mt-6 border border-slate-800 rounded-xl p-5">
          <h3 className="font-medium mb-1">Date overrides</h3>
          <p className="text-sm text-slate-400 mb-3">
            Add dates when your availability changes from your daily hours.
          </p>
          <button className="px-4 py-2 rounded-md border border-slate-700 hover:bg-[#1a1a1a]">
            + Add an override
          </button>
        </div>
      </main>
    </div>
  );
}
