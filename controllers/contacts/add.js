const { contacts: service } = require("../../services");

const add = async (req, res, next) => {
  const { body, user } = req;
  try {
    const newContact = {
      name: body.name,
      number: body.number,
      owner: user._id,
    };
    const result = await service.add(newContact);

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
