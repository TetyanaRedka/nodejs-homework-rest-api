const Contact = require("../models/contact");

const update = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await Contact.findByIdAndUpdate(contactId, req.body);

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
