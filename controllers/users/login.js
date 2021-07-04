const { users: service } = require("../../services");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await service.getOne({ email });
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Email or password is wrong",
      });
    }

    const payload = {
      id: user._id,
    };

    const { TOKEN_KEY } = process.env;
    const token = jwt.sign(payload, TOKEN_KEY);
    await service.update(user._id, token);

    res.json({
      status: "success",
      code: 200,
      data: {
        token,
        user: {
          email,
          subscription: "starter",
        },
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Ошибка от Joi или другой библиотеки валидации",
    });
  }
};

module.exports = login;
