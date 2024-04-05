// -------------------------------------------------------------------------------------
const express = require("express");
const asyncHandler = require("express-async-handler"); // to prevent try catch blocks
const facility_model = require("../models/facility_model");
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
const addFacility = asyncHandler(async (req, resp) => {
    const { Fcode, City, Type, Year, Date, URL, Allottee, Status, Address } = req.body;
    // Validation if user enters an empty string
    if (!Fcode || !City || !Type || !Year || !Date || !URL || !Address) {
        resp.status(400);
        throw new Error("Please provide all required fields");
    }

    // Check if facility already exists
    const faciltyExists = await facility_model.findOne({ Fcode });
    if (faciltyExists) {
        resp.status(400);
        throw new Error("Facility already exists.");
    };

    //create new facility if it does not exist in Database
    const newFacility = await facility_model.create({
        Fcode,
        City,
        Type,
        Year,
        Date,
        URL,
        Allottee,
        Status,
        Address
    });


    // Check if the facility was successfully created
    if (newFacility) {
        resp.status(201).json({
            message: "Facility Created",
            data: {
                _id: newFacility._id,
                Fcode: newFacility.Fcode,
                City: newFacility.City,
                Type: newFacility.Type,
                Year: newFacility.Year,
                Date: newFacility.Date,
                URL: newFacility.URL,
                Allottee: newFacility.Allottee,
                Status: newFacility.Status,
                Address: newFacility.Address
            }
        });
    } else {
        resp.status(400);
        throw new Error("Invalid Facility Data");
    }
});

// -------------------------------------------------------------------------------------



// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------


// -------------------------------------------------------------------------------------

const facilityData = asyncHandler(async (req, resp) => {
    const facility = await facility_model.find();
    if (facility) {
        resp.status(201).json({
            data: facility
        })
    }
    else {
        resp.status(400);
        throw new Error("User not found");
    }

});


const facilityDataById = asyncHandler(async (req, resp) => {
    const facility = await facility_model.findById(req.params.id);
    if (facility) {
        resp.status(201).json({
            data: facility
        })
    }
    else {
        resp.status(400);
        throw new Error("User not found");
    }
})
// -------------------------------------------------------------------------------------
module.exports = {
    addFacility,
    facilityData,
    facilityDataById,
};
// -------------------------------------------------------------------------------------