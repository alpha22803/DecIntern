const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    middleName: String,
    lastName: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        enum: ['Front-End', 'Back-End'],
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true,
    },
    qualification: String,
    monthlySalary: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    isHOD: {
        type: Boolean,
        default: false,
    },
    hodName: {
        type: String,
        default: null,
    },
});

const Employee = mongoose.model("Employee", empSchema);

module.exports = Employee;
