// -------------------------------------------------------------------------------------
const express = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const asyncHandler = require("express-async-handler"); // to prevent try catch blocks
const user_model = require("../models/user_model");
const crypto = require("crypto");
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
// This is used to ensure user logs out automatically after 1 day of logging in
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
const RegisterUser = asyncHandler(async (req, resp) => {
    const { fname, lname, email, password, contact, cnic, gender, type, ArmyNo, UnitNo, Address } = req.body;
    console.log(req.body);
    
    // Validation if user enters an empty string
    if (!fname || !lname || !email || !password || !contact || !cnic || !gender || !type || !ArmyNo || !UnitNo || !Address) {
        resp.status(400);
        throw new Error("Please provide all required fields");
    }

    // Validation if user enters short password
    if (password.length < 8) {
        resp.status(400);
        throw new Error("Password must be at least 8 characters");
    }

    // Check if user email already exists
    const userExists = await user_model.findOne({ Email: email });
    if (userExists) {
        resp.status(400);
        throw new Error("Email is already in use.");
    }

    // Create new user if they do not exist in Database
    const user = await user_model.create({
        Fname: fname,
        Lname: lname,
        Email: email,
        Password: password,
        Contact: contact,
        CNIC: cnic,
        Gender: gender,
        Type: type,
        ArmyNo: ArmyNo,
        UnitNo: UnitNo,
        Address: Address,
    });

    // Get the details of the user when the account is created
    if (user) {
        resp.status(201).json({
            _id: user._id,
            Fname: user.Fname,
            Lname: user.Lname,
            Email: user.Email,
            Contact: user.Contact,
            CNIC: user.CNIC,
            Gender: user.Gender,
            Type: user.Type,
            ArmyNo: user.ArmyNo,
            UnitNo: user.UnitNo,
            Address: user.Address
        });
    } else {
        resp.status(400);
        throw new Error("Invalid User Data");
    }
});


// -------------------------------------------------------------------------------------



// -------------------------------------------------------------------------------------
// Login user
const LogInUser = asyncHandler(async (req, resp) => {
    const { email, password } = req.body;

    // Validation if user enters an empty string
    if (!password || !email) {
        resp.status(400);
        throw new Error("Please fill in all the required fields.");
    }

    // Check if user email already exists
    const user = await user_model.findOne({ Email: email });

    if (!user) {
        resp.status(400);
        throw new Error("User not found please sign up!");
    };

    // Validation if user enters password and it is correct or not
    const passwordisCorrect = await bcryptjs.compare(password, user.Password);

    // Generate token
    const token = generateToken(user._id);

    // Send http only cookie
    resp.cookie("Token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true
    });

    if (user && passwordisCorrect) {
        resp.status(200).json({
            message: "Login Successful",
            data: {
                _id: user.id,
                name: user.Fname,
                email: user.Email,
                token
            }

        });
    }
    else {
        resp.status(400);
        throw new Error("Invalid Email or Password");
    }
});
// -------------------------------------------------------------------------------------


// -------------------------------------------------------------------------------------
const LogOut = asyncHandler(async (req, resp) => {
    // Send http only cookie
    resp.cookie("Token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true
    });

    return resp.status(200).json({
        message: "Succesfully Logged Out",
    })
});
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
const FetchData = asyncHandler(async (req, resp) => {
    const user = await user_model.findById(req.user._id);
    if (user) {
        resp.status(201).json({
            _id: user.id,
            name: user.Fname,
            email: user.email,
            password: user.Password
        })
    }
    else {
        resp.status(400);
        throw new Error("User not found");
    }

});

const getUsers = asyncHandler(async (req, res) => {
    const users = await user_model.find();
    //send data except password
    users.forEach(user => {
        user.Password = undefined;
    });
    res.status(200).json({ data: users });
})
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
const LoginStatus = asyncHandler(async (req, resp) => {
    const token = req.cookies.Token;

    if (!token) {
        return resp.json(false);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
        return resp.json(true);
    }
    else {
        return resp.json(false);
    }

});
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------



// -------------------------------------------------------------------------------------

const uploadFile = (req, res) => {
    res.json({ filename: req.file.filename });
};
// -------------------------------------------------------------------------------------


// -------------------------------------------------------------------------------------
module.exports = {
    RegisterUser,
    LogInUser,
    LogOut,
    FetchData,
    LoginStatus,
    uploadFile,
    getUsers
};
// -------------------------------------------------------------------------------------