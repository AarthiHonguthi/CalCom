import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Clock, Video, Globe, CalendarDays } from "lucide-react";

export default function ConfirmBooking() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const date = params.get("date");
  const slot = params.get("slot");

  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= FETCH EVENT (SAFE ON REFRESH) ================= */
  useEffect(() => {
    axios
      .get(`https://calcom-kdz8.onrender.com/api/event-types/${slug}`)
      .then((res) => {
        setEvent(res.data);
        setName(res.data.host_name || "");
      })
      .catch(() => navigate("/"));
  }, [slug, navigate]);

  if (!event || !date || !slot) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-slate-500">
        Loading…
      </div>
    );
  }

  const start = new Date(slot);
  const end = new Date(start.getTime() + event.duration * 60000);

  /* ================= CONFIRM ================= */
  const handleConfirm = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "https://calcom-kdz8.onrender.com/api/bookings",
        {
          event_type_id: event.id,
          booker_name: name,
          booker_email: email,
          start_time: start.toISOString(),
          end_time: end.toISOString(),
          notes,
        }
      );

      navigate("/booking/success", {
        state: {
          event,
          booking: res.data,
        },
      });
    } catch (e) {
      console.error(e);
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 text-white">
      <div className="w-full max-w-4xl bg-[#0b0b0b] border border-[#3c3c3c] rounded-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl">
        {/* ================= LEFT SUMMARY ================= */}
        <div className="p-6 border-b md:border-b-0 md:border-r border-[#3c3c3c]">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center">
              👤
            </div>
            <div>
              <div className="text-sm text-slate-400">
                {event.host_name || "Aarthi Honguthi"}
              </div>
              <div className="font-medium">{event.title}</div>
            </div>
          </div>

          <div className="space-y-3 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CalendarDays size={14} />
              {start.toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>

            <div className="flex items-center gap-2">
              <Clock size={14} />
              {start.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}{" "}
              –{" "}
              {end.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}
            </div>

            <div className="flex items-center gap-2">
              <Clock size={14} />
              {event.duration} min
            </div>

            <div className="flex items-center gap-2">
              <Video size={14} />
              Cal Video
            </div>

            <div className="flex items-center gap-2">
              <Globe size={14} />
              Asia/Calcutta
            </div>
          </div>
        </div>

        {/* ================= RIGHT FORM ================= */}
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm mb-1">Your name *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#111] border border-slate-700 rounded-md px-3 py-2 outline-none focus:border-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Email address *</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111] border border-slate-700 rounded-md px-3 py-2 outline-none focus:border-white"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm mb-1">Additional notes</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Please share anything that will help prepare for our meeting."
              className="w-full bg-[#111] border border-slate-700 rounded-md px-3 py-2 outline-none focus:border-white resize-none"
            />
          </div>

          <div className="text-xs text-slate-500 mb-6">
            By proceeding, you agree to our{" "}
            <span className="underline cursor-pointer">Terms</span> and{" "}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-slate-400 hover:text-white"
            >
              Back
            </button>

            <button
              onClick={handleConfirm}
              disabled={loading}
              className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-slate-200 transition disabled:opacity-50"
            >
              {loading ? "Confirming…" : "Confirm"}
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="absolute bottom-6 text-slate-500 text-sm">Cal.com</div>
    </div>
  );
}
