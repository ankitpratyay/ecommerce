const express = require("express");
const router = express.Router();
const cartController = require("../cartController/cartController");
const {
  verifyToken,
  verifyTokenAndAuthorize,
  verifyTokenAndAdmin,
} = require("./verifyToken");

router.post("/", verifyToken, cartController.CREATE_CART);
router.get("/allcart", verifyTokenAndAdmin, cartController.GET_CARTS);
router.put("/:id", verifyTokenAndAuthorize, cartController.UPDATE_CART);
router.delete("/:id", verifyTokenAndAuthorize, cartController.DELETE_CART_ITEM);
router.get("/:id", verifyTokenAndAuthorize, cartController.GET_ONE_CART_ITEM); // makesure id is userid to display the cart of specific user
module.exports = router;
