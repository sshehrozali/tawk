const express = require("express");  // Import Express
const router = express.Router();     // Create Express router

// Listen to GET req
router.get("/", (req, res) => {
    res.send({ response: "Server is running" }).status(200)
});

module.exports = router;    // Export Module