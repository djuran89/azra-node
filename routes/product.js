const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/product");
const login = require("../middleware/login");

router.get("/", ctrl.getActiveProducts);
router.get("/all", login.isLogin, ctrl.getProductsAll);
router.get("/category", login.isLogin, ctrl.getCategories);
router.get("/:productId", login.isLogin, ctrl.getProductById);

router.post("/", login.isLogin, ctrl.createProduct);

router.put("/", login.isLogin, ctrl.updateProduct);
router.put("/active", login.isLogin, ctrl.updateProductActive);
router.put("/price", login.isLogin, ctrl.updateProductPrice);

// router.delete("/", login.isLogin, ctrl.removeProduct);

module.exports = router;
