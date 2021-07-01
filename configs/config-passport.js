const passport = require("passport");
const passportJWT = require("passport-jwt");
require("dotenv").config();

const { users: service } = require("../services");

const { ExtractJwt, Strategy } = passportJWT;
const { TOKEN_KEY } = process.env;

const settings = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: TOKEN_KEY,
};

passport.use(
    new Strategy(settings, async (req, payload, done) => {
  // new Strategy(settings, async (payload, done) => {
      try {
      const [, token] = req["Authorization"].split(' ')
        // const user = await service.getById(payload.id);
        const user = await service.getOne({_id: payload.id, token });
      if (!user || !user.token) {
        throw new Error("User not found");
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  })
);
