import { Router } from "express";
import userService from "../dao/services/user.service.js";
import { hashPassword, comparePassword } from "../utils.js";
import passport from "passport";
 

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

userRouter.post("/", passport.authenticate('register', {failureRedirect:'/failedregister'}), async (req, res) => {
  
  res.redirect("/login");
  // const user = {...req.body, password: hashPassword(req.body.password)};
  // try {
  //   const newUser = await userService.createUser(user);
  //   res.redirect("/login");
  // } catch (err) {
  //   res.status(400).json({ error: err.message });
  // }
});

userRouter.get('/failedregister', async(req, res)=>{
  let mensaje = "Mail ya registrado"
  res.send({mensaje})
})

// userRouter.post("/auth", async (req, res) => {
  // const { email, password } = req.body;
  userRouter.post('/login', passport.authenticate('login', {failureRedirect:'/failedlogin'}), async (req, res) => {
    if(!req.user) return res.status(400).send({status:'error', error:'Credenciales invalidas'})
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      role: req.user.role
    }

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
    res.redirect("/");
  // }
});
userRouter.get('/failedlogin',async(req, res)=>{
  res.send({error:"failed login"})
})

userRouter.get('/github', passport.authenticate('github',{scope:['user:email']}), async(req,res)=>{})
userRouter.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/login'}), async(req, res)=>{
  req.session.user = req.user;
  res.redirect('/')
})


userRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.redirect("/login");
    } else {
      res.status(500).send("Internal error");
    }
  });
});

export default userRouter;
