const express = require("express");

const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");

const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

// Allows server to read JSON data
app.use(express.json());

// Custom logger middleware
app.use(logger);


// ==========================================
// ROUTES
// ==========================================

app.use("/students", studentRoutes);


// ==========================================
// 404 ERROR HANDLER
// ==========================================

app.use((req, res) => {

    res.status(404).json({
        message: "Route not found"
    });

});


// ==========================================
// START SERVER
// ==========================================

const PORT = 3000;

app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});