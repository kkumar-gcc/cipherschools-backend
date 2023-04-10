const router = require("express").Router();
require("../controllers/auth.controller");

// register
router.post("/register",register );

// log in
router.post("/login", login);
router.get("/logout", logout);

router.get("/loggedIn", loggedIn);

module.exports = router;
