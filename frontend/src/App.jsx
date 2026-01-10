import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import CreateEvent from "./pages/CreateEvent"; // Import
import Bookings from "./pages/Bookings"; // Import
import BookingPage from "./pages/BookingPage";
import Success from "./pages/Success";
import EditEvent from "./pages/EditEvent";
import Teams from "./pages/Teams";
import AppStore from "./pages/AppStore.jsx";
import AppDetails from "./pages/AppDetails";
import Routing from "./pages/Routing.jsx";
import Workflows from "./pages/Workflows.jsx";
import Insights from "./pages/Insights.jsx";
import Availability from "./pages/Availability.jsx";
import AvailabilityEditor from "./pages/AvailabilityEditor.jsx";
import ConfirmBooking from "./pages/ConfirmBooking.jsx";
import BookingSuccess from "./pages/BookingSuccess";
import PublicPage from "./pages/PublicPage";


import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/edit/:id" element={<EditEvent />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/:slug" element={<BookingPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/apps" element={<AppStore />} />
        <Route path="/apps/:appId" element={<AppDetails />} />
        <Route path="/routing" element={<Routing />} />
        <Route path="/workflows" element={<Workflows />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/availability" element={<Availability />} />
        <Route path="/availability/:id" element={<AvailabilityEditor />} />
        <Route path="/book/:slug/confirm" element={<ConfirmBooking />} />
        <Route path="/booking/success" element={<BookingSuccess />} />
        <Route path="/public" element={<PublicPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
