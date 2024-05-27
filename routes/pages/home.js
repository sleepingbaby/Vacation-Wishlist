const express = require("express");
const router = express.Router();
const User = require("../../models/user.js");
const Card = require("../../models/card.js");
const { getCookie } = require("../../middleware/authMiddleware.js");

// Render the home page if user is logged in
router.get("/", getCookie, async (req, res) => {
  try {
    if (req.user.userId) {
      const userId = req.user.userId;

      const userDestinations = await User.findById(userId).populate("cards");

      const destinations = userDestinations.cards;

      return res.render("home.hbs", {
        logged_in: true,
        user: userDestinations.toObject(),
        destinations: destinations.map((destination) => destination.toObject()),
      });
    } else {
      return res.render("home.hbs", {
        logged_in: false,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/login", (req, res) => {
  return res.render("login.hbs");
});

router.get("/signup", (req, res) => {
  return res.render("signup.hbs");
});

module.exports = router;
