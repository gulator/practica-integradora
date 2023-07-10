export function isAuth(req, res, next){
    if (req.cookies.token){
        next()
    }else{
    res.redirect('/login')}
}

export function isLogged(req, res, next){
    if (!req.cookies.token){
        next()
    }else{
    res.redirect('/')}
}