const register = require("./signup");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const verify = require("./verify");
const secondaryEmail = require("./secondaryEmail");

module.exports = {
  register,
  login,
  logout,
  current,
  verify,
  secondaryEmail,
};
