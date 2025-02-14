const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Configure storage for the OTA firmware file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'firmware'); // Folder to store firmware files
  },
  filename: function (req, file, cb) {
    cb(null, 'firmware.bin');
  }
});

const upload = multer({ storage: storage });

// Endpoint to upload the firmware
app.post('/upload', upload.single('firmware'), (req, res) => {
  console.log('Firmware uploaded');
  res.send('Firmware uploaded successfully');
});

// Serve the firmware to ESP32
app.get('/firmware', (req, res) => {
  const filePath = path.join(__dirname, 'firmware', 'firmware.bin');
  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
