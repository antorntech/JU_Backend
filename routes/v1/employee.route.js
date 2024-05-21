const express = require("express");
const app = express.Router();

const employeeControllers = require("../../controllers/employee.controller");
const { auth } = require("../../middleware/auth");

app.get("/", employeeControllers.allEmployee);
app.get("/:id", employeeControllers.singleEmployee);
app.post(
  "/addEmployee",
  upload.single("avatar"),
  employeeControllers.addEmployee
);
app.put("/:id", upload.single("avatar"), employeeControllers.updateEmployee);
app.delete("/:id", employeeControllers.deleteEmployee);

module.exports = app;
