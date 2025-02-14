const express = require('express');
const path = require('path');
const app = express();

// Path to your firmware file (make sure it's accessible)
const firmwarePath = path.join(__dirname, 'firmware.bin');

app.get('/update', (req, res) => {
  res.sendFile(firmwarePath);
});

const port = 3000;
app.listen(port, () => {
  console.log(`OTA server running at http://localhost:${port}`);
});
