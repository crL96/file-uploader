const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const prisma = require("./prisma");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
        try {
            const message = "Incorrect username and/or password"

            const user = await prisma.user.findUnique({
                where: { username: username }
            })
            if (!user) {
                return done(null, false, { message: message });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: message });
            }
            return done(null, user);
        }
        catch(err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
        where: { id: id }
    })

    done(null, user);
  } catch(err) {
    done(err);
  }
});

module.exports = passport;