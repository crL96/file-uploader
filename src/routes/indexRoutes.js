const router = require("express").Router();
const userController = require("../controllers/userContoller");

router.get("/", (req, res) => res.send("Hello world"));

router.get("/sign-up", userController.signUpGet);
router.post("/sign-up", userController.signUpPost);

module.exports = router;