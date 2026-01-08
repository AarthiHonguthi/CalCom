import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import DateOverrideModal from "../components/DateOverrideModal";

import { ChevronLeft, Plus, Copy, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* Toggle */
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
  const [openOverride, setOpenOverride] = useState(false);
  const [saving, setSaving] = useState(false);

  const [schedule, setSchedule] = useState({
    Sunday: { enabled: false, slots: [] },
    Monday: { enabled: true, slots: [{ start: "09:00", end: "17:00" }] },
    Tuesday: { enabled: true, slots: [{ start: "09:00", end: "17:00" }] },
    Wednesday: { enabled: true, slots: [{ start: "09:00", end: "17:00" }] },
    Thursday: { enabled: true, slots: [{ start: "09:00", end: "17:00" }] },
    Friday: { enabled: true, slots: [{ start: "09:00", end: "17:00" }] },
    Saturday: { enabled: false, slots: [] },
  });

  const handleSave = async () => {
    try {
      setSaving(true);

      const payloadSchedule = {};
      DAYS.forEach((day, i) => {
        const d = schedule[day];
        payloadSchedule[i] = d.enabled && d.slots.length ? d.slots : [];
      });

      await axios.put("https://calcom-kdz8.onrender.com/api/availability", {
        schedule: payloadSchedule,
      });

      alert("Availability saved");
    } catch (err) {
      console.error(err);
      alert("Failed to save availability");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex">
      <Sidebar />

      <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 ml-0 lg:ml-64">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-md hover:bg-[#171717]"
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

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded-md border border-slate-700 hover:bg-[#171717] disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* LEFT */}
          <div className="border border-[#3c3c3c] rounded-xl p-5 space-y-4">
            {DAYS.map((day, idx) => (
              <div key={day} className="flex justify-between items-start">
                <div className="flex items-center gap-4 w-40">
                  <Toggle
                    enabled={schedule[day].enabled}
                    onChange={(val) =>
                      setSchedule({
                        ...schedule,
                        [day]: { ...schedule[day], enabled: val },
                      })
                    }
                  />
                  <span>{day}</span>
                </div>

                {schedule[day].enabled && (
                  <div className="flex flex-col gap-2">
                    {schedule[day].slots.map((slot, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2">
                        <input
                          type="time"
                          value={slot.start}
                          onChange={(e) => {
                            const slots = [...schedule[day].slots];
                            slots[sIdx].start = e.target.value;
                            setSchedule({
                              ...schedule,
                              [day]: { ...schedule[day], slots },
                            });
                          }}
                          className="bg-[#111] border border-slate-700 rounded-md px-2 py-1 text-sm"
                        />

                        <span className="text-slate-400">–</span>

                        <input
                          type="time"
                          value={slot.end}
                          onChange={(e) => {
                            const slots = [...schedule[day].slots];
                            slots[sIdx].end = e.target.value;
                            setSchedule({
                              ...schedule,
                              [day]: { ...schedule[day], slots },
                            });
                          }}
                          className="bg-[#111] border border-slate-700 rounded-md px-2 py-1 text-sm"
                        />

                        <button
                          onClick={() =>
                            setSchedule({
                              ...schedule,
                              [day]: {
                                ...schedule[day],
                                slots: [
                                  ...schedule[day].slots,
                                  { start: "09:00", end: "17:00" },
                                ],
                              },
                            })
                          }
                          className="p-2 hover:bg-[#171717] rounded-md"
                          title="Add slot"
                        >
                          <Plus size={14} />
                        </button>

                        <button
                          onClick={() => {
                            const prevIdx = idx === 0 ? 6 : idx - 1;
                            const prevDay = DAYS[prevIdx];
                            setSchedule({
                              ...schedule,
                              [day]: {
                                ...schedule[day],
                                slots: schedule[prevDay]?.slots || [],
                              },
                            });
                          }}
                          className="p-2 hover:bg-[#171717] rounded-md"
                          title="Copy previous day"
                        >
                          <Copy size={14} />
                        </button>

                        <button
                          onClick={() => {
                            const slots = schedule[day].slots.filter(
                              (_, i) => i !== sIdx
                            );
                            setSchedule({
                              ...schedule,
                              [day]: { ...schedule[day], slots },
                            });
                          }}
                          className="p-2 hover:bg-red-500/10 rounded-md text-red-400"
                          title="Delete slot"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            <div className="border border-[#3c3c3c] rounded-xl p-4">
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

            <div className="border border-[#3c3c3c] rounded-xl p-4">
              <p className="text-sm mb-2">Something doesn't look right?</p>
              <button className="w-full px-3 py-2 border border-slate-700 rounded-md hover:bg-[#171717]">
                Launch troubleshooter
              </button>
            </div>
          </div>
        </div>

        {/* DATE OVERRIDES */}
        <div className="mt-6 border border-[#3c3c3c] rounded-xl p-5">
          <h3 className="font-medium mb-1">Date overrides</h3>
          <p className="text-sm text-slate-400 mb-3">
            Add dates when your availability changes from your daily hours.
          </p>
          <button
            onClick={() => setOpenOverride(true)}
            className="px-4 py-2 rounded-md border border-slate-700 hover:bg-[#171717]"
          >
            + Add an override
          </button>
        </div>
      </main>

      <DateOverrideModal
        open={openOverride}
        onClose={() => setOpenOverride(false)}
      />
    </div>
  );
}
