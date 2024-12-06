const express = require("express");
const app = express.Router();

const adminController = require("../../controllers/admin.controller");

app.get("/all", adminController.getAllAdmin);
app.get("/", adminController.getAdmin);
app.post("/register", adminController.createAdmin);
app.post("/login", adminController.adminLogin);
app.put("/:adminId", adminController.updatedAdmin);
app.delete("/:adminId", adminController.deleteAdmin);

module.exports = app;
