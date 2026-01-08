import { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    duration: 15,
  });

  /* ================= LOCK BODY SCROLL (CRITICAL) ================= */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.background = "#000";
    return () => {
      document.body.style.overflow = "";
      document.body.style.background = "";
    };
  }, []);

  /* ================= AUTO SLUG ================= */
  useEffect(() => {
    const slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setForm((prev) => ({ ...prev, slug }));
  }, [form.title]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/event-types", form);

      navigate("/");
    } catch {
      alert("Error creating event");
    }
  };

  /* ================= MODAL (PORTAL) ================= */
  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80">
      {/* MODAL BOX */}
      <div className="w-full max-w-xl rounded-2xl bg-[#0b0b0b] border border-slate-800 shadow-2xl">
        {/* HEADER */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Add a new event type
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Set up event types to offer different types of meetings.
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="px-6 py-6 space-y-5">
          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Title
            </label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Quick Chat"
              className="w-full bg-[#111] border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-slate-500"
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              URL
            </label>
            <input
              readOnly
              value={`http://localhost:5173/book/${form.slug}`}
              className="w-full bg-[#111] border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-400"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="A quick video meeting."
              className="w-full bg-[#111] border border-slate-700 rounded-md px-3 py-2 text-sm text-white resize-none focus:outline-none focus:ring-1 focus:ring-slate-500"
            />
          </div>

          {/* DURATION */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Duration
            </label>
            <div className="relative w-40">
              <input
                type="number"
                min={5}
                value={form.duration}
                onChange={(e) =>
                  setForm({
                    ...form,
                    duration: Number(e.target.value),
                  })
                }
                className="w-full bg-[#111] border border-slate-700 rounded-md px-3 py-2 pr-16 text-sm text-white focus:outline-none focus:ring-1 focus:ring-slate-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                minutes
              </span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-800">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-slate-400 hover:text-white"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-slate-200"
          >
            Continue
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
