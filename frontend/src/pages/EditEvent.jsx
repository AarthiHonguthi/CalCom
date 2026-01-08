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

  // 1. Fetch existing data
  useEffect(() => {
    // Note: Since we don't have a direct "get by ID" API yet, we fetch all and filter
    // Ideally, your backend should have: app.get('/api/event-types/:id')
    axios
      .get("http://localhost:5000/api/event-types")
      .then((res) => {
        const event = res.data.find((e) => e.id === parseInt(id));
        if (event) {
          setForm(event);
          setLoading(false);
        } else {
          alert("Event not found");
          navigate("/");
        }
      })
      .catch((err) => console.error(err));
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/api/event-types/${id}`, form);
      alert("Event updated");
      navigate("/");
    } catch (err) {
      alert("Error updating event.");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-sm text-slate-500 hover:text-slate-900 mb-6"
        >
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">
            Edit Event Type
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Title
              </label>
              <input
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 outline-none"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            {/* Same form fields as CreateEvent... */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-slate-300 rounded-md outline-none h-24"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Duration (min)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-slate-300 rounded-md outline-none"
                value={form.duration}
                onChange={(e) =>
                  setForm({ ...form, duration: parseInt(e.target.value) })
                }
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-slate-900 text-white py-2.5 rounded-md font-semibold hover:bg-slate-800"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-6 py-2.5 rounded-md font-semibold text-slate-700 hover:bg-slate-100 border border-slate-300"
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
