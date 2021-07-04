const express = require("express");

const useAuth = require("./useAuth");

const { upload, avatar } = require("../../controllers/users/uploadAvatar");

const { users: ctrl } = require("../../controllers");
const router = express.Router();

router.post("/signup", express.json(), ctrl.register);

router.post("/login", express.json(), ctrl.login);

router.post("/logout", useAuth, ctrl.logout);

router.get("/current", useAuth, ctrl.current);

router.patch("/avatars", useAuth, upload.single("avatar"), avatar);

module.exports = router;
