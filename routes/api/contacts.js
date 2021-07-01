const express = require("express");

const useAuth = require("./useAuth");

const { contacts } = require("../../controllers");
const router = express.Router();

router.get("/", useAuth, contacts.getAll);

router.get("/:contactId", useAuth, contacts.getOne);

router.post("/", express.json(), useAuth, contacts.add);

router.delete("/:contactId", useAuth, contacts.del);

router.patch("/:contactId", express.json(), useAuth, contacts.update);

module.exports = router;
