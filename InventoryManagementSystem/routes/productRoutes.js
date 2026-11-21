const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

// 1. CREATE PRODUCT
router.post("/", async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
});

// 2. GET ALL PRODUCTS WITH FILTERING, SORTING AND PAGINATION
router.get("/", async (req, res, next) => {
    try {
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);

        const filter = {};

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.search) {
            filter.name = {
                $regex: req.query.search,
                $options: "i"
            };
        }

        if (req.query.minPrice || req.query.maxPrice) {
            filter.price = {};

            if (req.query.minPrice) {
                filter.price.$gte = Number(req.query.minPrice);
            }

            if (req.query.maxPrice) {
                filter.price.$lte = Number(req.query.maxPrice);
            }
        }

        const total = await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .sort(req.query.sort || "name")
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            total: total,
            page: page,
            totalPages: Math.ceil(total / limit),
            count: products.length,
            products: products
        });
    } catch (error) {
        next(error);
    }
});

// 3. LOW-STOCK REPORT
router.get("/low-stock", async (req, res, next) => {
    try {
        const products = await Product.find({
            $expr: {
                $lte: ["$quantity", "$reorderLevel"]
            }
        });

        res.status(200).json({
            count: products.length,
            lowStockItems: products
        });
    } catch (error) {
        next(error);
    }
});

// 4. CATEGORY-WISE INVENTORY SUMMARY
router.get("/summary", async (req, res, next) => {
    try {
        const summary = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalItems: { $sum: 1 },
                    totalQuantity: { $sum: "$quantity" },
                    totalStockValue: {
                        $sum: {
                            $multiply: ["$price", "$quantity"]
                        }
                    },
                    avgPrice: { $avg: "$price" }
                }
            }
        ]);

        res.status(200).json({
            categories: summary.length,
            summary: summary
        });
    } catch (error) {
        next(error);
    }
});

// 5. GET SINGLE PRODUCT BY ID
router.get("/:id", async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

// 6. UPDATE PRODUCT DETAILS
router.put("/:id", async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

// 7. DELETE PRODUCT
router.delete("/:id", async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted",
            id: product._id
        });
    } catch (error) {
        next(error);
    }
});

// 8. INCREASE OR DECREASE STOCK
router.patch("/:id/stock", async (req, res, next) => {
    try {
        const change = Number(req.body.change);

        if (!Number.isFinite(change) || change === 0) {
            return res.status(400).json({
                message: "Enter a valid non-zero stock change"
            });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        if (product.quantity + change < 0) {
            return res.status(400).json({
                message: "Stock cannot be negative"
            });
        }

        product.quantity = product.quantity + change;
        await product.save();

        res.status(200).json({
            message: "Stock updated",
            product: product
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
