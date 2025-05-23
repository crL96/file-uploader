const router = require("express").Router();
const userController = require("../controllers/userContoller");
const passport = require("../config/passport");

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/sign-up", userController.signUpGet);
router.post("/sign-up", userController.signUpPost);

router.get("/log-in", userController.logInGet);
router.post("/log-in", passport.authenticate("local", {
    successRedirect: "/storage",
    failureRedirect: "/log-in",
    failureMessage: true
}));

router.get("/log-out", userController.logOut);

module.exports = router;