const { contacts: service } = require("../../services");

const getOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    const filter = { _id: id, owner: req.user._id };
    const contact = await service.getOne(filter);

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

module.exports = getOne;
