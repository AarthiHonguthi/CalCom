import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Success() {
  useEffect(() => {
    document.title = "Success | Clone Cal";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
          ✓
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-slate-500 mb-8">
          We have sent a calendar invitation to your email address.
        </p>
        <Link
          to="/"
          className="block w-full bg-slate-900 text-white py-2 rounded-md font-medium hover:bg-slate-800 transition"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
