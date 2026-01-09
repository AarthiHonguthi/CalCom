import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    duration: 15,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Edit Event | Clone Cal";
  }, []);

  /* FETCH EXISTING EVENT */
  useEffect(() => {
    axios
      .get("https://calcom-kdz8.onrender.com/api/event-types")
      .then((res) => {
        const event = res.data.find((e) => e.id === Number(id));
        if (!event) {
          alert("Event not found");
          navigate("/");
          return;
        }
        setForm(event);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load event");
        navigate("/");
      });
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(
        `https://calcom-kdz8.onrender.com/api/event-types/${id}`,
        form
      );
      alert("Event updated");
      navigate("/");
    } catch {
      alert("Error updating event");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-slate-500">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-xl mx-auto">
        {/* BACK */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-white mb-6"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* CARD */}
        <div className="bg-[#0b0b0b] border border-[#3c3c3c] rounded-2xl p-6 sm:p-8 shadow-xl">
          <h1 className="text-xl font-semibold mb-6">Edit Event Type</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* TITLE */}
            <div>
              <label className="block text-sm mb-1 text-slate-300">Title</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-[#111] border border-slate-700 rounded-md px-3 py-2 text-sm outline-none focus:border-white"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm mb-1 text-slate-300">
                Description
              </label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full bg-[#111] border border-slate-700 rounded-md px-3 py-2 text-sm outline-none focus:border-white resize-none"
              />
            </div>

            {/* DURATION */}
            <div>
              <label className="block text-sm mb-1 text-slate-300">
                Duration (minutes)
              </label>
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
                className="w-full bg-[#111] border border-slate-700 rounded-md px-3 py-2 text-sm outline-none focus:border-white"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-slate-200 transition"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-6 py-2 rounded-md text-slate-300 border border-slate-700 hover:bg-[#171717]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
