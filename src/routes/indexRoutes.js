const router = require("express").Router();
const userController = require("../controllers/userContoller");
const passport = require("../config/passport");

router.get("/", (req, res) => {
    res.render("index");
    console.log(req.user)
});

router.get("/sign-up", userController.signUpGet);
router.post("/sign-up", userController.signUpPost);

router.get("/log-in", userController.logInGet);
router.post("/log-in", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureMessage: true
}));

router.get("/log-out", userController.logOut);

module.exports = router;