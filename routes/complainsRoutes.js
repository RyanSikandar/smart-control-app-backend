const express = require("express");
const { addComplaint, assignComplain, completeComplain, getComplains, complainbyID } = require("../controllers/complains_controllers");
const router = express.Router();

//gets complains
router.get("/getComplains", getComplains);

//adds a new complain
router.post("/addComplain", addComplaint);

//Assign Complain
router.patch("/assignComplain/:id", assignComplain);

//Completed Complain
router.patch("/completeComplain/:id", completeComplain);

//get complains by id
router.get("/Complain/:id", complainbyID);

module.exports = router;