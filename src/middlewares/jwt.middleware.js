import jwt from 'jsonwebtoken'

const privatekey = 'privateKey'

export const generateToken = (user)=>{
    console.log('user jwt:', user)
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
        console.log('credenciales:', credentials)
        req.user = credentials;
        next()
    })
}