const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const facility_schema = mongoose.Schema(
    {
        Fcode:
        {
            type: String,
            unique: true, // fcode must be unique
            required: [true, "Please add a Facility Code"]
        },
        City:
        {
            type: String,
            required: [true, "Please add a city"]
        }
        , Type:
        {
            type: String,
            required: [true, "Please add an type"],
        },
        Address:{
            type: String,
            required: [true, "Please add an Address"],
        },
        Year:
        {
            type: Number,
            required: [true, "Please add a Year"],
        },
        Date: {
            type: String,
            required: [true, "Please add a date"],

        },
        URL: {
            type: String,
            required: [true, "Please add a Maps URL"],
        },
        Allottee: {
            type: String,
            default: ""
        },
        Status:
        {
            type: String,
            default: "UnAllotted"
        },
    },
    {
        timestamps: true
    }
);


const facility_model = mongoose.model("Facility", facility_schema);
module.exports = facility_model;