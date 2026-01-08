import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Video, Clock, Globe, ChevronLeft, ChevronRight } from "lucide-react";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

export default function BookingPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
   useEffect(() => {
     if (event?.title) {
       document.title = `${event.title} | Clone Cal`;
     } else {
       document.title = "Booking | Clone Cal";
     }
   }, [event]);


  /* ================= FETCH EVENT ================= */
  useEffect(() => {
    axios
      .get(`https://calcom-kdz8.onrender.com/api/event-types/${slug}`)
      .then((res) => setEvent(res.data))
      .catch(() => alert("Event not found"));
  }, [slug]);

  /* ================= FETCH SLOTS ================= */
  useEffect(() => {
    if (!event) return;

    const dateStr = selectedDate.toLocaleDateString("en-CA");

    axios
      .get(
        `https://calcom-kdz8.onrender.com/api/bookings/slots?slug=${slug}&date=${dateStr}`
      )
      .then((res) => setSlots(res.data))
      .catch(() => setSlots([]));
  }, [event, selectedDate, slug]);

  if (!event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-slate-500">
        Loading…
      </div>
    );
  }

  /* ================= CALENDAR ================= */
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-6xl bg-[#0b0b0b] rounded-2xl border border-[#3c3c3c] shadow-2xl grid grid-cols-1 md:grid-cols-[280px_1fr_280px] overflow-hidden">
        {/* ================= LEFT ================= */}
        <div className="p-6 border-r border-[#3c3c3c]">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-sm">
              👤
            </div>
            <div className="text-sm text-slate-300">
              {event.host_name || "Aarthi Honguthi"}
            </div>
          </div>

          <h1 className="text-lg font-semibold mb-3">{event.title}</h1>

          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <Clock size={14} />
            {event.duration} min
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <Video size={14} />
            Cal Video
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Globe size={14} />
            Asia/Kolkata
          </div>
        </div>

        {/* ================= MIDDLE (CALENDAR) ================= */}
        <div className="p-6 border-r border-[#3c3c3c]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">
              {selectedDate.toLocaleString("default", {
                month: "long",
              })}{" "}
              {year}
            </h2>

            <div className="flex gap-1">
              <button
                onClick={() => setSelectedDate(new Date(year, month - 1, 1))}
                className="p-1 hover:bg-[#171717] rounded"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setSelectedDate(new Date(year, month + 1, 1))}
                className="p-1 hover:bg-[#171717] rounded"
              >
                <ChevronRight size={16} />
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
              const selected =
                date.toDateString() === selectedDate.toDateString();

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(date)}
                  className={`h-10 rounded-md text-sm ${
                    selected
                      ? "bg-white text-black"
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

            <div className="flex gap-1 text-xs">
              <span className="px-2 py-1 rounded bg-[#1a1a1a]">12h</span>
              <span className="px-2 py-1 rounded text-slate-500">24h</span>
            </div>
          </div>

          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {slots.length === 0 ? (
              <div className="text-slate-500 text-sm">No availability</div>
            ) : (
              slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() =>
                    navigate(
                      `/book/${slug}/confirm?date=${selectedDate.toLocaleDateString(
                        "en-CA"
                      )}&slot=${encodeURIComponent(slot)}`
                    )
                  }
                  className="w-full flex items-center gap-2 px-4 py-2 rounded-md border border-slate-700 hover:border-slate-500 transition"
                >
                  <span className="h-2 w-2 bg-emerald-400 rounded-full" />
                  {formatTime(slot)}
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="absolute bottom-6 text-slate-500 text-sm">Cal.com</div>
    </div>
  );
}
