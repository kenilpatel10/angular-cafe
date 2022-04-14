
const express =require("express")
const router = express.Router();
const {registerUser, loginUser, logout, getUserDetails, getAllUserDetails, updateUser, updateProfile, deleteUser, getOneUserDetails, updatePassword} = require("../controllers/userController")

router.route("/register").post(registerUser);
router.route("/admin/users").get (getAllUserDetails);
router.route("/login").post(loginUser);
router.route("/admin/user/:id").put(updateUser);
router.route("/admin/user/:id").delete(deleteUser);

module.exports =router;

