const pool = require("../config/db");

exports.getAvailableSlots = async (req, res) => {
  try {
    const { date, slug } = req.query;

    const event = (
      await pool.query("SELECT * FROM event_types WHERE slug=$1 LIMIT 1", [
        slug,
      ])
    ).rows[0];

    if (!event) return res.json([]);

    const duration = event.duration;

    const avail = (
      await pool.query("SELECT schedule FROM availability WHERE user_id=$1", [
        1,
      ])
    ).rows[0];

    if (!avail) return res.json([]);

    const schedule = avail.schedule;
    const day = new Date(date).getDay();

    // Check for date overrides in the stored schedule
    // Overrides are expected under schedule.overrides keyed by ISO date (YYYY-MM-DD)
    let windows = null;
    if (schedule && schedule.overrides && schedule.overrides[date]) {
      const override = schedule.overrides[date];
      if (override.unavailable) return res.json([]);

      // If override provides explicit slots, use them.
      if (override.slots && override.slots.length > 0) {
        windows = override.slots;
      } else if (override.blocks && override.blocks.length > 0) {
        // If override provides blocks (times to remove), subtract them from the normal daily windows
        const base = schedule ? schedule[day] || [] : [];

        // Helper: convert HH:MM to minutes
        const toMins = (t) => {
          const [hh, mm] = t.split(":").map(Number);
          return hh * 60 + mm;
        };

        // Helper: convert minutes to HH:MM
        const fromMins = (m) => {
          const hh = Math.floor(m / 60)
            .toString()
            .padStart(2, "0");
          const mm = (m % 60).toString().padStart(2, "0");
          return `${hh}:${mm}`;
        };

        const blocks = override.blocks.map((b) => ({
          start: toMins(b.start),
          end: toMins(b.end),
        }));

        // For each base window, subtract all blocks
        const resultWindows = [];
        base.forEach((w) => {
          let segments = [{ start: toMins(w.start), end: toMins(w.end) }];

          blocks.forEach((blk) => {
            const newSegments = [];
            segments.forEach((seg) => {
              // No overlap
              if (blk.end <= seg.start || blk.start >= seg.end) {
                newSegments.push(seg);
                return;
              }

              // Overlap exists — left portion
              if (blk.start > seg.start) {
                newSegments.push({
                  start: seg.start,
                  end: Math.min(seg.end, blk.start),
                });
              }

              // Right portion
              if (blk.end < seg.end) {
                newSegments.push({
                  start: Math.max(seg.start, blk.end),
                  end: seg.end,
                });
              }
            });
            segments = newSegments;
          });

          segments.forEach((s) => {
            if (s.end > s.start)
              resultWindows.push({
                start: fromMins(s.start),
                end: fromMins(s.end),
              });
          });
        });

        windows = resultWindows;
      } else {
        // No explicit override slots/blocks — fall back to daily schedule
        windows = schedule ? schedule[day] : [];
      }
    } else {
      windows = schedule ? schedule[day] : null;
    }

    if (!windows || windows.length === 0) {
      console.log(
        "[slots] no windows for date",
        date,
        "day",
        day,
        "override",
        schedule && schedule.overrides && schedule.overrides[date]
      );
      return res.json([]);
    }

    // Build slots using minute arithmetic (avoid Date timezone parsing issues)
    const pad = (n) => String(n).padStart(2, "0");
    const timeToMins = (t) => {
      const [hh, mm] = t.split(":").map(Number);
      return hh * 60 + mm;
    };

    let slots = [];

    windows.forEach(({ start, end }) => {
      const startM = timeToMins(start);
      const endM = timeToMins(end);
      let cur = startM;
      while (cur < endM) {
        const hh = Math.floor(cur / 60);
        const mm = cur % 60;
        const slotStr = `${date}T${pad(hh)}:${pad(mm)}:00`;
        slots.push(slotStr);
        cur += duration;
      }
    });

    console.log(
      "[slots] using windows for date",
      date,
      JSON.stringify(windows)
    );

    const bookedRows = (
      await pool.query(
        "SELECT start_time FROM bookings WHERE event_type_id=$1 AND DATE(start_time)=DATE($2)",
        [event.id, date]
      )
    ).rows;

    // Normalize booked times to the same naive local format 'YYYY-MM-DDTHH:MM:SS'
    const booked = bookedRows.map((b) => {
      const d = new Date(b.start_time);
      const y = d.getFullYear();
      const m = pad(d.getMonth() + 1);
      const da = pad(d.getDate());
      const hh = pad(d.getHours());
      const mm = pad(d.getMinutes());
      return `${y}-${m}-${da}T${hh}:${mm}:00`;
    });

    slots = slots.filter((s) => !booked.includes(s));

    res.json(slots);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { event_type_id, booker_name, booker_email, start_time, end_time } =
      req.body;

    const result = await pool.query(
      `INSERT INTO bookings (event_type_id, booker_name, booker_email, start_time, end_time)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [event_type_id, booker_name, booker_email, start_time, end_time]
    );

    res.json(result.rows[0]);
  } catch {
    console.error("createBooking error:", arguments, new Error().stack);
    // Try to return the error message when available to aid debugging (safe for staging)
    const err = arguments[0] || new Error("Unknown error");
    const msg = err && err.message ? err.message : "Server Error";
    res.status(500).json({ error: msg });
  }
};

exports.getDashboardBookings = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, e.title AS event_title
      FROM bookings b
      JOIN event_types e ON b.event_type_id=e.id
      ORDER BY b.start_time DESC
    `);

    res.json(result.rows);
  } catch {
    res.status(500).send("Server Error");
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    await pool.query(`UPDATE bookings SET status='cancelled' WHERE id=$1`, [
      req.params.id,
    ]);
    res.sendStatus(204);
  } catch {
    res.status(500).send("Server Error");
  }
};
