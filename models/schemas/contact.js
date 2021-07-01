const { Schema, ObjectId } = require("mongoose");

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, "name must be exist!"],
    minLength: 3,
    maxLength: 30,
    validate: {
      validator: function (value) {
        return /\d{3}-\d{3}-\d{4}/.test(value);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 2,
  },
  phone: {
    type: String,
    required: [true, "name must be exist!"],
    minLength: 2,
    maxLength: 20,
  },
  favorite: {
    type: String,
    enum: ["false", "true"],
    default: "true",
    required: [true, "name must be exist!"],
  },
  owner: {
    type: ObjectId,
    ref: "user",
  },
});

module.exports = contactSchema;
