const User = require("../models/user");
const decoder = require("jwt-decode");

async function getUser(req, res, next) {
  let user;

  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

async function getCookie(req, res, next) {
  try {
    const cookie = req.cookies ? req.cookies.UUID : null;

    if (cookie) {
      const decoded = await decoder(cookie);
      req.user = decoded;
    } else {
      req.user = {};
    }
    next();
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
}

module.exports = { getUser, getCookie };
