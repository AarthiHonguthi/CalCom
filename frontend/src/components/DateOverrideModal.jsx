import { X } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function DateOverrideModal({ open, onClose }) {
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [unavailable, setUnavailable] = useState(false);
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:00");
  const [saving, setSaving] = useState(false);
  const [mode, setMode] = useState("block"); // 'block' = remove these hours, 'allow' = only these hours available

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/70 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-[#0b0b0b] border border-slate-800 rounded-2xl overflow-hidden grid grid-cols-2">
        {/* LEFT – CALENDAR */}
        <div className="p-6 border-r border-slate-800">
          <h3 className="text-white font-medium mb-4">
            Select the dates to override
          </h3>

          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-slate-400">
              {new Date(selectedYear, selectedMonth).toLocaleString(undefined, {
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (selectedMonth === 0) {
                    setSelectedMonth(11);
                    setSelectedYear((y) => y - 1);
                  } else setSelectedMonth((m) => m - 1);
                }}
                className="px-2 py-1 rounded-md bg-[#1a1a1a]"
              >
                ‹
              </button>
              <button
                onClick={() => {
                  if (selectedMonth === 11) {
                    setSelectedMonth(0);
                    setSelectedYear((y) => y + 1);
                  } else setSelectedMonth((m) => m + 1);
                }}
                className="px-2 py-1 rounded-md bg-[#1a1a1a]"
              >
                ›
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-xs text-slate-400 mb-2">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
              <div key={d} className="text-center">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {(() => {
              const daysInMonth = new Date(
                selectedYear,
                selectedMonth + 1,
                0
              ).getDate();
              const firstDay = new Date(
                selectedYear,
                selectedMonth,
                1
              ).getDay();
              const cells = [];

              for (let i = 0; i < firstDay; i++) {
                cells.push(<div key={`pad-${i}`} />);
              }

              for (let d = 1; d <= daysInMonth; d++) {
                const selected = d === selectedDay;
                cells.push(
                  <button
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`h-10 rounded-md text-sm transition ${
                      selected
                        ? "bg-white text-black"
                        : "bg-[#1a1a1a] text-white hover:bg-[#222]"
                    }`}
                  >
                    {d}
                  </button>
                );
              }

              return cells;
            })()}
          </div>
        </div>

        {/* RIGHT – HOURS */}
        <div className="p-6 relative">
          <h3 className="text-white font-medium mb-4">
            Which hours are you free?
          </h3>

          {!unavailable && (
            <>
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={() => setMode("block")}
                  className={`px-3 py-1 rounded-md ${
                    mode === "block"
                      ? "bg-white text-black"
                      : "bg-[#1a1a1a] text-slate-300"
                  }`}
                >
                  Block these hours
                </button>
                <button
                  onClick={() => setMode("allow")}
                  className={`px-3 py-1 rounded-md ${
                    mode === "allow"
                      ? "bg-white text-black"
                      : "bg-[#1a1a1a] text-slate-300"
                  }`}
                >
                  Only these hours available
                </button>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <input
                  type="time"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="px-3 py-1.5 rounded-md bg-[#111] border border-slate-700 text-sm"
                />
                <span className="text-slate-400">–</span>
                <input
                  type="time"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="px-3 py-1.5 rounded-md bg-[#111] border border-slate-700 text-sm"
                />
              </div>
            </>
          )}

          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => setUnavailable(!unavailable)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition
                ${unavailable ? "bg-white" : "bg-[#1a1a1a]"}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-black transition
                  ${unavailable ? "translate-x-4" : "translate-x-1"}`}
              />
            </button>

            <span className="text-sm text-slate-400">
              Mark unavailable (All day)
            </span>
          </div>

          {/* FOOTER */}
          <div className="absolute bottom-6 right-6 flex items-center gap-4">
            <button
              onClick={onClose}
              className="text-sm text-slate-400 hover:text-white"
            >
              Close
            </button>
            <button
              onClick={async () => {
                try {
                  setSaving(true);

                  // Build date string (UI shows January 2026) — keep same month/year
                  const year = 2026;
                  const month = 0; // January (0-indexed)
                  const day = String(selectedDay).padStart(2, "0");
                  const monthStr = String(month + 1).padStart(2, "0");
                  const dateStr = `${year}-${monthStr}-${day}`;

                  // Fetch current schedule
                  const cur = (
                    await axios.get("http://localhost:5000/api/availability")
                  ).data;

                  const schedule = { ...(cur || {}) };
                  if (!schedule.overrides) schedule.overrides = {};

                  if (unavailable) {
                    schedule.overrides[dateStr] = { unavailable: true };
                  } else if (mode === "allow") {
                    // Make only these hours available on that date
                    schedule.overrides[dateStr] = { slots: [{ start, end }] };
                  } else {
                    // Block these hours on that date
                    schedule.overrides[dateStr] = { blocks: [{ start, end }] };
                  }

                  // Send back full schedule object
                  await axios.put("http://localhost:5000/api/availability", {
                    schedule,
                  });

                  alert("Override saved");
                  onClose();
                } catch (err) {
                  console.error(err);
                  alert("Failed to save override");
                } finally {
                  setSaving(false);
                }
              }}
              disabled={saving}
              className="px-4 py-2 rounded-md bg-white text-black text-sm font-medium disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Override"}
            </button>
          </div>

          {/* CLOSE ICON */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
