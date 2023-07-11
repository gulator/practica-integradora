import jwt from 'jsonwebtoken'
import passport from 'passport'


const privatekey = 'privateKey'

export const generateToken = (user)=>{
    return jwt.sign(user, privatekey, {expiresIn: '2h'})
}

export const authToken = (req,res,next)=>{
    const authHeader = req.cookies.token;

    if(!authHeader) {
        // res.status(401).send({message: 'Token not found'})
    }

    // const token = authHeader.split(' ')[1];

    jwt.verify(authHeader, privatekey, (err, credentials)=>{
        if(err){
            // res.status(401).send({message: 'Token not valid'})
        }
        // console.log('credenciales:', credentials)
        req.user = credentials;
        next()
    })
}
export const middlewarePassportJWT = async (req, res, next) => {
	passport.authenticate('current', { session: false }, (err, usr, info) => {
		if (err) {
			next(err);
		}

		if (!usr) {
			res.status(401).send({
				message: info.messages ? info.messages : info.toString(),
			});
		}

		req.user = usr;
		next();
	})(req, res, next);
};