import { X, AlertCircle } from "lucide-react";

export default function DeleteEventModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* MODAL */}
      <div
        className="w-full max-w-md rounded-xl bg-[#0b0b0b] border border-slate-800 shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-start gap-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/20">
            <AlertCircle className="text-red-500" size={18} />
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold text-white">
              Delete event type?
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Anyone who you’ve shared this link with will no longer be able to
              book using it.
            </p>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={16} />
          </button>
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-300 hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-slate-200"
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}
