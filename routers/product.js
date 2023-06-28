const express = require("express");
const router = express.Router();
const prodController= require('../prodController/prodController');
const { verifyTokenAndAdmin } = require("./verifyToken");


router.post("/",verifyTokenAndAdmin, prodController.CREATE_PRODUCT)
router.get("/allproduct", prodController.GET_PRODUCTS);
router.put("/:id",verifyTokenAndAdmin, prodController.UPDATE_PRODUCT);
router.delete("/:id",verifyTokenAndAdmin,prodController.DELETE_PRODUCT)
router.get("/:id",prodController.GET_ONE_PROD)
module.exports = router;