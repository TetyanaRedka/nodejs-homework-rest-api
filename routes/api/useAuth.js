const passport = require("passport"); // верификация с паспорт

//верификация с паспорт
const useAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || error) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
      });
    }
    req.user = user;
    next();
  });
};

module.exports = useAuth;
