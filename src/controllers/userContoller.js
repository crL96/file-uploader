const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

function signUpGet(req, res) {
    res.render("sign-up");
};

function logInGet(req, res) {
    res.render("log-in", { errorMessage: req.session.messages });
    req.session.messages = undefined;
}

const validateUser = [
    body("username")
        .trim()
        .isAlphanumeric()
        .withMessage("Username must be alpha-numeric (only numbers and letters")
        .isLength({ min: 1, max: 25 })
        .withMessage("Username must be between 1 and 25 characters")
        //Check if username already is in use
        .custom(async (value) => {
            const exisitingUser = await prisma.user.findFirst({
                where: { username: value },
            });
            if (exisitingUser) throw new Error("Username is already in use");
        })
        .withMessage("Username is already in use"),

    body("password")
        .trim()
        .isLength({ min: 1, max: 25 })
        .withMessage("Password must be between 1 and 25 characters"),

    body("confPassword")
        .trim()
        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .withMessage("Confirm password and password must match"),
];

const signUpPost = [
    validateUser,

    async (req, res) => {
        try {
            //Check if validation passed
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).render("sign-up", {
                    errors: errors.array(),
                });
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const response = await prisma.user.create({
                data: {
                    username: req.body.username,
                    password: hashedPassword,
                },
            });
            console.log("Added user to database: " + response.username);
            res.redirect("/");
        } catch (error) {
            console.log(error.message);
            res.redirect("/sign-up");
        }
    },
];

module.exports = {
    signUpGet,
    signUpPost,
    logInGet,
};
