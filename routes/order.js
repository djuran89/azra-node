const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/order");
const login = require("../middleware/login");

router.get("/", login.isLogin, ctrl.getOrders);
router.post("/", ctrl.createOrder);
router.delete("/", login.isLogin, ctrl.deleteOrder);

module.exports = router;
