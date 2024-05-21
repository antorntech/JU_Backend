const Employee = require("../models/Employee");

module.exports.allEmployee = async (req, res) => {
  try {
    const users = await Employee.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error, "Error");
    res.send("Inter Server Error");
  }
};

module.exports.singleEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employee.findOne({ _id: id });

    res.status(200).json({
      status: "success",
      message: "Data find successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data not find",
      error: error,
    });
  }
};

module.exports.addEmployee = async (req, res, next) => {
  try {
    const getEmail = req.body.officeEmail;

    const emailPattern = /^[\w-]+(\.[\w-]+)*@octetit\.info$/;
    if (!emailPattern.test(getEmail)) {
      res.status(400).send("Invalid email address");
    } else {
      const existingEmployee = await Employee.findOne({ email: getEmail });

      if (existingEmployee) {
        res.status(400).send("Employee already exists");
      } else {
        // Check if files were uploaded
        if (req.file) {
          Object.assign(req.body, {
            avatar: "/uploads/images/" + req.file.filename,
          });
        }

        const result = await Employee.create(req.body);

        return res.status(201).json({
          status: "success",
          message: "Employee created successfully!",
          data: result,
        });
      }
    }
  } catch (error) {
    console.log(error, "Error");
    res.status(400).send(error);
  }
};

module.exports.updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.file) {
      Object.assign(req.body, {
        avatar: "/uploads/images/" + req.file.filename,
      });
    }

    const employee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    const updatedEmployee = await Employee.findOne({ _id: id });

    return res.status(200).json({
      status: "success",
      message: "Data updated successfully!",
      data: updatedEmployee,
    });
  } catch (error) {
    console.log(error, "Error");
    res.send("Internal Server Error");
  }
};

module.exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    return res.json(deletedEmployee);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};
