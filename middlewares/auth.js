module.exports = (req, res, next) => {
    //console.log(req.user.Email);
    if (!req.user) {
        res.redirect('/account/login');
    } else next();
}