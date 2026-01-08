const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: ["https://calcom-kdz8.onrender.com", "https://cal-com-clone-beta.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/event-types", require("./routes/eventRoutes"));
app.use("/api/availability", require("./routes/availabilityRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

