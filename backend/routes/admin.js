const express = require('express');
const router = express.Router();
const {getQs,postQs} = require("../controllers/adminRoutes")

router.get('/',getQs);
router.post('/',postQs);
module.exports = router;