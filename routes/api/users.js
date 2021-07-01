const express = require("express");

const useAuth = require("./useAuth");

const { users: ctrl } = require("../../controllers");
const router = express.Router();

router.post("/signup", express.json(), ctrl.register);

router.post("/login", express.json(), ctrl.login);

router.post("/logout", useAuth, ctrl.logout);

router.get("/current", useAuth, ctrl.current);

module.exports = router;
