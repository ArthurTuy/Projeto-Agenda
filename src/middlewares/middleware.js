exports.meuMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('erros');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
}

exports.checkCsrfError = (err, req, res, next) => {
    if(err){
        return res.render('../views/includes/404.ejs')
    }
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

exports.loginRequired = (req, res, next) => {
    if(!req.session.user){
        req.flash('erros', 'Voce precisa fazer login');
        req.session.save(() => res.redirect('/'));
        return;
    }

    next();
}