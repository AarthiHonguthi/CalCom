import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  ArrowLeft,
  ExternalLink,
  Mail,
  Flag,
  CheckCircle2,
} from "lucide-react";

export default function AppDetails() {
  const { appId } = useParams();

  useEffect(() => {
    document.title = "App Details | Clone Cal";
  }, []);

  const title =
    appId === "google-calendar"
      ? "Google Calendar"
      : appId
          .split("-")
          .map((w) => w[0]?.toUpperCase() + w.slice(1))
          .join(" ");

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex">
      {/* SIDEBAR */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* MAIN */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:ml-64">
        {/* BACK */}
        <div className="flex items-center gap-2 text-white/80">
          <Link
            to="/apps"
            className="inline-flex items-center gap-2 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">App Store</span>
          </Link>
        </div>

        {/* HEADER */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-start gap-6">
          <div className="h-14 w-14 shrink-0 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-lg font-black">
            31
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-semibold truncate">
              {title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-white/60">
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
                Calendar
              </span>
              <span>•</span>
              <span>Published by Cal.com</span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                <CheckCircle2 className="h-4 w-4" />1 active install
              </span>

              <button className="rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-sm">
                Disconnect
              </button>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-8 sm:mt-10 h-px w-full bg-white/10" />

        {/* CONTENT */}
        <div className="mt-8 max-w-3xl">
          <div className="text-sm text-white/70">
            items:
            <ul className="mt-3 space-y-2 list-disc list-inside text-white/75">
              <li>GCal1.png</li>
              <li>GCal2.png</li>
            </ul>
          </div>

          <div className="mt-8 h-px w-full bg-white/10" />

          <p className="mt-8 text-sm text-white/75 leading-6">
            Google Calendar is a time management and scheduling service
            developed by Google. Allows users to create and edit events, with
            options available for type and time. Available to anyone that has a
            Gmail account on both mobile and web versions.
          </p>

          <div className="mt-8">
            <div className="text-sm font-semibold">Pricing</div>
            <div className="mt-2 text-sm text-white/70">Free</div>
          </div>

          <div className="mt-8">
            <div className="text-sm font-semibold">Contact</div>
            <div className="mt-3 space-y-2 text-sm text-white/75">
              <div className="flex items-center gap-2 break-all">
                <ExternalLink className="h-4 w-4 text-white/60" />
                <span>cal.com/</span>
              </div>
              <div className="flex items-center gap-2 break-all">
                <Mail className="h-4 w-4 text-white/60" />
                <span>help@cal.com</span>
              </div>
            </div>
          </div>

          <div className="mt-10 h-px w-full bg-white/10" />

          <div className="mt-8 text-xs text-white/50 leading-5">
            Every app published on the Cal.com App Store is open source and
            thoroughly tested via peer reviews. Nevertheless, Cal.com, Inc. does
            not endorse or certify these apps unless they are published by
            Cal.com. If you encounter inappropriate content or behaviour please
            report it.
          </div>

          <button className="mt-6 inline-flex items-center gap-2 text-sm text-red-400 hover:text-red-300">
            <Flag className="h-4 w-4" />
            Report app
          </button>
        </div>

        <div className="pb-12" />
      </main>
    </div>
  );
}
