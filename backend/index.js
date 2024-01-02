const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Employee = require("./models/Employee");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/empDB", { useNewUrlParser: true, useUnifiedTopology: true });

// Handle MongoDB connection errors
mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

function calculateAge(dob) {
    // Parse the date of birth string into a Date object
    const dobDate = new Date(dob);

    // Get the present date
    const presentDate = new Date();

    // Calculate the difference in milliseconds
    const timeDifference = presentDate - dobDate;

    // Calculate the age in years
    const ageInMilliseconds = new Date(timeDifference);
    const years = Math.abs(ageInMilliseconds.getUTCFullYear() - 1970);

    return years;
}

app.get("/", async function (req, res) {
    try {
        const result = await Employee.find({});
        let male = 0, female = 0;

        if (result.length > 0) {
            result.forEach(function (item) {
                if (item.gender === "Male")
                    male += 1;
                else
                    female += 1;
            });
            male = parseFloat(((male / result.length) * 100).toFixed(1));
            female = parseFloat(((female / result.length) * 100).toFixed(1));
        } else {
            male = 0;
            female = 0;
        }
        console.log(male, female);
        res.status(200).json({ employee: result, totalEmp: result.length, mcount: male, fcount: female });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.post("/addEmp", async function (req, res) {
    try {
        const newItem = new Employee({
            _id: new mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            department: req.body.department,
            dob: new Date(req.body.dob),
            age: calculateAge(req.body.dob),
            gender: req.body.gender,
            qualification: req.body.qualification,
            monthlySalary: req.body.monthlySalary,
            email: req.body.email,
            mobile: req.body.mobile,
            isHOD: req.body.isHOD,
            hodName: req.body.hodName,
        });

        // Save the new item to the database
        await newItem.save();

        // Fetch the updated data after the new item has been saved
        const updatedData = await Employee.find({});

        let male = 0, female = 0;
        updatedData.forEach(function (item) {
            if (item.gender === "Male")
                male += 1;
            else
                female += 1;
        });

        male = parseFloat(((male / updatedData.length) * 100).toFixed(1));
        female = parseFloat(((female / updatedData.length) * 100).toFixed(1));

        res.status(200).json({ message: "Employee added successfully", employee: updatedData, mcount: male, fcount: female, totalLen: updatedData.length });
    } catch (error) {
        console.error("Error adding employee:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});


app.put("/updateEmp", async function (req, res) {
    try {
        console.log(req.body._id);

        const result = await Employee.updateOne({ _id: req.body._id }, {
            employeeCode: req.body.employeeCode,
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            department: req.body.department,
            dob: new Date(req.body.dob),
            gender: req.body.gender,
            qualification: req.body.qualification,
            monthlySalary: req.body.monthlySalary,
            email: req.body.email,
            mobile: req.body.mobile,
            isHOD: req.body.isHOD,
            hodName: req.body.hodName,
        });
        let male = 0, female = 0;
        const updatedData = await Employee.find({});
        updatedData.forEach(function (item) {
            if (item.gender === "Male")
                male += 1;
            else
                female += 1;
        });
        male = parseFloat(((male / updatedData.length) * 100).toFixed(1));
        female = parseFloat(((female / updatedData.length) * 100).toFixed(1));
        res.status(200).json({ message: "Employee updated successfully", employee: updatedData, mcount: male, fcount: female, totalLen: updatedData.length });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
