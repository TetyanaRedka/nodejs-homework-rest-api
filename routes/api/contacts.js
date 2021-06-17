const express = require("express");
const router = express.Router();

const { schemaContact } = require("../../validation/contacts");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../model");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({
    status: "success",
    code: "200",
    data: {
      contacts,
    },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return res.status(404).json({
      status: "error",
      code: "404",
      message: "Not found contact",
    });
  }

  res.status(200).json({
    status: "success",
    code: "200",
    data: {
      contact,
    },
  });
});

router.post("/", async (req, res, next) => {
  const newContact = req.body;
  const validatedResult = schemaContact.validate(newContact);

  if (validatedResult.error) {
    return res.status(400).json({
      status: "error",
      code: "400",
      message: "missing required field",
    });
  }
  const contact = await addContact(newContact);

  if (!contact) {
    return res.status(404).json({
      status: "error",
      code: "404",
      message: "Not found",
    });
  }

  res.status(201).json({
    status: "success",
    code: "201",
    data: {
      contact,
    },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);

  if (!contact) {
    return res.status(404).json({
      status: "error",
      code: "404",
      message: "Not found contact",
    });
  }
  res.status(204).json({
    status: "success",
    code: 204,
    message: "contact deleted",
  });
});

router.patch("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const validatedResult = schemaContact.validate(req.body);

  if (validatedResult.error) {
    return res.status(400).json({
      status: "error",
      code: "400",
      message: "missing required field",
    });
  }

  const contact = await updateContact(contactId, req.body);

  if (!contact) {
    return res.status(404).json({
      status: "error",
      code: "404",
      message: "Not found contact",
    });
  }

  res.status(200).json({
    status: "success",
    code: "200",
    data: {
      contact,
    },
  });
});

module.exports = router;
