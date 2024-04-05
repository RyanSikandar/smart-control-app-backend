const express = require("express");
const { addAllotment, getAllotmentInfo } = require("../controllers/allotment_controllers");
const router = express.Router();

//adds a new allotment and updates the facility's allottee attribute
router.post("/addAllotment", addAllotment);
router.get("/getAllotmentInfo", getAllotmentInfo);
module.exports = router;