const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");

// There are the code of file upload
global.upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      let uploadPath = "public/uploads/";

      // Check file type and create destination folder accordingly
      if (file.mimetype.startsWith("image/")) {
        uploadPath += "images/";
      } else if (
        file.mimetype.startsWith("application/pdf") ||
        file.mimetype.startsWith("application/msword") ||
        file.mimetype.startsWith("application/vnd.ms-excel")
      ) {
        uploadPath += "documents/";
      } else {
        // Default to a general "uploads" folder for other file types
        uploadPath += "uploads/";
      }

      // Ensure the folder exists
      fs.mkdirSync(uploadPath, { recursive: true });

      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
});

// Connect DB
require("./db/connection");

// app Use
const app = express();

app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use((req, res, next) => {
  console.log("HTTP Method - " + req.method + " URL - " + req.url);
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const adminRoutes = require("./routes/v1/admin.route");
const employeeRoutes = require("./routes/v1/employee.route");

const port = 5000;

// All Routes will be here
app.get("/", (req, res) => {
  res.send("Welcome to NRECA");
});

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/employee", employeeRoutes);

app.listen(port, () => {
  console.log("listening on port " + port);
});
