const { User } = require("../models");
const { nanoid } = require("nanoid");
const SendMail = require("./email");

const getOne = (filter) => {
  return User.findOne(filter);
};

const getById = (id) => {
  return User.findById(id);
};

const add = async ({ email, password }) => {
  const verifyToken = nanoid();
  const newUser = new User({ email, verifyToken });
  newUser.setPassword(password);
  await SendMail(verifyToken, email);
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

const verify = async ({ verificationToken }) => {
  const user = await User.findOne({ verifyToken: verificationToken });

  if (user) {
    await User.updateOne({ verify: true }, { verifyToken: null });

    return true;
  }
  return false;
};

module.exports = {
  getOne,
  getById,
  add,
  update,
  updateAwatar,
  getAwatar,
  verify,
};
