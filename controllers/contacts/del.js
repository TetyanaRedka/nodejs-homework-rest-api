const { contacts: service } = require("../../services");

const del = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const filter = { _id: contactId, owner: req.user._id };
    const contact = await service.del(filter);

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
  } catch (error) {
    next(error);
  }
};

module.exports = del;
