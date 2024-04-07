const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const user_schema = mongoose.Schema(
    {
        Fname: {
            type: String,
            required: [true, "Please add a first name"]
        },
        Lname: {
            type: String,
            default: " "
        },
        Email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true, // Ensure email is unique
            trim: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please enter a valid email"
            ]
        },
        Password: {
            type: String,
            required: [true, "Please add a password"],
            minlength: [8, "Password must be at least 8 characters"], // Changed to minlength
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
            default: " "
        },
        ArmyNo: {
            type: String,
            default: " "
        },
        UnitNo: {
            type: String,
            default: " "
        },
        Address: {
            type: String,
            required: [true, "Please enter an address"]
        },
    },
    {
        timestamps: true
    }
);

// Encrypt password before saving to DB
user_schema.pre("save", async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified("Password")) {
        return next();
    }

    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = bcryptjs.hash(this.Password, salt);
        this.Password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

const user_model = mongoose.model("User", user_schema);
module.exports = user_model;
