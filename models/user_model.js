const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const user_schema = mongoose.Schema(
    {
        Fname:
        {
            type: String,
            required: [true, "Please add a name"]
        },
        Lname:
        {
            type: String,
            required: [true, "Please add a name"]
        }
        , Email:
        {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
            trim: true,
            match:
                [
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid email"
                ]
        },

        Password:
        {
            type: String,
            required: [true, "Please add a password"],
            minLength: [8, "Password must be at least 8 charachters"],
            //maxLength: [20, "Password must have at most 20 charachters"],
        },
        Contact: {
            type: Number,
            required: [true, "Please add a contact number"]
        },
        CNIC: {
            type: Number,
            required: [true, "Please add a CNIC number"],
            length: [13, "CNIC must be 13 digits long"]
        },
        Gender: {
            type: String,
            required: [true, "Please enter a gender"]
        },
        Type: {
            type: String,
            required: [true, "Please enter a type"]
        },
        ArmyNo: {
            type: String,
            required: [true, "Please enter a Army Number"]
        },
        UnitNo: {
            type: String,
            required: [true, "Please enter a Unit Number"]
        },
        Address: {
            type: String,
            required: [true, "Please enter a address"]
        },

    },
    {
        timestamps: true
    }
);

// Encrypt password before saving to DB
user_schema.pre("save", async function (next) {
    // This ensures that the password is only hashed when it is modified
    if (!this.isModified("Password")) {
        return next();
    };

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(this.Password, salt);
    this.Password = hashedPassword;
    next();
});

const user_model = mongoose.model("User", user_schema);
module.exports = user_model;