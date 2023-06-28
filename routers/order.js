const express = require("express");
const router = express.Router();
const orderController = require("../orderController/orderController");
const {
  verifyToken,
  verifyTokenAndAuthorize,
  verifyTokenAndAdmin,
} = require("./verifyToken");

router.post("/", verifyToken, orderController.CREATE_ORDER);
router.get("/allorders", verifyTokenAndAdmin, orderController.GET_ORDERS);
router.put("/:id",  verifyTokenAndAdmin, orderController.UPDATE_ORDER);
router.delete("/:id", verifyTokenAndAdmin, orderController.DELETE_ORDER);
router.get("/:id", verifyTokenAndAuthorize, orderController.GET_ONE_ORDER); // makesure id is userid to display the order of specific user
module.exports = router;
