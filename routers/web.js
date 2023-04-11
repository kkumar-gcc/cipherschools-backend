const auth = require("../middleware/auth");

const router = require("express").Router();
require("../controllers/auth.controller");
require("../controllers/user.controller");
// register
router.post("/register", register);

// log in
router.post("/login", login);
router.get("/logout", logout);
router.get("/loggedIn", loggedIn);

// add follower method
router.post("/follow", auth, addFollower);
router.get("/users/followers", auth, getFollowers);

// get current user 
router.get("/currentUser", auth, getCurrentUser);

//user update routes
router.post("/resetpassword", auth, resetPassword);
router.post("/update-interest", auth, updateInterest);
router.post("/update-user", auth, updateUser);
module.exports = router;
