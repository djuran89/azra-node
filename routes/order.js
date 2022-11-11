const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/order");
const login = require("../middleware/login");

router.get("/", login.isLogin, ctrl.getOrders);
router.post("/", ctrl.createOrder);
router.post("/user", ctrl.getOrdersByUser);
router.delete("/", login.isLogin, ctrl.deleteOrder);
router.post("/company", ctrl.createOrderForCompany);

module.exports = router;
