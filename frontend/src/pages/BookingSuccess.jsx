// src/pages/BookingSuccess.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

export default function BookingSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return navigate("/");
  }

  const { event, booking } = state;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 text-white">
      <div className="w-full max-w-xl bg-[#0b0b0b] border border-slate-800 rounded-2xl shadow-2xl p-8">
        {/* CHECK ICON */}
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center">
            <Check className="text-white" />
          </div>
        </div>

        <h1 className="text-xl font-semibold text-center mb-2">
          This meeting is scheduled
        </h1>

        <p className="text-center text-slate-400 mb-6">
          We sent an email with a calendar invitation with the details to
          everyone.
        </p>

        <div className="border-t border-slate-800 pt-6 space-y-4 text-sm">
          <div className="flex gap-6">
            <span className="text-slate-400 w-20">What</span>
            <span>{event.title}</span>
          </div>

          <div className="flex gap-6">
            <span className="text-slate-400 w-20">When</span>
            <span>
              {new Date(booking.start_time).toLocaleString()} –{" "}
              {new Date(booking.end_time).toLocaleTimeString()}
            </span>
          </div>

          <div className="flex gap-6">
            <span className="text-slate-400 w-20">Who</span>
            <span>
              {booking.booker_name} <br />
              {booking.booker_email}
            </span>
          </div>

          <div className="flex gap-6">
            <span className="text-slate-400 w-20">Where</span>
            <span>Cal Video</span>
          </div>

          {booking.notes && (
            <div className="flex gap-6">
              <span className="text-slate-400 w-20">Notes</span>
              <span>{booking.notes}</span>
            </div>
          )}
        </div>

        <div className="border-t border-slate-800 mt-6 pt-4 text-center text-sm">
          Need to make a change?{" "}
          <span className="underline cursor-pointer">Reschedule</span> or{" "}
          <span className="underline cursor-pointer">Cancel</span>
        </div>
      </div>

      <div className="absolute bottom-6 text-slate-500 text-sm">Cal.com</div>
    </div>
  );
}
