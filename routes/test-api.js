/**
 * @file Test API
 */

const router = require("express").Router();
const auth = require("../middleware/auth");

/**
 * @description Dummy API
 */
router.get("/", auth, (req, res) => {
  res.status(200).send({ message: "OK" });
});

module.exports = router;
