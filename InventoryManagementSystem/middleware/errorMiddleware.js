const errorMiddleware = (err, req, res, next) => {
    console.log(err.message);

    // Duplicate SKU error
    if (err.code === 11000) {
        return res.status(400).json({
            message: "SKU already exists"
        });
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: err.message
        });
    }

    // Invalid MongoDB ID
    if (err.name === "CastError") {
        return res.status(400).json({
            message: "Invalid ID"
        });
    }

    res.status(500).json({
        message: "Internal Server Error"
    });
};

module.exports = errorMiddleware;
