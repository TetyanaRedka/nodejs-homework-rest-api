const { Contact } = require("../models");

const getAll = (filter) => {
  return Contact.find(filter);
};

const getOne = (filter) => {
  return Contact.findOne(filter);
};

const add = (newContact) => {
  return Contact.create(newContact);
};

const update = (id, body) => {
  return Contact.findByIdAndUpdate(id, body);
};

const del = (id) => {
  return Contact.findByIdAndDelete(id);
};
module.exports = {
  getAll,
  getOne,
  add,
  update,
  del,
};
