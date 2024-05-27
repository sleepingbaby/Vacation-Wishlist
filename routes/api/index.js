const express = require("express");
const router = express.Router();

const destinationRoutes = require("./cards.js");
const authRoutes = require("./users.js");

router.use("/destinations", destinationRoutes);
router.use("/auth", authRoutes);

module.exports = router;
