const { users: service } = require("../../services");
const SendMail = require("../../services/email");

const secondaryEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await service.getOne(req.body);
  if (!user) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing required field email",
    });
  }

  if (!user.verifyToken) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Verification has already usereen passed",
    });
  }

  await SendMail(user.verifyToken, email);
};

module.exports = secondaryEmail;
