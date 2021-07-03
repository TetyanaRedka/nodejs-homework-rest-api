const passport = require("passport"); // верификация с паспорт
require("../../configs/config-passport");

//верификация с паспорт
const useAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = useAuth;
