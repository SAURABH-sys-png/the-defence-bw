const express = require("express");
const router = express.Router();
const { getQs, postQs } = require("../controllers/adminControllers");
const { registerUser,loginUser } = require("../controllers/userControllers");

router.post("/", registerUser);
router.post("/qs", postQs);
router.post("/login", loginUser);

module.exports = router;
