import MyRouter from "../../routes/router.js";
// import userController from "./user.controller.js";
import { generateToken } from "../../middlewares/jwt.middleware.js";
import passport from "passport";
import config from "../../config/config.js";
import UserFactory from "./user.factory.js";
import jwt from "jsonwebtoken";

let userController = new UserFactory ()

export default class UserRouter extends MyRouter {
  init() {
    this.post(
      "/",
      ['PUBLIC'],
      passport.authenticate("register", { failureRedirect: "/failedregister" }),
      async (req, res) => {
        res.redirect("/login");
      }
    );

    this.post(
      "/login",
      ["PUBLIC"],
      passport.authenticate("login", {
        failureRedirect: "/api/users/failedlogin",
      }),
      async (req, res) => {
        if (!req.user) {
          return res
            .status(400)
            .send({ status: "error", error: "Credenciales invalidas" });
        }
        let user = await userController.getByEmail(req.user.email);
        if (!user) {
          res.status(401).send({ message: "User not found" });
        }
        user = {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          // password: user.password,
          age: user.age,
          role: user.role,
        };
        req.user = user;
        const token = generateToken(user);
        res
          .cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000,
          })
          .send();
      }
    );

    this.get(
      "/current",
      ["USER"],
      passport.authenticate("current", { session: false }),
      async (req, res) => {
        res.status(200).send({ message: "Private route", user: req.user });
      }
    );
    this.get("/failedlogin", async (req, res) => {
      res.send({ error: "failed login" });
    });

    this.get("/logout",['USER'], (req, res) => {
      res.clearCookie("token");
      try {
        res.redirect("/login");
      } catch {
        res.status(500).send("Internal error");
      }
    })

    this.post(
      "/cart/:cid",['USER'], async (req, res) => {
        try {
          let userId = req.user._id;
          let cid = req.params.cid;
          let addedProduct = await userController.addCartToUser(userId, cid);
      
          res.status(200).send(addedProduct);
        } catch (err) {
          res.send(err);
        }
      }
    )





    this.get("/me", ["USER", "ADMIN"], (req, res) => {
      res.status(200).send({ user: req.user });
    });

    this.get("/admin", ["ADMIN"], (req, res) => {
      res.status(200).send({ user: req.user });
    });
  }
}
