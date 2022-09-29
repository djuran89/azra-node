const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/user");

router.post("/admin/login", ctrl.loginUser);
router.post("/logout", ctrl.logoutUser);
router.post("/isLogin", ctrl.isLogin);

module.exports = router;
