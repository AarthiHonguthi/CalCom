import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ExternalLink, Clock, Copy, Plus, MoreHorizontal } from "lucide-react";
import Sidebar from "../components/Sidebar";
import DeleteEventModal from "../components/DeleteEventModal";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [toast, setToast] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // ✅ FIXED
  const navigate = useNavigate();

  /* ================= FETCH ================= */
  useEffect(() => {
    axios
      .get("https://calcom-kdz8.onrender.com/api/event-types")
      .then((res) => setEvents(res.data))
      .catch(() => setEvents([]));
  }, []);

  /* ================= SEARCH ================= */
  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase())
  );

  /* ================= COPY LINK ================= */
  const copyLink = (slug) => {
    navigator.clipboard.writeText(`${window.location.origin}/${slug}`);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  /* ================= TOGGLE HIDE ================= */
  const toggleHidden = async (id) => {
    // Optimistic update: flip locally first
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, hidden: !e.hidden } : e))
    );

    try {
      const ev = events.find((x) => x.id === id);
      const newHidden = !ev?.hidden;
      await axios.patch(
        `https://calcom-kdz8.onrender.com/api/event-types/${id}/visibility`,
        { hidden: newHidden }
      );
    } catch (err) {
      console.error(err);
      // Revert on failure
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? { ...e, hidden: !e.hidden } : e))
      );
      alert("Failed to update visibility");
    }
  };

  /* ================= DELETE ================= */
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `https://calcom-kdz8.onrender.com/api/event-types/${deleteId}`
      );
      setEvents((prev) => prev.filter((e) => e.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete event");
    }
  };

  /* ================= CLOSE MENU ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const close = () => setOpenMenuId(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-slate-200">
      <Sidebar events={events} />

      <main className="ml-64 px-8 py-6">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-white">Event Types</h1>
            <p className="text-sm text-slate-400 mt-1">
              Create events to share for people to book on your calendar.
            </p>
          </div>

          <Link
            to="/create"
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-200 transition"
          >
            <Plus size={16} /> New
          </Link>
        </div>

        {/* SEARCH */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="mb-6 w-full max-w-sm bg-[#111] border border-[#3c3c3c] text-sm rounded-md px-4 py-2 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-600"
        />

        {/* EVENT LIST */}
        <div className="space-y-3">
          {filteredEvents.length === 0 ? (
            <div className="text-center text-slate-500 py-20">
              No event types found
            </div>
          ) : (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-[#111] border border-[#3c3c3c] rounded-lg px-4 py-4 flex items-center justify-between hover:border-[#171717] transition"
              >
                {/* LEFT */}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">
                      {event.title}
                    </h3>
                    <span className="text-xs text-slate-500">
                      /{event.slug}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="inline-flex items-center gap-1 bg-[#1a1a1a] px-2 py-0.5 rounded">
                      <Clock size={12} /> {event.duration}m
                    </span>

                    {event.hidden && (
                      <span className="bg-[#222] text-slate-300 px-2 py-0.5 rounded">
                        Hidden
                      </span>
                    )}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3">
                  {/* TOGGLE */}
                  <button
                    onClick={() => toggleHidden(event.id)}
                    className={`w-10 h-5 rounded-full relative transition ${
                      event.hidden ? "bg-slate-700" : "bg-white"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-4 w-4 rounded-full bg-black transition ${
                        event.hidden ? "left-0.5" : "left-5"
                      }`}
                    />
                  </button>

                  <button
                    onClick={() => window.open(`/${event.slug}`, "_blank")}
                    className="p-2 rounded-md hover:bg-[#171717]"
                    title="Preview"
                  >
                    <ExternalLink size={16} />
                  </button>

                  <button
                    onClick={() => copyLink(event.slug)}
                    className="p-2 rounded-md hover:bg-[#171717]"
                    title="Copy link"
                  >
                    <Copy size={16} />
                  </button>

                  {/* MENU */}
                  <div
                    className="relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === event.id ? null : event.id)
                      }
                      className="p-2 rounded-md hover:bg-[#171717]"
                    >
                      <MoreHorizontal size={16} />
                    </button>

                    {openMenuId === event.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-[#111] border border-[#3c3c3c] rounded-md shadow-xl z-20">
                        <button
                          onClick={() => navigate(`/edit/${event.id}`)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-[#171717]"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => setDeleteId(event.id)}
                          className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-center text-xs text-slate-600 mt-10">
          No more results
        </div>
      </main>

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded-md text-sm shadow-xl z-50">
          Link copied!
        </div>
      )}

      {/* DELETE MODAL ✅ MUST BE INSIDE RETURN */}
      <DeleteEventModal
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
