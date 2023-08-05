import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import local from "passport-local";
import GithubStrategy from "passport-github2";
import userService from "../modules/users/user.mongo.dao.js";
// import userController from "../modules/users/user.controller.js";
import UserFactory from "../modules/users/user.factory.js";
import { hashPassword, comparePassword } from "../utils.js";
import config from "./config.js"; 

let userController = new UserFactory ()

const LocalStrategy = local.Strategy;
const jwtStrategy = Strategy;
const jwtExtract = ExtractJwt;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          
          if (user) {
            return done(null, false);
          }
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: hashPassword(password),
          };
          let result = await userController.createUser(newUser);
          delete result.password;
          console.log(result);
          return done(null, result);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userController.getByEmail(username);
          // console.log(user);
          if (!user) {
            return done(null, false);
          }
          // console.log(comparePassword(user, password));
          if (!comparePassword(user, password)) return done(null, false);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userController.getByEmail(profile._json.email);
          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: "",
              email: profile._json.email,
              password: "",
            };
            let result = await userController.createUser(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
		'current',
		new jwtStrategy(
			{
				jwtFromRequest: jwtExtract.fromExtractors([cookieExtractor]),
				secretOrKey: 'privateKey',
			},
			(payload, done) => {
				done(null, payload);
			}
		),
		async (payload, done) => {
			try {
				return done(null, payload);
			} catch (error) {
				done(error);
			}
		}
	);

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    let user = await userController.findById(id);
    done(null, user);
  });
};

const cookieExtractor = (req) => {
  let token = null;
  
  if (req && req.cookies) {
    token = req.cookies['token'];
  }  
  return token;
};

export default initializePassport;



