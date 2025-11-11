const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// CSV file path
const csvFilePath = path.join(__dirname, "data", "survey_data.csv");

// Ensure CSV file exists with headers
if (!fs.existsSync(csvFilePath)) {
  fs.writeFileSync(csvFilePath, "Name,Language,Rating\n", "utf8");
}

// Save survey data
app.post("/submit-survey", (req, res) => {
  const { name, language, rating } = req.body;

  if (!name || !language || !rating) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const csvRow = `${name},${language},${rating}\n`;
  fs.appendFile(csvFilePath, csvRow, (err) => {
    if (err) {
      console.error("Error writing to CSV:", err);
      return res.status(500).json({ message: "Error saving data" });
    }
    res.json({ message: "Survey data saved successfully!" });
  });
});

// View the CSV file
app.get("/view-data", (req, res) => {
  res.sendFile(csvFilePath);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
