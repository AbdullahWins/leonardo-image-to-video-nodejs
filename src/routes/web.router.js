const express = require("express");
const router = express.Router();

// Example route to render a view
router.get("/", (req, res) => {
  res.render("index", { title: "Welcome to My Full Stack App" });
});

module.exports = router;
