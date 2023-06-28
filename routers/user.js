const express = require("express");
const router = express.Router();
const userController = require("../userController/userController");
const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");


router.post("/register", userController.CREATE_USER);
router.get("/", verifyTokenAndAdmin, userController.GET_USERS);
router.post("/login", userController.USER_LOGIN);
router.put("/:id", verifyToken, userController.USER_UPDATE);
router.delete("/:id", verifyTokenAndAdmin, userController.USER_DELETE);

module.exports = router;
