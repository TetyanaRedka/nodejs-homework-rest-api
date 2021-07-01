const jwt = require("jsonwebtoken");
require("dotenv").config();

// const { users: service } = require("../../services");

const current = async (req, res, next) => {
  try {
    // const { TOKEN_KEY } = process.env;
    // const [, token] = req.headers.Authorization.split(" ");
    // const { id } = jwt.verify(token, TOKEN_KEY);

    // await service.getById(id);

    res.json({
      status: "success",
      code: 200,
      data: {
        email: req.user,
        subscription: "starter",
      },
    });
  } catch (error) {
    res.status(401).json({
      status: "error",
      code: 401,
      message: "Not authorized",
    });
  }
};

module.exports = current;
