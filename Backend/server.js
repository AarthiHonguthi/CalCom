const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/event-types", require("./routes/eventRoutes"));
app.use("/api/availability", require("./routes/availabilityRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on localhost:${PORT}`));
