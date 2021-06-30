const express = require("express");
const contacts = require("../../controllers");
const router = express.Router();

router.get("/", contacts.getAll);

router.get("/:contactId", contacts.getOne);

router.post("/", express.json(), contacts.add);

router.delete("/:contactId", contacts.del);

router.patch("/:contactId", express.json(), contacts.update);

module.exports = router;
