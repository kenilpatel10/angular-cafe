
const express =require("express")
const router = express.Router();
const {registerUser, loginUser, logout, getUserDetails, getAllUserDetails, updateUser, updateProfile, deleteUser, getOneUserDetails, updatePassword} = require("../controllers/userController")
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/register").post(registerUser);

router.route("/admin/users").get (getAllUserDetails);
router.route("/login").post(loginUser);
// router.route("/login/:id").put (isAuthenticatedUser, updateProfile);

// router.route("/logout").get(logout);
// router.route("/me").get (isAuthenticatedUser, getUserDetails);
// router.route("/me/update").put (isAuthenticatedUser, updateProfile);
// router.route("/password/update").put (isAuthenticatedUser, updatePassword);

//for admin
// router.route("/admin/user/:id").get (isAuthenticatedUser, getOneUserDetails);
router.route("/admin/user/:id").put( updateUser);
router.route("/admin/user/:id").delete(deleteUser);

module.exports =router;

