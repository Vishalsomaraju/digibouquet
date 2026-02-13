require("dotenv").config();
const express = require("express");
const cors = require("cors");

const bouquetRoutes = require("./routes/bouquet");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bouquet", bouquetRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
