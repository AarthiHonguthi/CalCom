import { Link, useLocation } from "react-router-dom";
import { Calendar, Clock, Link as LinkIcon } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "border-b-2 border-slate-900 text-slate-900"
      : "text-slate-500 hover:text-slate-700";

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2"
            >
              <span className="text-xl font-serif italic">C</span> Cal.clone
            </Link>

            <div className="hidden md:flex space-x-6 h-full items-center">
              <Link
                to="/"
                className={`flex items-center gap-2 text-sm font-medium h-full ${isActive(
                  "/"
                )}`}
              >
                <LinkIcon size={16} /> Event Types
              </Link>
              <Link
                to="/bookings"
                className={`flex items-center gap-2 text-sm font-medium h-full ${isActive(
                  "/bookings"
                )}`}
              >
                <Clock size={16} /> Bookings
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <div className="h-8 w-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs">
              AD
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
