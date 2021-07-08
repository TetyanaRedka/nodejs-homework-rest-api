const { users: service } = require("../../services");

const verify = async (req, res, next) => {
  try {
    const result = await service.verify(req.params);
    if (result) {
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "Verification successful",
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
