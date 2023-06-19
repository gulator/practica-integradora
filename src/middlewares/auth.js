export function auth(req, res, next){
    if (req.session.user === 'usuario' && req.session.admin){
        next()
    }
    res.status(401).send('no podes acceder a esta seccion')
}