const express = require("express");
const { addAllotment, getAllAllotmentInfo, getAllotment } = require("../controllers/allotment_controllers");
const router = express.Router();

//adds a new allotment and updates the facility's allottee attribute
router.post("/addAllotment", addAllotment);

//gets all allotment info
router.get("/getAllotmentInfo", getAllAllotmentInfo);

//gets all allotment info by id
router.get("/getAllotmentInfo/:id", getAllotment);

module.exports = router;