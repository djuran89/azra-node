const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/product");
const login = require("../middleware/login");

router.get("/", ctrl.getProducts);
router.get("/category", login.isLogin, ctrl.getCategories);
router.get("/:productId", login.isLogin, ctrl.getProductById);
router.post("/", login.isLogin, ctrl.createProduct);
router.put("/", login.isLogin, ctrl.updateProduct);
router.delete("/", login.isLogin, ctrl.removeProduct);
// router.post("/createMany", login.isLogin, ctrl.createMany);

module.exports = router;
