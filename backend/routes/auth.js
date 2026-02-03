const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Received signup request:", req.body);
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email],
    );
    if (existing.length) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashed],
    );

    console.log("Inserted user id:", result.insertId, "email:", email);

    const token = jwt.sign(
      { id: result.insertId, email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" },
    );
    return res.status(201).json({ id: result.insertId, name, email, token });
  } catch (err) {
    console.error("Signup error", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const [rows] = await pool.query(
      "SELECT id, name, email, password FROM users WHERE email = ?",
      [email],
    );
    if (!rows.length) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" },
    );
    return res.json({ id: user.id, name: user.name, email: user.email, token });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
