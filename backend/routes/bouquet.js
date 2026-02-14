const express = require("express");
const router = express.Router();
const { v4: uuidv4, validate: isUuid } = require("uuid");
const pool = require("../config/db");

/* ===============================
   CREATE BOUQUET
================================ */
router.post("/", async (req, res) => {
  try {
    const { flowers, wrap, message } = req.body;

    // Validate flowers
    if (!Array.isArray(flowers) || flowers.length === 0) {
      return res.status(400).json({
        error: "Flowers must be a non-empty array",
      });
    }

    const id = uuidv4();

    await pool.query(
      `
      INSERT INTO bouquets (id, flowers, wrap, message, views)
      VALUES ($1, $2::jsonb, $3, $4::jsonb, 0)
      `,
      [
        id,
        JSON.stringify(flowers),
        wrap || null,
        message ? JSON.stringify(message) : null,
      ],
    );

    return res.status(201).json({ id });
  } catch (err) {
    console.error("CREATE ERROR:", err);

    return res.status(500).json({
      error: "Database insert failed",
      details: err.message,
    });
  }
});

/* ===============================
   GET BOUQUET
================================ */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isUuid(id)) {
      return res.status(400).json({
        error: "Invalid ID format",
      });
    }

    const result = await pool.query("SELECT * FROM bouquets WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Bouquet not found",
      });
    }

    // Increment views safely
    await pool.query(
      "UPDATE bouquets SET views = COALESCE(views, 0) + 1 WHERE id = $1",
      [id],
    );

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("GET ERROR:", err);

    return res.status(500).json({
      error: "Database fetch failed",
      details: err.message,
    });
  }
});

module.exports = router;
