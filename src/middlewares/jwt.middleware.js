import jwt from "jsonwebtoken";
import passport from "passport";
import config from "../config/config.js";

const privatekey = config.cookieKey;

export const generateToken = (user) => {
  return jwt.sign(user, privatekey, { expiresIn: "1h" });
};

export const authMailToken = (req, res, next) => {
  const token = req.params.token
  if (!token) {
    res.send({status: 401, message: 'Token not found'})
    // res.status(401).send({ message: "Token not found" });
  }

  jwt.verify(token, privatekey, (err, credentials) => {
    if (err) {
        res.send({status: 401, message: 'Invalid or expired token'})
    //   res.status(401).send({ message: "Invalid or expired token" });
    }else{
        res.send({status: 200, message: 'Valid Token'});

    }
    next()
  });
};

export const authToken = (req, res, next) => {
  const authHeader = req.cookies.token;

  if (!authHeader) {
    // res.status(401).send({message: 'Token not found'})
  }

  // const token = authHeader.split(' ')[1];

  jwt.verify(authHeader, privatekey, (err, credentials) => {
    if (err) {
      // res.status(401).send({message: 'Token not valid'})
    }
    // console.log('credenciales:', credentials)
    req.user = credentials;
    next();
  });
};
export const middlewarePassportJWT = async (req, res, next) => {
  passport.authenticate("current", { session: false }, (err, usr, info) => {
    if (err) {
      next(err);
    }

    if (!usr) {
      res.redirect("/login");
      // res.status(401).send({
      // 	message: info.messages ? info.messages : info.toString(),
      // });
    }

    req.user = usr;
    next();
  })(req, res, next);
};
