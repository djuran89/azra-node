const express = require("express");
const router = express.Router();

const orderRoute = require("./order");
const userRoute = require("./user");
const productRoute = require("./product");

router.use("/order", orderRoute);
router.use("/user", userRoute);
router.use("/product", productRoute);

module.exports = router;
