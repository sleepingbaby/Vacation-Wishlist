const express = require("express");
const router = express.Router();
const { getCookie } = require("../../middleware/authMiddleware.js");
const { getImage } = require("../../utilities/getImage.js");
const Destination = require("../../models/card.js");
const User = require("../../models/user.js");

router.post("/addDestination", getCookie, async (req, res) => {
  try {
    const { name, location, description } = req.body;
    const photoUrl = await getImage(name);
    const userId = req.user.userId;

    const newDestination = new Destination({
      name,
      location,
      description,
      image: photoUrl,
    });

    const destination = await newDestination.save();
    const destinationId = destination._id;

    const user = await User.findById(userId);
    user.cards.push(destinationId);

    await user.save();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.put("/updateDestination/:id", getCookie, (req, res) => {
  res.send("Update a card here");
});

module.exports = router;
