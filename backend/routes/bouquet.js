const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const pool = require("../config/db");

/* ---------------- CREATE BOUQUET ---------------- */
router.post("/", async (req, res) => {
  try {
    const { flowers, wrap, message } = req.body;

    if (!flowers || !Array.isArray(flowers)) {
      return res.status(400).json({ error: "Invalid flowers data" });
    }

    const id = uuidv4();

    await pool.query(
      `
  INSERT INTO bouquets (id, flowers, wrap, message)
  VALUES ($1, $2::jsonb, $3, $4::jsonb)
  `,
      [
        id,
        JSON.stringify(flowers),
        wrap || null,
        JSON.stringify(message || {}),
      ],
    );

    res.json({ id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ---------------- GET BOUQUET ---------------- */
const { validate: isUuid } = require("uuid");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isUuid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const result = await pool.query("SELECT * FROM bouquets WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Not found" });
    }

    await pool.query("UPDATE bouquets SET views = views + 1 WHERE id = $1", [
      id,
    ]);

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
