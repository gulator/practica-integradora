import MyRouter from "../../routes/router.js";
import userController from "./user.controller.js";
import { generateToken, authMailToken } from "../../middlewares/jwt.middleware.js";
import passport from "passport";
import MailingService from "../../config/mailing.service.js";
import config from "../../config/config.js";
import jwt from "jsonwebtoken"; 

export default class UserRouter extends MyRouter {
  init() {
    this.post(
      "/",
      ["PUBLIC"],
      passport.authenticate("register", { failureRedirect: "/api/users/failedregister" }),
      async (req, res) => {
        // res.redirect("/login");
        res.status(201).send({payload: req.body})
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
          req.logger.error("credenciales invalidas");
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
        req.logger.info(`user ${user._id} logged in - ${new Date().toLocaleString()}`);
        res
          .cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000,
          })
          .send();
      }
    );
    this.get('',['ADMIN'], async(req, res)=>{
      try{
        const users = await userController.getAll()
        res.status(200).send({users})

      }catch(err){
        res.status(500).send(err)
      }
      
    })

    this.get(
      "/current",
      ["USER","PREMIUM"],
      passport.authenticate("current", { session: false }),
      async (req, res) => {
        res.status(200).send({ message: "Private route", user: req.user });
      }
    );
    this.get("/failedlogin", ["PUBLIC"], async (req, res) => {
      req.logger.error("Failed to login - invalid credentials");
      res.send({ error: "failed login" });
    });
    this.get('/failedregister',['PUBLIC'], async (req, res) => {
      req.logger.error("Failed to Register - mail already in user");
      res.send({ status: 400, message: "mail already in use" });
    })

    this.get("/logout", ["PUBLIC"], (req, res) => {
      let user = req.user
      req.logger.info(`user ${user._id} logged out - ${new Date().toLocaleString()}`);
      res.clearCookie("token");
      try {
        res.redirect("/login");
      } catch {
        res.status(500).send("Internal error");
      }
    });
    this.put('/changepsw',['USER', 'PREMIUM', 'ADMIN'], async(req,res)=>{
      try{
        let newpsw = req.body
        let user = req.user
  
        let result = await userController.checkpsw(newpsw.pass, user)
        req.logger.info(`User ${user._id} changed this password on ${new Date().toLocaleString()}`);
        res.send(result)
      }catch(err){
        res.send(err)
      }
    })

    this.post("/cart/:cid", ["USER", "PREMIUM"], async (req, res) => {
      try {
        let userId = req.user._id;
        let cid = req.params.cid;
        let addedProduct = await userController.addCartToUser(userId, cid);

        res.status(200).send(addedProduct);
      } catch (err) {
        res.send(err);
      }
    });
    this.get("/resetpsw", ["USER", "PREMIUM", "ADMIN"], async (req, res) => {
      try {
        let userInfo = req.user;
        const user = {
          _id: userInfo._id,
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          email: userInfo.email,
          // password: userInfo.password,
          age: userInfo.age,
          role: userInfo.role,
        };
        let mailToken = generateToken(user);
        // console.log(user)
        // console.log(mailToken)
        let mailData = {
          from: "Lighting Legs <gulator@gmail.com>",
          to: "julian.dascanio@gmail.com",
          subject: "Reset user password",
          html: `<p>Estimado ${userInfo.first_name}:</p>
          <p>Para poder resetear la clave de tu usuario por favor hace <a href="http://localhost:8080/changepsw/${mailToken}">CLICK ACA</a></p>
          <p>El link será válido por 1 hora</p>
          `
        }
        let mailService = new MailingService();
        await mailService.sendMail(mailData);
        // res.send({status:200, message:'message sent'});
      } catch (err) {
        res.status(500).send(err);
      }
    });
    this.get("/validatetoken/:token",['USER','PREMIUM','ADMIN'], authMailToken, async(req,res)=>{
      // res.send({status: 200, message: 'Valid Token'})
    })
    this.put('/premium/:uid', ['USER','PREMIUM'], async(req, res)=>{
      const uid = req.params.uid
      const result = await userController.changeRole(uid)
      const user = req.user
      user.role = result.role
      req.user = user      
      
      res.send({result, user})
    })
    this.delete('/:uid', ['PUBLIC'], async(req, res)=>{
      const uid = req.params.uid
      const result = await userController.deleteuser(uid)
      res.send({status: 204, payload: result})
    })
    this.get("/me", ["USER", "ADMIN"], (req, res) => {
      res.status(200).send({ user: req.user });
    });

    this.get("/admin", ["ADMIN"], (req, res) => {
      res.status(200).send({ user: req.user });
    });

  }
}
