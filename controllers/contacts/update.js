const { contacts: service } = require("../../services");

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { body, user } = req;

  try {
    const newContact = {
      name: body.name,
      number: body.number,
      owner: user._id,
    };

    const contact = await service.update(contactId, newContact);

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
  } catch (error) {
    next(error);
  }
};

module.exports = update;
