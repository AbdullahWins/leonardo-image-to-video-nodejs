const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");

// Load environment variables from .env file
dotenv.config();

const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the /public folder
app.use(express.static(path.join(__dirname, "public")));

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import routes
const apiRoutes = require("./routes/api.router");
const webRoutes = require("./routes/web.router");
const { serverPort } = require("../configs/env.config");

// Use routes
app.use("/api", apiRoutes); // API routes for backend functionality
app.use("/", webRoutes); // Web routes for rendering views

// Start the server
const PORT = serverPort;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
