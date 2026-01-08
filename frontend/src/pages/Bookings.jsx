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

  const fetchBookings = () => {
    axios
      .get("http://localhost:5000/api/bookings/dashboard")
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
      await axios.delete(`http://localhost:5000/api/bookings/${cancelId}`);
      setCancelId(null);
      fetchBookings();
    } catch {
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-slate-200">
      <Sidebar />

      <main className="ml-64 px-8 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-white">Bookings</h1>
          <p className="text-sm text-slate-400 mt-1">
            See upcoming and past events booked through your event type links.
          </p>
        </div>

        <div className="flex items-center gap-2 mb-6">
          {["upcoming", "past", "cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-md text-sm capitalize ${
                activeTab === tab
                  ? "bg-[#404040] text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <div className="mt-10 border border-dashed border-slate-800 rounded-xl h-[360px] flex flex-col items-center justify-center text-center">
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
                className="bg-[#404040] border border-slate-100 rounded-lg px-4 py-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#404040] flex items-center justify-center">
                    <Calendar size={18} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {b.event_title}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {b.booker_name} •{" "}
                      {new Date(b.start_time).toLocaleString()}
                    </p>
                  </div>
                </div>

                {activeTab === "upcoming" && (
                  <button
                    onClick={() => setCancelId(b.id)}
                    className="text-sm text-slate-400 hover:text-red-400"
                  >
                    Cancel
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <DeleteEventModal
        open={cancelId !== null}
        onClose={() => setCancelId(null)}
        onConfirm={confirmCancel}
      />
    </div>
  );
}
