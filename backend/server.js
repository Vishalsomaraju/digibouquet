require("dotenv").config();
const express = require("express");
const cors = require("cors");

const bouquetRoutes = require("./routes/bouquet");

const app = express();

/* ===========================
   TRUST PROXY (Render Safe)
=========================== */
app.set("trust proxy", 1);

/* ===========================
   CORS CONFIG (FULL PROOF)
=========================== */
const allowedOrigins = [
  "https://digitalbouquet.vercel.app",
  "https://digibouquet.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server & Postman
      if (!origin) return callback(null, true);

      // Allow all Vercel preview deployments
      if (origin.includes("vercel.app")) {
        return callback(null, true);
      }

      // Allow specific domains (if you want strict)
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

/* Handle preflight explicitly */
app.options("/", cors());

/* ===========================
   MIDDLEWARE
=========================== */
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

/* ===========================
   HEALTH CHECK
=========================== */
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "DigiBouquet API running 💐",
  });
});

/* ===========================
   ROUTES
=========================== */
app.use("/api/bouquet", bouquetRoutes);

/* ===========================
   404 HANDLER
=========================== */
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

/* ===========================
   GLOBAL ERROR HANDLER
=========================== */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);

  res.status(500).json({
    error: "Internal server error",
  });
});

/* ===========================
   UNCAUGHT EXCEPTION HANDLING
=========================== */
process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("💥 Unhandled Rejection:", err);
});

/* ===========================
   START SERVER
=========================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
