const express = require("express");
const router = express.Router();

const orderRoute = require("./order");
const userRoute = require("./user");
const productRoute = require("./product");
const companyRoute = require("./company");

router.use("/order", orderRoute);
router.use("/user", userRoute);
router.use("/product", productRoute);
router.use("/company", companyRoute);

module.exports = router;
