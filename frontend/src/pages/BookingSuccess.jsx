// src/pages/BookingSuccess.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { Check, ChevronLeft } from "lucide-react";

export default function BookingSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    navigate("/");
    return null;
  }

  const { event, booking } = state;

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* BACK TO BOOKINGS */}
      <div
        onClick={() => {
          window.location.href =
            "https://cal-com-clone-beta.vercel.app/bookings";
        }}
        className="absolute top-6 left-6 flex items-center gap-1 text-sm text-slate-400 hover:text-white cursor-pointer"
      >
        <ChevronLeft size={14} />
        <span>Back to bookings</span>
      </div>

      {/* CENTER CARD */}
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-xl bg-[#0b0b0b] border border-[#3c3c3c] rounded-2xl shadow-2xl p-8">
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

          {/* DETAILS */}
          <div className="border-t border-[#3c3c3c] pt-6 space-y-4 text-sm">
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
                {booking.booker_name}
                <br />
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

          {/* FOOTER ACTIONS */}
          <div className="border-t border-[#3c3c3c] mt-6 pt-4 text-center text-sm">
            Need to make a change?{" "}
            <span className="underline cursor-pointer">Reschedule</span> or{" "}
            <span className="underline cursor-pointer">Cancel</span>
          </div>
        </div>
      </div>

      {/* BRANDING */}
      <div className="absolute bottom-6 w-full text-center text-slate-500 text-sm">
        Cal.com
      </div>
    </div>
  );
}
