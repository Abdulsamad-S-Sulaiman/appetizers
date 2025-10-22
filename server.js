const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());

// ✅ Serve images from the "public/images" folder
app.use("/images", express.static(path.join(__dirname, "public/images")));

// ✅ Load JSON data (you can edit this file anytime)
const appetizersPath = path.join(__dirname, "appetizers.json");
let appetizers = { request: [] };

// Load JSON from file (if exists)
if (fs.existsSync(appetizersPath)) {
  appetizers = JSON.parse(fs.readFileSync(appetizersPath, "utf-8"));
}

// ✅ Route: GET /appetizers
app.get("/appetizers", (req, res) => {
  res.json(appetizers);
});

// ✅ Default route (for testing)
app.get("/", (req, res) => {
  res.send("🍽️ Appetizer API is running! Try /appetizers");
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
