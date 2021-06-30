const fs = require("fs/promises");
const path = require("path");
// const { v4 } = require("uuid");
// const contacts = require("./contacts.json");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const contactsList = JSON.parse(await fs.readFile(contactsPath));

    return contactsList;
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await listContacts();
    return contactsList.find(
      ({ id }) => id.toString() === contactId.toString()
    );
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await listContacts();

    const contact = contactsList.find(
      ({ id }) => id.toString() === contactId.toString()
    );

    const newContactsList = contactsList.filter(
      ({ id }) => id.toString() !== contactId.toString()
    );

    const newContacts = JSON.stringify(newContactsList);

    fs.writeFile(contactsPath, newContacts);

    return contact;
  } catch (error) {
    throw error;
  }
};

const addContact = async (body) => {
  try {
    const contactsList = await listContacts();

    const newContact = Object.assign(body, { id: v4() });

    contactsList.push(newContact);

    const stringContacts = JSON.stringify(contactsList);

    fs.writeFile(contactsPath, stringContacts);

    return newContact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = Object.assign(body, { id: contactId });

    const contactsList = await listContacts();

    const idx = contactsList.findIndex(
      ({ id }) => id.toString() === contactId.toString()
    );

    if (idx !== -1) {
      contactsList[idx] = updatedContact;
    }

    const stringContacts = JSON.stringify(contactsList);
    fs.writeFile(contactsPath, stringContacts);

    return contactsList[idx];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
