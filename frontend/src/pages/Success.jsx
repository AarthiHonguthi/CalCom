import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Check } from "lucide-react";

export default function Success() {
  useEffect(() => {
    document.title = "Success | Clone Cal";
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 text-white">
      <div className="w-full max-w-md bg-[#0b0b0b] border border-[#3c3c3c] rounded-2xl shadow-2xl p-6 sm:p-8 text-center">
        {/* ICON */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-600/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={28} />
        </div>

        {/* TITLE */}
        <h1 className="text-xl sm:text-2xl font-semibold mb-2">
          Booking confirmed
        </h1>

        {/* SUBTEXT */}
        <p className="text-sm text-slate-400 mb-8">
          We’ve sent a calendar invitation to your email address.
        </p>

        {/* ACTION */}
        <Link
          to="/"
          className="block w-full bg-white text-black py-2.5 rounded-md font-medium hover:bg-slate-200 transition"
        >
          Back to dashboard
        </Link>
      </div>

      {/* BRANDING */}
      <div className="absolute bottom-6 text-slate-500 text-sm">Cal.com</div>
    </div>
  );
}
