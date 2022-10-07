const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/company");
const login = require("../middleware/companyLogin");

router.get("/", ctrl.isLoginCompany);
router.post("/", ctrl.createCompany);
router.post("/login", ctrl.loginCompany);
router.post("/logout", ctrl.logoutCompany);

module.exports = router;
