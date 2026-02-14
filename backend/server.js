require("dotenv").config();
const express = require("express");
const cors = require("cors");

const bouquetRoutes = require("./routes/bouquet");

const app = express();

/* ---------------- CORS CONFIG ---------------- */
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev (Vite)
      "http://localhost:3000", // optional
      "https://digitalbouquet.vercel.app", // your frontend
    ],
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.json());

/* ---------------- ROUTES ---------------- */
app.use("/api/bouquet", bouquetRoutes);

/* ---------------- HEALTH CHECK (important for Render) ---------------- */
app.get("/", (req, res) => {
  res.send("Digibouquet backend is running 🌸");
});

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
