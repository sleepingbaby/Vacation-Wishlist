const express = require("express");
const router = express.Router();
const User = require("../../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create One User
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email: email,
    password: hashedPassword,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    } else {
      const token = jwt.sign({ userId: user._id }, "UT", {
        expiresIn: "1d",
      });

      res.cookie("UUID", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });

      return res.status(200).json("Successfully logged in");
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Logout and delete cookie
router.get("/logout", (req, res) => {
  res.clearCookie("UUID");
  return res.status(200).json({ message: "Successfully logged out" });
});

// router.use("/:id", getUser);

// // Get One User
// router.get("/:id", (req, res) => {
//   res.json(res.user);
// });

// // Update One User
// router.put("/:id", async (req, res) => {
//   if (req.body.email != null) {
//     res.user.email = req.body.email;
//   }

//   try {
//     const updatedUser = await res.user.save();
//     res.json(updatedUser);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete One User
// router.delete("/:id", async (req, res) => {
//   try {
//     await res.user.deleteOne();
//     res.json({ message: "Deleted User" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

module.exports = router;
