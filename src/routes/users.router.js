import { Router } from 'express';
import userService from '../dao/services/user.service.js';

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



userRouter.post('/', async (req, res) => {
	const user = req.body;
	try{
		const newUser = await userService.createUser(user)
		res.status(201).json(newUser)
	}catch(err){
		res.status(400).json({"error":err.message})
	}
});

userRouter.post('/auth', async (req, res) =>{
	const { email, password } = req.body;
	try{
		const user = await userService.getByEmail(email)
		console.log ('user:', user.password, password)
		if(!user) throw new Error ('Invalid data')
		if (user.password !== password) throw new Error ('Invalid data')
		req.session.user = user
		if (user.email == 'adminCoder@coder.com'){
			req.session.role = 'admin'
		}
		res.status(201).json(user)
	}catch(err){
		res.status(400).json({error: err.message})
	}
})

userRouter.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (!err) {
			res.send('Nos vemos maquinola cosmica');
		} else {
			res.status(500).send('Vos de aca no te vas papu...');
		}
	});
});

export default userRouter;