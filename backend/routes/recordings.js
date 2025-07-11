const express = require("express");
const router = express.Router();
const { getRecordings } = require("../controllers/recordings");

router.get("/", getRecordings );

module.exports = router;
