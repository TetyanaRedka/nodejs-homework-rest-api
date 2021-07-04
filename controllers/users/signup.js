const { users: service } = require("../../services");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await service.getOne({ email });
    if (result) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email in use",
      });
    }

    await service.add({ email, password });
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
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

module.exports = register;
