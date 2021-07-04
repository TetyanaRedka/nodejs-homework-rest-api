const { users: service } = require("../../services");

const logout = async (req, res, next) => {
  const { user } = req;
  try {
    await service.update(user._id, null);
    res.status(204).json({
      status: "No Content",
      code: 204,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
