const express = require("express");
const { addComplaint, assignComplain, completeComplain, getComplains } = require("../controllers/complains_controllers");
const router = express.Router();

//gets complains
router.get("/getComplains", getComplains);

//adds a new complain
router.post("/addComplain", addComplaint);

//Assign Complain
router.patch("/assignComplain/:id", assignComplain);

//Completed Complain
router.patch("/completeComplain/:id", completeComplain);
module.exports = router;