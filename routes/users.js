const router = require("express").Router();
const auth = require("../middleware/auth");
const Users = require("../model/User");
const { check, validationResult } = require("express-validator");

/**
 * @route       /api/users
 * @desc        Get list of users
 * @access      Public
 */
router.get("/", async (req, res) => {
  try {
    const users = await Users.find({}).select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send("An unexpected error has occurred!");
  }
});

module.exports = router;
