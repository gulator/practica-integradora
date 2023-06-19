export function isAuth(req, res, next){
    if (req.session.user){
        next()
    }else{
    res.redirect('/login')}
}

export function isLogged(req, res, next){
    if (!req.session.user){
        next()
    }else{
    res.redirect('/')}
}