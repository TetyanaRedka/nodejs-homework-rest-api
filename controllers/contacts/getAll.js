const { contacts: service } = require("../../services");

const getAll = async (req, res, next) => {

  try {
    const result = await service.getAll({ owner: req.user._id });
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
