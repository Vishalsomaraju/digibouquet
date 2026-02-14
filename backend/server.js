require("dotenv").config();
const express = require("express");
const cors = require("cors");

const bouquetRoutes = require("./routes/bouquet");

const app = express();

/* ✅ Proper CORS Setup */
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || origin.includes("vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);

app.use(express.json());

app.use("/api/bouquet", bouquetRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
