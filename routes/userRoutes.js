const express = require("express");
const user_model = require("../models/user_model");
const {RegisterUser, LogInUser, LogOut, FetchData, LoginStatus, uploadFile} = require("../controllers/user_controller");
const protect = require("../middleware/AuthMiddleware");
const ffmpeg = require('fluent-ffmpeg');
const multer = require('multer');
const uploader = require('../middleware/Upload');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// Protect middle ware is used only when we want to start the function IF the user is logged in
router.post("/Register", RegisterUser);
router.post("/Login", LogInUser);
router.get("/Logout", LogOut);
router.get("/FetchData", protect, FetchData);


//router.post('/FileUpload', uploadFile, uploader.single('file'))

module.exports = router;