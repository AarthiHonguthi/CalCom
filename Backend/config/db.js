require("dotenv").config();
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

// Determine whether to enable SSL. For local development (localhost / 127.0.0.1)
// many Postgres installs do NOT support SSL, while hosted providers (Neon)
// require SSL. Enable SSL only when the connection host is not local.
let sslOption = false;
if (connectionString) {
  try {
    const url = new URL(connectionString);
    const host = url.hostname;
    const isLocal = host === "localhost" || host === "127.0.0.1";
    if (!isLocal) {
      // use permissive SSL for Neon/Render (skip cert verification)
      sslOption = { rejectUnauthorized: false };
    }
  } catch (e) {
    // If parsing fails, fall back to enabling SSL for non-local production
    if (process.env.NODE_ENV === "production")
      sslOption = { rejectUnauthorized: false };
  }
}

const pool = new Pool({
  connectionString: connectionString,
  ssl: sslOption,
});

pool
  .connect()
  .then(() => console.log("🟢 Connected to Postgres"))
  .catch((err) => console.error("🔴 DB connection failed:", err));

module.exports = pool;
