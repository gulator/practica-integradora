import { Router } from "express";
import userService from "../dao/services/user.service.js";
import { hashPassword, comparePassword } from "../utils.js";
import passport from "passport";
import { authToken, generateToken } from "../middlewares/jwt.middleware.js";

const userRouter = Router();

// userRouter.post('/login', (req, res) => {
// 	const { user, pass } = req.body;
// 	if (user !== 'usuario' && pass !== 'pass') {
// 		res.status(403).send('Usuario o contraseña Invalido');
// 	} else {
// 		req.session.user = user;
// 		req.session.admin = true;
// 		res.status(201).send('Inicio Session correctamente');
// 	}
// });

userRouter.post(
  "/",
  passport.authenticate("register", { failureRedirect: "/failedregister" }),
  async (req, res) => {
    // userRouter.post("/", async (req, res) => {

    //   const user = req.body;
    //   try {
    //       const newUser = await userService.createUser(user);
    //       res.redirect("/login");
    //     } catch (err) {
    //         res.status(400).json({ error: err.message });
    //       }
    res.redirect("/login");
  }
);

userRouter.get("/failedregister", async (req, res) => {
  let mensaje = "Mail ya registrado";
  res.send({ mensaje });
});

// userRouter.post("/auth", async (req, res) => {
// const { email, password } = req.body;

//--INICIAR SESION CON JWT, PASSPORT Y COOKIES
// userRouter.post('/login', async(req,res)=>{
//   const{email, password} = req.body
//   let user = await userService.getByEmail(email)

//   if(!user){
//     res.status(401).send({message:'User not found'})
//   }
//   if(user.password !== password){
//     res.status(401).send({message: 'User or Password not valid'})
//   }

//   user = {
//     _id:user._id,
//     first_name: user.first_name,
//     last_name: user.last_name,
//     email: user.email,
//     age: user.age,
//     role: user.role
//   }
//   const token = generateToken(user)
//   console.log(token)
//   res.status(200).send({token})
//   res.redirect("/");
// })
//--INICIAR SESION CON PASSPORT Y SESSIONS
userRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/api/users/failedlogin" }),
  async (req, res) => {
    if (!req.user)
      return res
        .status(400)
        .send({ status: "error", error: "Credenciales invalidas" });
    // req.session.user = {
    //   first_name: req.user.first_name,
    //   last_name: req.user.last_name,
    //   age: req.user.age,
    //   email: req.user.email,
    //   role: req.user.role
    // }
    const { email, password } = req.body;
    let user = await userService.getByEmail(email);
    if (!user) {
      res.status(401).send({ message: "User not found" });
    }
    // if (!comparePassword(user, password)) {
    //   res.status(401).send({ message: "User or Password not valid" });
    // }

    user = {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      age: user.age,
      role: user.role,
    };
    res.cookie('cookie1', 'cookie Test', {maxAge: 600000})
    const token = generateToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 600000,
    }).send();
    // res.redirect("/api/users/private");

    // const user = await userService.getByEmail(email);
    // if (!user) throw new Error("Invalid data");
    // if (!comparePassword(user, password)) throw new Error("Invalid data");
    // req.session.user = user;
    // // if (user.email == "adminCoder@coder.com") {
    // //   req.session.role = "admin";
    // // }
    // // res.status(201).json(user)
    // res.redirect("/login");
    // } catch (err) {
    //   const errorObject = { error: err.message };
    //   req.session.error = errorObject;
  }
);

userRouter.get('/private', authToken, async(req,res)=>{
  res.status(200).send({ message: 'Private route', user: req.user });
})
userRouter.get("/failedlogin", async (req, res) => {
  res.send({ error: "failed login" });
});

userRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);
userRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

userRouter.get("/private", authToken, (req, res) => {
  res.status(200).send({ message: "ruta privada", user: req.user });
});

userRouter.get("/logout", (req, res) => {
  req.clearCookie('token')((err) => {
    if (!err) {
      res.redirect("/login");
    } else {
      res.status(500).send("Internal error");
    }
  });
});

export default userRouter;
