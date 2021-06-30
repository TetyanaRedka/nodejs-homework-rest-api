const Contact = require("../models/contact");

const add = async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await Contact.create(req.body);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;