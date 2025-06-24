const express = require("express");
const { login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", login);

router.get("/me", authMiddleware, (req, res) => {
  res.json({ id: req.user.id });
});

module.exports = router;
