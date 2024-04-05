const express = require("express");
const facility_model = require("../models/facility_model");
const protect = require("../middleware/AuthMiddleware");
const { addFacility,facilityData,facilityDataById} = require("../controllers/facility_controller");
const router_facility = express.Router();

// Protect middle ware is used only when we want to start the function IF the user is logged in
router_facility.post("/addFacility", addFacility);
// router.post("/Login", LogInUser);
router_facility.get("/allfacilityData",facilityData);
router_facility.get("/facilityData/:id",facilityDataById);
// router.get("/FetchData", protect, FetchData);
//router.post('/FileUpload', uploadFile, uploader.single('file'))

module.exports = router_facility;