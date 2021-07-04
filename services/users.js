const { User } = require("../models");

const getOne = (filter) => {
  return User.findOne(filter);
};

const getById = (id) => {
  return User.findById(id);
};

const add = ({ email, password }) => {
  const newUser = new User({ email });
  newUser.setPassword(password);
  return newUser.save();
};

const update = async (id, data) => {
  await User.updateOne({ _id: id }, { token: data });
};

const updateAwatar = async (id, fileName) => {
  await User.updateOne({ _id: id }, { avatarURL: fileName });
};

const getAwatar = async (id) => {
  const { avatarURL } = await User.findOne({ _id: id });
  return avatarURL;
};

module.exports = {
  getOne,
  getById,
  add,
  update,
  updateAwatar,
  getAwatar,
};
