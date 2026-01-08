import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

/* ---------- helpers ---------- */
const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function BookingPage() {
  const { slug } = useParams();

  const [event, setEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  /* ---------- fetch event ---------- */
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/event-types/${slug}`)
      .then((res) => setEvent(res.data))
      .catch(() => alert("Event not found"));
  }, [slug]);

  /* ---------- fetch slots ---------- */
  useEffect(() => {
    if (!event) return;
    const dateStr = selectedDate.toLocaleDateString("en-CA");

    axios
      .get(
        `http://localhost:5000/api/bookings/slots?date=${dateStr}&slug=${slug}`
      )
      .then((res) => setSlots(res.data))
      .catch(() => setSlots([]));
  }, [selectedDate, event, slug]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 bg-black">
        Loading…
      </div>
    );
  }

  /* ---------- calendar rendering ---------- */
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const today = new Date();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-5xl bg-[#0b0b0b] rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 overflow-hidden shadow-2xl">
        {/* ================= LEFT ================= */}
        <div className="p-6 border-b md:border-b-0 md:border-r border-slate-800">
          <div className="text-sm text-slate-400 mb-2">
            {event.host_name || "Aarthi Honguthi"}
          </div>

          <h1 className="text-xl font-semibold mb-3">{event.title}</h1>

          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            ⏱ {event.duration}m
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            📹 Cal Video
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-sm">
            🌍 Asia/Kolkata
          </div>
        </div>

        {/* ================= MIDDLE (CALENDAR) ================= */}
        <div className="p-6 border-b md:border-b-0 md:border-r border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">
              {selectedDate.toLocaleString("default", {
                month: "long",
              })}{" "}
              {year}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedDate(new Date(year, month - 1, 1))}
                className="text-slate-400 hover:text-white"
              >
                ‹
              </button>
              <button
                onClick={() => setSelectedDate(new Date(year, month + 1, 1))}
                className="text-slate-400 hover:text-white"
              >
                ›
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-xs text-slate-400 mb-2">
            {days.map((d) => (
              <div key={d} className="text-center">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={i} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const date = new Date(year, month, day);
              const disabled = date < today;

              const selected =
                date.toDateString() === selectedDate.toDateString();

              return (
                <button
                  key={day}
                  disabled={disabled}
                  onClick={() => setSelectedDate(date)}
                  className={`h-10 rounded-md text-sm ${
                    selected
                      ? "bg-white text-black"
                      : disabled
                      ? "text-slate-600"
                      : "bg-[#1a1a1a] hover:bg-[#222]"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT (SLOTS) ================= */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">
              {selectedDate.toLocaleDateString(undefined, {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </h3>
            <div className="flex gap-2 text-xs">
              <span className="px-2 py-1 rounded bg-[#1a1a1a]">12h</span>
              <span className="px-2 py-1 rounded text-slate-400">24h</span>
            </div>
          </div>

          <div className="space-y-2 max-h-[360px] overflow-y-auto pr-2">
            {slots.length === 0 ? (
              <div className="text-slate-500 text-sm">No availability</div>
            ) : (
              slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`w-full flex items-center gap-2 px-4 py-2 rounded-md border ${
                    selectedSlot === slot
                      ? "bg-white text-black"
                      : "border-slate-700 hover:border-slate-500"
                  }`}
                >
                  <span className="h-2 w-2 bg-green-500 rounded-full" />
                  {formatTime(slot)}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
