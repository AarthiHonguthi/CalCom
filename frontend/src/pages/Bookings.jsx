import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar } from "lucide-react";
import Sidebar from "../components/Sidebar";
import DeleteEventModal from "../components/DeleteEventModal";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [cancelId, setCancelId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    document.title = "Bookings | Clone Cal";
  }, []);

  const fetchBookings = () => {
    axios
      .get("https://calcom-kdz8.onrender.com/api/bookings/dashboard")
      .then((res) => setBookings(res.data))
      .catch(() => setBookings([]));
  };

  const now = new Date();

  const upcoming = bookings.filter(
    (b) => b.status === "confirmed" && new Date(b.start_time) > now
  );
  const past = bookings.filter(
    (b) => new Date(b.start_time) <= now && b.status !== "cancelled"
  );
  const cancelled = bookings.filter((b) => b.status === "cancelled");

  const visible =
    activeTab === "upcoming"
      ? upcoming
      : activeTab === "past"
      ? past
      : cancelled;

  const confirmCancel = async () => {
    try {
      await axios.delete(
        `https://calcom-kdz8.onrender.com/api/bookings/${cancelId}`
      );
      setCancelId(null);
      fetchBookings();
    } catch {
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-slate-200 flex">
      {/* SIDEBAR */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* MAIN */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:ml-64">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-white">Bookings</h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            See upcoming and past events booked through your event type links.
          </p>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["upcoming", "past", "cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-md text-sm capitalize transition ${
                activeTab === tab
                  ? "bg-[#404040] text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {visible.length === 0 ? (
          <div className="mt-10 border border-dashed border-[#3c3c3c] rounded-xl h-[280px] sm:h-[360px] flex flex-col items-center justify-center text-center px-6">
            <div className="h-14 w-14 rounded-full bg-[#404040] flex items-center justify-center mb-4">
              <Calendar size={26} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              No {activeTab} bookings
            </h3>
          </div>
        ) : (
          <div className="space-y-3">
            {visible.map((b) => (
              <div
                key={b.id}
                className="bg-[#111] border border-[#3c3c3c] rounded-lg px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                {/* LEFT */}
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  <div className="h-10 w-10 rounded-full bg-[#404040] flex items-center justify-center shrink-0">
                    <Calendar size={18} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate">
                      {b.event_title}
                    </h3>
                    <p className="text-sm text-slate-400 truncate">
                      {b.booker_name} •{" "}
                      {new Date(b.start_time).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                {activeTab === "upcoming" && (
                  <button
                    onClick={() => setCancelId(b.id)}
                    className="text-sm text-slate-400 hover:text-red-400 self-start sm:self-center"
                  >
                    Cancel
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* CANCEL MODAL */}
      <DeleteEventModal
        open={cancelId !== null}
        onClose={() => setCancelId(null)}
        onConfirm={confirmCancel}
      />
    </div>
  );
}
