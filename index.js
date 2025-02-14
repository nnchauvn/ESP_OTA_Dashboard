const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "firmwares/" });

// Upload firmware
app.post("/upload", upload.single("firmware"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  res.send({ message: "Upload successful", filename: req.file.filename });
});

// Serve OTA firmware
app.get("/ota/latest", (req, res) => {
  const firmwarePath = path.join(__dirname, "firmwares/latest.bin");
  if (!fs.existsSync(firmwarePath)) return res.status(404).send("No firmware available.");
  res.download(firmwarePath);
});

app.listen(3000, () => console.log("Server running on port 3000"));
